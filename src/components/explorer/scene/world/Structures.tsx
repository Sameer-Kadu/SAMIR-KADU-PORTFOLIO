"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STORY } from "@/content/profile";
import { JOURNEY } from "@/content/journey";
import { PROJECTS } from "@/content/projects";
import { DOMAINS } from "@/content/domains";
import { ACHIEVEMENTS } from "@/content/achievements";
import type { Destination } from "@/lib/explorer/journey";

const ACCENT = "#5c98ff";
const SHELL = "#39485e";
const EDGE = "#54677f";

/**
 * Structure geometry is generated from the portfolio data itself — the Project
 * Lab has one slab per project, the Tech Core one node per domain, the Vault
 * one plinth per achievement. Add a project in `content/` and the world grows
 * a new element without anyone touching this file.
 */

function useAccentMaterial(intensity: number) {
  return useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(ACCENT).multiplyScalar(intensity),
        toneMapped: false,
      }),
    [intensity]
  );
}

function Shell({
  args,
  position,
  rotation,
}: {
  args: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} raycast={() => null}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={SHELL} roughness={0.62} metalness={0.12} />
    </mesh>
  );
}

/** Thin glowing bar used as a data element across several structures. */
function Seam({
  position,
  args,
  lit,
}: {
  position: [number, number, number];
  args: [number, number, number];
  lit: number;
}) {
  const mat = useAccentMaterial(lit);
  return (
    <mesh position={position} material={mat} raycast={() => null}>
      <boxGeometry args={args} />
    </mesh>
  );
}

/* ── 01 Origin Station — one lit segment per story chapter ───────── */
function Monolith({ glow }: { glow: number }) {
  return (
    <group>
      <Shell args={[3.4, 0.6, 3.4]} position={[0, 0.3, 0]} />
      <Shell args={[2.2, 11, 2.2]} position={[0, 6, 0]} />
      {STORY.map((_, i) => (
        <Seam
          key={i}
          position={[0, 2 + i * 1.9, 1.12]}
          args={[1.3, 0.09, 0.05]}
          lit={0.6 + glow * (0.5 + i * 0.12)}
        />
      ))}
      <Seam position={[0, 11.7, 0]} args={[0.5, 0.5, 0.5]} lit={1.2 + glow} />
    </group>
  );
}

/* ── 02 Career Path — one ascending platform per journey chapter ── */
function Path({ glow }: { glow: number }) {
  return (
    <group>
      {JOURNEY.map((_, i) => {
        const y = 0.4 + i * 1.5;
        const z = -i * 4.4;
        return (
          <group key={i} position={[0, 0, z]}>
            <Shell args={[6.5 - i * 0.7, 0.7, 3.2]} position={[0, y, 0]} />
            <Seam
              position={[0, y + 0.4, 1.62]}
              args={[4.4 - i * 0.6, 0.07, 0.04]}
              lit={0.55 + glow * 0.9}
            />
            <Shell args={[0.35, y + 0.4, 0.35]} position={[-2.4 + i * 0.3, (y + 0.4) / 2, 0]} />
            <Shell args={[0.35, y + 0.4, 0.35]} position={[2.4 - i * 0.3, (y + 0.4) / 2, 0]} />
          </group>
        );
      })}
    </group>
  );
}

/* ── 03 Project Lab — one hovering slab per project ──────────────── */
function Lab({ glow }: { glow: number }) {
  const slabs = useRef<THREE.Group>(null);
  const mat = useAccentMaterial(0.5 + glow);

  useFrame((state) => {
    if (!slabs.current) return;
    const t = state.clock.elapsedTime;
    slabs.current.children.forEach((child, i) => {
      child.position.y = 4.2 + Math.sin(t * 0.5 + i * 1.7) * 0.28;
      child.rotation.y = t * 0.12 + i * 0.9;
    });
  });

  return (
    <group>
      {/* Base ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]} raycast={() => null}>
        <ringGeometry args={[4.2, 6.4, 48]} />
        <meshStandardMaterial color={SHELL} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.16, 0]} material={mat} raycast={() => null}>
        <ringGeometry args={[6.1, 6.4, 48]} />
      </mesh>

      {/* Support pylons */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <Shell
            key={i}
            args={[0.32, 3.6, 0.32]}
            position={[Math.cos(a) * 5.2, 1.8, Math.sin(a) * 5.2]}
          />
        );
      })}

      {/* One holographic slab per real project */}
      <group ref={slabs}>
        {PROJECTS.map((p, i) => {
          const a = (i / Math.max(PROJECTS.length, 1)) * Math.PI * 2;
          return (
            <group key={p.id} position={[Math.cos(a) * 2.6, 4.2, Math.sin(a) * 2.6]}>
              <mesh raycast={() => null}>
                <boxGeometry args={[2.4, 1.5, 0.08]} />
                <meshBasicMaterial
                  color={ACCENT}
                  transparent
                  opacity={0.16 + glow * 0.22}
                  toneMapped={false}
                />
              </mesh>
              <mesh raycast={() => null}>
                <boxGeometry args={[2.44, 1.54, 0.02]} />
                <meshBasicMaterial color={ACCENT} wireframe toneMapped={false} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* ── 04 Tech Core — one orbiting node per engineering domain ─────── */
function Core({ glow }: { glow: number }) {
  const orbit = useRef<THREE.Group>(null);
  const coreMat = useAccentMaterial(0.45 + glow * 0.8);
  const nodeMat = useAccentMaterial(0.9 + glow);

  useFrame((state, delta) => {
    if (orbit.current) orbit.current.rotation.y += delta * 0.16;
    if (orbit.current) {
      const t = state.clock.elapsedTime;
      orbit.current.children.forEach((c, i) => {
        c.position.y = 4.4 + Math.sin(t * 0.6 + i) * 0.5;
      });
    }
  });

  return (
    <group>
      <Shell args={[5.2, 0.8, 5.2]} position={[0, 0.4, 0]} />

      {/* Reactor */}
      <mesh position={[0, 4.4, 0]} material={coreMat} raycast={() => null}>
        <icosahedronGeometry args={[1.5, 1]} />
      </mesh>
      <mesh position={[0, 4.4, 0]} raycast={() => null}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.25} toneMapped={false} />
      </mesh>

      {/* Containment columns */}
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <Shell key={i} args={[0.4, 8, 0.4]} position={[Math.cos(a) * 3.6, 4, Math.sin(a) * 3.6]} />
        );
      })}

      {/* One node per domain */}
      <group ref={orbit}>
        {DOMAINS.map((d, i) => {
          const a = (i / DOMAINS.length) * Math.PI * 2;
          const r = 3.2;
          return (
            <mesh
              key={d.id}
              position={[Math.cos(a) * r, 4.4, Math.sin(a) * r]}
              material={nodeMat}
              raycast={() => null}
            >
              <octahedronGeometry args={[0.34, 0]} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ── 05 Achievement Vault — one plinth per real milestone ────────── */
function Vault({ glow }: { glow: number }) {
  const items = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!items.current) return;
    const t = state.clock.elapsedTime;
    items.current.children.forEach((c, i) => {
      c.rotation.y = t * 0.28 + i * 2.1;
      c.position.y = 3.2 + Math.sin(t * 0.45 + i * 1.4) * 0.22;
    });
  });

  return (
    <group>
      <Shell args={[9, 0.7, 6]} position={[0, 0.35, 0]} />

      {/* Plinth beneath each artifact */}
      {ACHIEVEMENTS.map((a, i) => {
        const x = (i - (ACHIEVEMENTS.length - 1) / 2) * 2.9;
        return <Shell key={a.id} args={[1.5, 1.9, 1.5]} position={[x, 1.6, 0]} />;
      })}

      <group ref={items}>
        {ACHIEVEMENTS.map((a, i) => {
          const x = (i - (ACHIEVEMENTS.length - 1) / 2) * 2.9;
          return (
            <mesh key={a.id} position={[x, 3.2, 0]} raycast={() => null}>
              <octahedronGeometry args={[0.85, 0]} />
              <meshBasicMaterial
                color={ACCENT}
                transparent
                opacity={0.35 + glow * 0.4}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ── 06 Communication Tower — one ring per contact channel ───────── */
function Tower({ glow }: { glow: number }) {
  const rings = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rings.current) return;
    const t = state.clock.elapsedTime;
    rings.current.children.forEach((c, i) => {
      const phase = (t * 0.4 + i / 3) % 1;
      c.scale.setScalar(0.4 + phase * 2.6);
      const m = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
      m.opacity = (1 - phase) * (0.35 + glow * 0.4);
    });
  });

  return (
    <group>
      <Shell args={[4.2, 0.7, 4.2]} position={[0, 0.35, 0]} />
      <Shell args={[0.7, 13, 0.7]} position={[0, 7, 0]} />

      {/* Dish */}
      <mesh position={[0, 13.4, 0]} rotation={[-0.5, 0, 0]} raycast={() => null}>
        <sphereGeometry args={[2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.6]} />
        <meshStandardMaterial color={EDGE} roughness={0.5} metalness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <Seam position={[0, 13.4, 0]} args={[0.25, 0.25, 0.25]} lit={1.4 + glow} />

      {/* Emitted signal rings */}
      <group ref={rings} position={[0, 13.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} raycast={() => null}>
            <ringGeometry args={[1.8, 2.0, 40]} />
            <meshBasicMaterial color={ACCENT} transparent opacity={0.3} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

const FORMS = {
  monolith: Monolith,
  path: Path,
  lab: Lab,
  core: Core,
  vault: Vault,
  tower: Tower,
} as const;

export default function Structure({
  destination,
  glow,
}: {
  destination: Destination;
  glow: number;
}) {
  const Form = FORMS[destination.form];
  return <Form glow={glow} />;
}
