"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  atmosphereFragment,
  atmosphereVertex,
  cloudFragment,
  cloudVertex,
  earthFragment,
  earthVertex,
} from "../shaders/earth";
import { useExplorer } from "@/lib/explorer/store";

const SUN_DIR = new THREE.Vector3(1, 0.28, 0.55).normalize();
/** Portfolio accent (#5C98FF) in linear-ish terms, tinting the night side. */
const ACCENT = new THREE.Color("#5c98ff");

type EarthProps = {
  radius?: number;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  onClick?: () => void;
  /** Disables interaction once the approach has begun. */
  interactive?: boolean;
};

/**
 * The hero object of Explorer View.
 *
 * Three shells: surface, drifting cloud layer, and a back-faced atmosphere
 * halo. A single spring-damped `hover` value feeds all three, so the
 * "distant and cool → alive and saturated" transformation happens as one
 * coherent move rather than three independent fades.
 */
export default function Earth({
  radius = 1,
  onPointerOver,
  onPointerOut,
  onClick,
  interactive = true,
}: EarthProps) {
  const { quality, earthHovered, reducedMotion } = useExplorer();
  const group = useRef<THREE.Group>(null);
  const surface = useRef<THREE.Mesh>(null);
  const clouds = useRef<THREE.Mesh>(null);
  const hover = useRef(0);

  const octaves = quality === "high" ? 6 : quality === "medium" ? 5 : 4;
  const segments = quality === "high" ? 96 : quality === "medium" ? 72 : 48;

  const surfaceMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: earthVertex,
        fragmentShader: earthFragment,
        uniforms: {
          uTime: { value: 0 },
          uHover: { value: 0 },
          uSunDir: { value: SUN_DIR.clone() },
          uAccent: { value: ACCENT.clone() },
          uOctaves: { value: octaves },
        },
      }),
    [octaves]
  );

  const cloudMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: cloudVertex,
        fragmentShader: cloudFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uHover: { value: 0 },
          uSunDir: { value: SUN_DIR.clone() },
          uOctaves: { value: octaves },
        },
      }),
    [octaves]
  );

  const atmosphereMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uHover: { value: 0 },
          uSunDir: { value: SUN_DIR.clone() },
          uColor: { value: new THREE.Color("#3f7fd8") },
          uIntensity: { value: 1.0 },
        },
      }),
    []
  );

  const hazeMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uHover: { value: 0 },
          uSunDir: { value: SUN_DIR.clone() },
          uColor: { value: new THREE.Color("#2f6ec0") },
          uIntensity: { value: 0.34 },
        },
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // Critically-damped approach to the hover target — no overshoot, no snap.
    const target = earthHovered ? 1 : 0;
    hover.current += (target - hover.current) * (1 - Math.exp(-6.5 * dt));

    surfaceMat.uniforms.uTime.value = t;
    surfaceMat.uniforms.uHover.value = hover.current;
    cloudMat.uniforms.uTime.value = t;
    cloudMat.uniforms.uHover.value = hover.current;
    atmosphereMat.uniforms.uHover.value = hover.current;
    hazeMat.uniforms.uHover.value = hover.current;

    if (!reducedMotion) {
      const spin = dt * 0.035;
      if (surface.current) surface.current.rotation.y += spin;
      if (clouds.current) clouds.current.rotation.y += spin * 1.35;
    }

    // The planet leans very slightly toward the visitor on hover.
    if (group.current) {
      const lean = hover.current * 0.05;
      group.current.rotation.x += (lean - group.current.rotation.x) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <mesh
        ref={surface}
        onPointerOver={interactive ? onPointerOver : undefined}
        onPointerOut={interactive ? onPointerOut : undefined}
        onClick={interactive ? onClick : undefined}
      >
        <sphereGeometry args={[radius, segments, segments / 2]} />
        <primitive object={surfaceMat} attach="material" />
      </mesh>

      <mesh ref={clouds} raycast={() => null}>
        <sphereGeometry args={[radius * 1.014, segments, segments / 2]} />
        <primitive object={cloudMat} attach="material" />
      </mesh>

      {/* Inner rim — tight, bright, hugs the limb */}
      <mesh raycast={() => null}>
        <sphereGeometry args={[radius * 1.035, 64, 32]} />
        <primitive object={atmosphereMat} attach="material" />
      </mesh>

      {/* Outer haze — wide and very faint, gives the planet its glow */}
      <mesh raycast={() => null}>
        <sphereGeometry args={[radius * 1.22, 48, 24]} />
        <primitive object={hazeMat} attach="material" />
      </mesh>
    </group>
  );
}
