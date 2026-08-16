"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLSL_NOISE } from "../shaders/common";
import { useExplorer } from "@/lib/explorer/store";

/* ────────────────────────────── Moon ────────────────────────────── */

const moonFragment = /* glsl */ `
  precision mediump float;

  uniform vec3 uSunDir;
  varying vec3 vNormalW;
  varying vec3 vPosL;

  ${GLSL_NOISE}

  void main() {
    vec3 sp = normalize(vPosL);

    // Regolith: broad maria darkening plus fine crater speckle.
    float maria = smoothstep(0.42, 0.58, fbm(sp * 2.4, 4));
    float craters = fbm(sp * 18.0, 3);

    vec3 base = mix(vec3(0.60, 0.59, 0.57), vec3(0.34, 0.34, 0.36), maria);
    base *= 0.86 + 0.28 * craters;

    float ndl = max(dot(normalize(vNormalW), normalize(uSunDir)), 0.0);
    float day = smoothstep(-0.05, 0.45, dot(normalize(vNormalW), normalize(uSunDir)));

    vec3 color = base * (0.02 + 0.98 * day) * (0.35 + 0.65 * ndl);
    gl_FragColor = vec4(pow(max(color, 0.0), vec3(0.4545)), 1.0);
  }
`;

const bodyVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vPosL;
  void main() {
    vPosL = normalize(position);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export function Moon({
  position,
  radius = 0.27,
  sunDir,
}: {
  position: [number, number, number];
  radius?: number;
  sunDir: THREE.Vector3;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const { reducedMotion } = useExplorer();

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: bodyVertex,
        fragmentShader: moonFragment,
        uniforms: { uSunDir: { value: sunDir.clone() } },
      }),
    [sunDir]
  );

  useFrame((_, delta) => {
    if (!reducedMotion && mesh.current) mesh.current.rotation.y += delta * 0.01;
  });

  return (
    <mesh ref={mesh} position={position} material={material} raycast={() => null}>
      <sphereGeometry args={[radius, 48, 24]} />
    </mesh>
  );
}

/* ────────────────────────────── Sun ────────────────────────────── */

/**
 * The sun is deliberately far off-axis and small on screen — it exists to
 * motivate the lighting and give the composition a warm counterpoint, not to
 * compete with Earth for attention.
 */
export function Sun({ position }: { position: [number, number, number] }) {
  const glow = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision mediump float;
          varying vec2 vUv;
          void main() {
            float d = length(vUv - 0.5) * 2.0;
            // Tight core, long soft falloff.
            float core = smoothstep(0.22, 0.0, d);
            float halo = pow(smoothstep(1.0, 0.0, d), 2.6);
            vec3 c = mix(vec3(1.0, 0.86, 0.66), vec3(1.0, 0.97, 0.92), core);
            gl_FragColor = vec4(c, core * 0.95 + halo * 0.30);
          }
        `,
      }),
    []
  );

  return (
    <sprite position={position} scale={[26, 26, 1]} raycast={() => null}>
      <primitive object={glow} attach="material" />
    </sprite>
  );
}

/* ───────────────────────────── Nebula ───────────────────────────── */

/**
 * A single very large, very faint billboard behind everything. Provides colour
 * variation across the void without adding geometry or particle load.
 */
export function Nebula() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision mediump float;
          uniform float uTime;
          varying vec2 vUv;

          ${GLSL_NOISE}

          void main() {
            vec2 p = (vUv - 0.5) * 3.0;
            vec3 q = vec3(p * 1.4, uTime * 0.004);

            float n = fbm(q, 5);
            float n2 = fbm(q * 2.3 + n * 1.2, 4);

            // Two overlapping tints, masked to the centre so edges fade out.
            float mask = smoothstep(1.25, 0.15, length(p));
            float a = pow(smoothstep(0.42, 0.85, n2), 1.6) * mask;

            vec3 cool = vec3(0.10, 0.20, 0.46);
            vec3 warm = vec3(0.30, 0.13, 0.34);
            vec3 c = mix(cool, warm, smoothstep(0.35, 0.75, n));

            gl_FragColor = vec4(c, a * 0.30);
          }
        `,
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={[-140, 60, -420]} rotation={[0, 0.35, 0.2]} raycast={() => null}>
      <planeGeometry args={[900, 620]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/* ──────────────────────── Distant planet ──────────────────────── */

/** Depth cue only — a small, cool disc far off in the composition. */
export function DistantPlanet({
  position,
  radius,
  color,
  sunDir,
}: {
  position: [number, number, number];
  radius: number;
  color: string;
  sunDir: THREE.Vector3;
}) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: bodyVertex,
        fragmentShader: /* glsl */ `
          precision mediump float;
          uniform vec3 uSunDir;
          uniform vec3 uColor;
          varying vec3 vNormalW;
          varying vec3 vPosL;

          ${GLSL_NOISE}

          void main() {
            vec3 sp = normalize(vPosL);
            // Gas-giant style latitudinal banding.
            float bands = sin(sp.y * 14.0 + fbm(sp * 2.0, 3) * 3.0) * 0.5 + 0.5;
            vec3 base = uColor * (0.78 + 0.32 * bands);

            float day = smoothstep(-0.1, 0.5, dot(normalize(vNormalW), normalize(uSunDir)));
            vec3 c = base * (0.03 + 0.97 * day);
            gl_FragColor = vec4(pow(max(c, 0.0), vec3(0.4545)), 1.0);
          }
        `,
        uniforms: {
          uSunDir: { value: sunDir.clone() },
          uColor: { value: new THREE.Color(color) },
        },
      }),
    [color, sunDir]
  );

  return (
    <mesh position={position} material={material} raycast={() => null}>
      <sphereGeometry args={[radius, 32, 16]} />
    </mesh>
  );
}
