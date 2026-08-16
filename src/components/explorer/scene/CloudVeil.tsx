"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLSL_NOISE } from "../shaders/common";
import { useExplorer } from "@/lib/explorer/store";

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uDensity;   // 0 = clear, 1 = fully inside the deck
  uniform float uSpeed;
  uniform vec3  uTint;
  uniform vec2  uResolution;

  varying vec2 vUv;

  ${GLSL_NOISE}

  void main() {
    if (uDensity <= 0.001) discard;

    vec2 uv = vUv - 0.5;
    uv.x *= uResolution.x / max(uResolution.y, 1.0);

    // Radial flow: cloud detail streams outward from the centre of travel,
    // which reads as forward motion rather than a scrolling texture.
    float r = length(uv);
    float travel = uTime * uSpeed;

    vec3 p = vec3(uv * (2.4 - uDensity * 0.9), travel);
    float base = fbm(p * 1.8, 5);
    float detail = ridge(p * 4.2 + base * 1.4, 4);

    float clouds = mix(base, detail, 0.55);

    // The deck thickens toward the centre first, then floods the frame.
    float centreBias = mix(1.0, smoothstep(1.05, 0.05, r), 1.0 - uDensity);
    float a = smoothstep(0.62 - uDensity * 0.62, 0.92 - uDensity * 0.55, clouds);
    a = max(a, uDensity * uDensity * 0.92) * centreBias;

    // Light scatters through from above during the descent.
    float lift = smoothstep(0.15, -0.35, vUv.y - 0.5);
    vec3 color = mix(uTint * 0.62, vec3(1.0), 0.30 + 0.45 * lift * uDensity);

    gl_FragColor = vec4(color, clamp(a * uDensity, 0.0, 1.0));
  }
`;

/**
 * Full-frame cloud deck used as the scene-transition mask.
 *
 * It rides just in front of the camera so it always fills the view, ramps up
 * through atmospheric entry, peaks while the space scene is swapped for the
 * world, then clears — the visitor never sees the cut.
 */
export default function CloudVeil() {
  const { camera, size } = useThree();
  const { phase, progress } = useExplorer();
  const mesh = useRef<THREE.Mesh>(null);
  const density = useRef(0);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uDensity: { value: 0 },
          uSpeed: { value: 0.55 },
          uTint: { value: new THREE.Color("#b9cfe8") },
          uResolution: { value: new THREE.Vector2(1, 1) },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader,
      }),
    []
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = progress.current;

    // Target density per phase: build through entry, hold through the swap,
    // then clear as the world settles.
    let target = 0;
    if (phase === "entry") target = Math.pow(Math.max(0, p - 0.35) / 0.65, 1.4);
    else if (phase === "clouds") target = 1;
    else if (phase === "landing") target = Math.max(0, 1 - p * 1.5);

    // Rising is quicker than clearing, so the reveal feels like emerging.
    const rate = target > density.current ? 3.4 : 2.2;
    density.current += (target - density.current) * (1 - Math.exp(-rate * dt));

    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uDensity.value = density.current;
    material.uniforms.uResolution.value.set(size.width, size.height);

    if (!mesh.current) return;

    // Park the quad a fixed distance in front of the camera, facing it.
    const distance = 1.4;
    dir.set(0, 0, -1).applyQuaternion(camera.quaternion).multiplyScalar(distance);
    mesh.current.position.copy(camera.position).add(dir);
    mesh.current.quaternion.copy(camera.quaternion);

    // Scale to exactly cover the frustum at that distance.
    const cam = camera as THREE.PerspectiveCamera;
    const h = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) * distance;
    mesh.current.scale.set(h * cam.aspect * 1.05, h * 1.05, 1);
  });

  return (
    <mesh ref={mesh} renderOrder={999} material={material} raycast={() => null} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}
