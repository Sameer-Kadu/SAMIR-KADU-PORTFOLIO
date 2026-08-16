"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { DESTINATIONS, type Destination } from "@/lib/explorer/journey";
import { useExplorer } from "@/lib/explorer/store";
import { LandingPad, SkyDome, Terrain } from "./Environment";
import Structure from "./Structures";

/**
 * One destination: its structure, a ground beacon, and an always-visible
 * label so the world is navigable by looking rather than by guessing.
 */
function DestinationNode({ destination }: { destination: Destination }) {
  const {
    phase,
    hovered,
    destination: active,
    setHovered,
    setDestination,
    reducedMotion,
  } = useExplorer();
  const [localHover, setLocalHover] = useState(false);
  const group = useRef<THREE.Group>(null);
  const beacon = useRef<THREE.Mesh>(null);
  const glow = useRef(0);
  const [glowState, setGlowState] = useState(0);

  const isHovered = hovered === destination.id || localHover;
  const isActive = active === destination.id;

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const target = isActive ? 1 : isHovered ? 0.75 : 0;
    glow.current += (target - glow.current) * (1 - Math.exp(-6 * dt));

    // Push the smoothed value into React only when it moves meaningfully,
    // so shader-driven children update without a per-frame re-render storm.
    if (Math.abs(glow.current - glowState) > 0.02) setGlowState(glow.current);

    if (beacon.current) {
      const t = state.clock.elapsedTime;
      const pulse = reducedMotion ? 0.5 : (Math.sin(t * 1.4) * 0.5 + 0.5) * 0.5 + 0.35;
      const mat = beacon.current.material as THREE.MeshBasicMaterial;
      mat.opacity = pulse * (0.25 + glow.current * 0.6);
      beacon.current.scale.setScalar(1 + glow.current * 0.16);
    }

    // The whole structure lifts a touch when selected.
    if (group.current) {
      const lift = glow.current * 0.35;
      group.current.position.y += (lift - group.current.position.y) * 0.1;
    }
  });

  return (
    <group position={destination.position}>
      {/* Ground beacon — the affordance that says "this is a place" */}
      <mesh
        ref={beacon}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.08, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setLocalHover(true);
          setHovered(destination.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setLocalHover(false);
          setHovered(null);
          document.body.style.cursor = "";
        }}
        onClick={(e) => {
          e.stopPropagation();
          setDestination(destination.id);
        }}
      >
        <circleGeometry args={[7.5, 48]} />
        <meshBasicMaterial color="#5c98ff" transparent opacity={0.3} toneMapped={false} />
      </mesh>

      <group ref={group}>
        <Structure destination={destination} glow={glowState} />
      </group>

      {/*
        Label. Kept as DOM so it stays crisp and readable at any distance —
        which also means the WebGL cloud veil cannot occlude it, so it only
        appears once the descent is over and the world is actually visible.
      */}
      <Html
        position={[0, 15.5, 0]}
        center
        distanceFactor={38}
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div
          className={`whitespace-nowrap text-center transition-opacity duration-500 ${
            phase !== "world"
              ? "opacity-0"
              : isActive || isHovered
                ? "opacity-100"
                : "opacity-70"
          }`}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5c98ff]">
            {destination.index}
          </div>
          <div className="mt-1 text-[15px] font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {destination.name}
          </div>
          <div
            className={`mt-0.5 text-[11px] text-white/60 transition-opacity duration-300 ${
              isHovered || isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            {destination.tagline}
          </div>
        </div>
      </Html>
    </group>
  );
}

/**
 * The engineering outpost.
 *
 * Six destinations arranged around the landing pad. Lighting is a single
 * directional plus ambient with shadows disabled — the reference portfolio's
 * "bake it, do not compute it" lesson, applied to a scene that has to hold
 * sixty frames a second on a laptop.
 */
export default function WorldScene() {
  return (
    <>
      <SkyDome />
      <Terrain />
      <LandingPad />

      {/* Key, fill and rim. No shadow maps — every accent here is emissive. */}
      <ambientLight intensity={1.5} color="#93aacc" />
      <directionalLight position={[26, 24, -30]} intensity={2.4} color="#d6e6ff" />
      <directionalLight position={[-34, 14, 26]} intensity={0.9} color="#5b7fb8" />
      <hemisphereLight args={["#7f9dc9", "#0b1119", 0.9]} />

      {DESTINATIONS.map((d) => (
        <DestinationNode key={d.id} destination={d} />
      ))}
    </>
  );
}
