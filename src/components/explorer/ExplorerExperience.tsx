"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import ExplorerProvider, { useExplorer } from "@/lib/explorer/store";
import { useExperienceMode } from "@/lib/explorer/mode";
import { DESTINATIONS } from "@/lib/explorer/journey";
import ModeSwitch from "@/components/system/ModeSwitch";

import CameraRig from "./scene/CameraRig";
import SpaceScene from "./scene/SpaceScene";
import CloudVeil from "./scene/CloudVeil";
import WorldScene from "./scene/world/WorldScene";

import Cockpit from "./hud/Cockpit";
import FlightHUD from "./hud/FlightHUD";
import TargetPanel from "./hud/TargetPanel";
import WorldHUD from "./hud/WorldHUD";
import DestinationPanel from "./hud/DestinationPanel";
import ExplorerLoader from "./hud/ExplorerLoader";

/** Scene contents, split out so it can sit inside <Canvas>. */
function Scene({ onEnterEarth }: { onEnterEarth: () => void }) {
  const { phase } = useExplorer();
  const inSpace =
    phase === "loading" ||
    phase === "warp" ||
    phase === "cockpit" ||
    phase === "arming" ||
    phase === "approach" ||
    phase === "entry";
  const inWorld = phase === "clouds" || phase === "landing" || phase === "world";

  return (
    <>
      <CameraRig />
      {/* The two scenes overlap only during `clouds`, when the veil hides the cut. */}
      {inSpace && <SpaceScene onEnterEarth={onEnterEarth} />}
      {inWorld && <WorldScene />}
      <CloudVeil />
    </>
  );
}

function ExplorerInner() {
  const { setMode } = useExperienceMode();
  const { phase, setPhase, destination, setDestination, quality } = useExplorer();
  const [ready, setReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const firstFrame = useRef(false);

  // Track which destinations have been opened, for the world-map progress dots.
  useEffect(() => {
    if (destination) setVisited((v) => (v.has(destination) ? v : new Set(v).add(destination)));
  }, [destination]);

  // Commit goes through `arming` first — the ship locks on and settles before
  // the burn, so the acceleration has anticipation behind it.
  const enterEarth = useCallback(() => {
    if (phase === "cockpit") setPhase("arming");
  }, [phase, setPhase]);

  // Keyboard access: Escape steps back out, digits jump to destinations.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (destination) setDestination(null);
        else if (phase === "world") setMode("engineer");
        return;
      }
      if (phase === "cockpit" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        enterEarth();
        return;
      }
      if (phase !== "world") return;
      const n = Number(e.key);
      if (n >= 1 && n <= DESTINATIONS.length) setDestination(DESTINATIONS[n - 1].id);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, destination, setDestination, setMode, enterEarth]);

  const dpr: [number, number] =
    quality === "high" ? [1, 2] : quality === "medium" ? [1, 1.5] : [0.75, 1];

  return (
    <div className="fixed inset-0 z-[60] bg-[#04060a]" data-explorer-phase={phase}>
      <Canvas
        dpr={dpr}
        gl={{
          antialias: quality !== "low",
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 6], fov: 54, near: 0.1, far: 2000 }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(new THREE.Color("#04060a"), 1);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          scene.fog = null;
          // Shadows are off entirely — every accent in this scene is emissive.
          gl.shadowMap.enabled = false;

          // Signal readiness from the context-creation callback itself rather
          // than from requestAnimationFrame: a backgrounded or non-compositing
          // tab never paints, and waiting on a frame would hang the loader.
          if (!firstFrame.current) {
            firstFrame.current = true;
            setReady(true);
          }
        }}
      >
        <Suspense fallback={null}>
          <Scene onEnterEarth={enterEarth} />
        </Suspense>
      </Canvas>

      {/* ── HUD layer ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* The canopy retires once the ship is on the ground */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: phase === "world" || phase === "landing" ? 0 : 1 }}
        >
          <Cockpit />
        </div>

        <div className="pointer-events-auto">
          <TargetPanel onEnter={enterEarth} />
        </div>

        <FlightHUD />
        <WorldHUD visited={visited} />
        <DestinationPanel />

        {/* Persistent escape hatch — Engineer View is always one click away */}
        <div className="pointer-events-auto absolute left-6 top-6 z-30 flex items-center gap-3">
          <ModeSwitch compact />
        </div>

        {/* Journey position */}
        {phase === "world" && (
          <p className="absolute right-6 top-7 z-20 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            {visited.size} / {DESTINATIONS.length} explored
          </p>
        )}
      </div>

      {!loaderDone && (
        <ExplorerLoader
          ready={ready}
          onDone={() => {
            setLoaderDone(true);
            // Open already in motion, then decelerate into the scene.
            setPhase("warp");
          }}
        />
      )}
    </div>
  );
}

/**
 * Explorer View root.
 *
 * Falls back to Engineer View rather than showing a dead canvas if the WebGL
 * context is lost after startup — the visitor always ends up somewhere real.
 */
export default function ExplorerExperience() {
  const reduceMotion = useReducedMotion();
  const { setMode } = useExperienceMode();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const onLost = (e: Event) => {
      e.preventDefault();
      setFailed(true);
    };
    window.addEventListener("webglcontextlost", onLost, true);
    return () => window.removeEventListener("webglcontextlost", onLost, true);
  }, []);

  useEffect(() => {
    if (failed) setMode("engineer");
  }, [failed, setMode]);

  if (failed) return null;

  return (
    <ExplorerProvider reducedMotion={Boolean(reduceMotion)}>
      <ExplorerInner />
    </ExplorerProvider>
  );
}
