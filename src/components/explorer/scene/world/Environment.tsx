"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLSL_NOISE } from "../../shaders/common";

export const HORIZON_COLOR = "#0d1622";
export const SKY_TOP = "#05070c";

/**
 * Ground plane of the outpost.
 *
 * Reuses the Engineer View motif — a fine measurement grid on a dark surface —
 * projected onto gently undulating terrain, so the two experiences read as the
 * same design language rather than two unrelated products.
 */
export function Terrain() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uAccent: { value: new THREE.Color("#5c98ff") },
          uHorizon: { value: new THREE.Color(HORIZON_COLOR) },
        },
        vertexShader: /* glsl */ `
          varying vec2 vXZ;
          varying vec3 vWorld;

          ${GLSL_NOISE}

          void main() {
            vec3 p = position;
            // Low-amplitude relief so the plateau is not perfectly flat.
            float h = fbm(vec3(p.x * 0.012, p.y * 0.012, 0.0), 4) * 6.0;
            // Flatten the centre so the landing pad and structures sit level.
            float centre = smoothstep(6.0, 46.0, length(p.xy));
            p.z += h * centre;

            vec4 world = modelMatrix * vec4(p, 1.0);
            vWorld = world.xyz;
            vXZ = p.xy;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;

          uniform vec3 uAccent;
          uniform vec3 uHorizon;
          uniform float uTime;

          varying vec2 vXZ;
          varying vec3 vWorld;

          ${GLSL_NOISE}

          // Anti-aliased grid line using screen-space derivatives.
          float gridLine(vec2 p, float spacing, float thickness) {
            vec2 g = abs(fract(p / spacing - 0.5) - 0.5) * spacing;
            vec2 w = fwidth(p) * thickness;
            vec2 l = smoothstep(w, vec2(0.0), g);
            return max(l.x, l.y);
          }

          void main() {
            float dist = length(vXZ);

            vec3 base = vec3(0.031, 0.043, 0.062);
            base += vec3(0.012, 0.018, 0.030) * fbm(vec3(vXZ * 0.05, 0.0), 4);

            float fine = gridLine(vXZ, 4.0, 1.0) * 0.16;
            float coarse = gridLine(vXZ, 32.0, 1.4) * 0.30;

            vec3 color = base + uAccent * (fine + coarse) * 0.30;

            // A slow scan ring pushing outward from the landing pad.
            float ring = sin(dist * 0.16 - uTime * 0.5);
            ring = smoothstep(0.985, 1.0, ring) * smoothstep(90.0, 12.0, dist);
            color += uAccent * ring * 0.16;

            // Fade into the horizon so the plane has no visible edge.
            float fade = smoothstep(60.0, 190.0, dist);
            color = mix(color, uHorizon, fade);

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} raycast={() => null}>
      <planeGeometry args={[440, 440, 160, 160]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/**
 * Sky dome. A vertical gradient with a warm band low on the horizon — the
 * light of the star the outpost orbits, just after arrival.
 */
export function SkyDome() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uTop: { value: new THREE.Color(SKY_TOP) },
          uHorizon: { value: new THREE.Color("#16273b") },
          uGlow: { value: new THREE.Color("#2f5f96") },
        },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision mediump float;
          uniform vec3 uTop;
          uniform vec3 uHorizon;
          uniform vec3 uGlow;
          uniform float uTime;
          varying vec3 vDir;

          ${GLSL_NOISE}

          void main() {
            float h = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0);
            vec3 color = mix(uHorizon, uTop, pow(h, 0.75));

            // Directional glow low on one side, motivating the scene lighting.
            float sun = max(dot(normalize(vDir), normalize(vec3(0.45, 0.06, -0.88))), 0.0);
            color += uGlow * pow(sun, 6.0) * 0.55 * smoothstep(0.55, 0.0, abs(vDir.y));

            // Faint stars still visible high overhead.
            float stars = smoothstep(0.86, 0.995, fbm(vDir * 90.0, 2));
            color += vec3(stars) * 0.35 * smoothstep(0.05, 0.5, vDir.y);

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh raycast={() => null}>
      <sphereGeometry args={[300, 32, 24]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/**
 * The pad the visitor lands on. Marks the origin of the world and the point
 * every "return to landing zone" action comes back to.
 */
export function LandingPad() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uAccent: { value: new THREE.Color("#5c98ff") },
        },
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
          uniform vec3 uAccent;
          varying vec2 vUv;

          void main() {
            float r = length(vUv - 0.5) * 2.0;
            if (r > 1.0) discard;

            vec3 color = vec3(0.055, 0.070, 0.095);

            // Concentric guidance rings.
            float rings = smoothstep(0.02, 0.0, abs(fract(r * 4.0) - 0.5) - 0.46);
            color += uAccent * rings * 0.35;

            // Outer marker ring, brighter.
            float edge = smoothstep(0.03, 0.0, abs(r - 0.92));
            color += uAccent * edge * 0.85;

            // Slow rotating sweep, like a landing beacon.
            float a = atan(vUv.y - 0.5, vUv.x - 0.5);
            float sweep = smoothstep(0.75, 1.0, sin(a * 2.0 - uTime * 0.9) * 0.5 + 0.5);
            color += uAccent * sweep * 0.10 * smoothstep(1.0, 0.3, r);

            float alpha = smoothstep(1.0, 0.94, r);
            gl_FragColor = vec4(color, alpha);
          }
        `,
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]} raycast={() => null}>
      <circleGeometry args={[9, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
