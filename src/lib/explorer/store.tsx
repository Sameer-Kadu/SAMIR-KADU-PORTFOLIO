"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { DestinationId, Phase } from "./journey";

type ExplorerState = {
  phase: Phase;
  /** 0–1 progress through the current cinematic phase. */
  destination: DestinationId | null;
  /** Destination currently under the pointer, for HUD readouts. */
  hovered: DestinationId | null;
  earthHovered: boolean;
  quality: "high" | "medium" | "low";
  reducedMotion: boolean;
};

type ExplorerActions = {
  setPhase: (phase: Phase) => void;
  setDestination: (id: DestinationId | null) => void;
  setHovered: (id: DestinationId | null) => void;
  setEarthHovered: (hovered: boolean) => void;
  /**
   * Mutable per-frame clock shared between the R3F scene and the HUD without
   * forcing React re-renders sixty times a second.
   */
  progress: React.RefObject<number>;
  /** `performance.now()` at which the current phase began. */
  phaseStart: React.RefObject<number>;
};

const Ctx = createContext<(ExplorerState & ExplorerActions) | null>(null);

export function useExplorer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useExplorer must be used inside ExplorerProvider");
  return ctx;
}

/**
 * Picks a rendering tier from what the device tells us about itself. Mirrors
 * the reference portfolio's "adaptive device tiering" idea: the scene is the
 * same, the sampling density is not.
 */
function detectQuality(): ExplorerState["quality"] {
  if (typeof navigator === "undefined") return "medium";
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  if (cores >= 8 && memory >= 8) return "high";
  if (cores <= 4 || memory <= 4 || dpr > 2.5) return "low";
  return "medium";
}

export default function ExplorerProvider({
  children,
  reducedMotion,
}: {
  children: ReactNode;
  reducedMotion: boolean;
}) {
  const [phase, setPhaseState] = useState<Phase>("loading");
  const [destination, setDestination] = useState<DestinationId | null>(null);
  const [hovered, setHovered] = useState<DestinationId | null>(null);
  const [earthHovered, setEarthHovered] = useState(false);
  const [quality] = useState(detectQuality);
  const progress = useRef(0);
  const phaseStart = useRef(0);

  const setPhase = useCallback((next: Phase) => {
    progress.current = 0;
    // Cinematics are timed against the wall clock rather than accumulated
    // frame deltas, so a throttled or dropped-frame render loop still finishes
    // the sequence in the intended number of seconds.
    phaseStart.current = performance.now();
    setPhaseState(next);
  }, []);

  const value = useMemo(
    () => ({
      phase,
      destination,
      hovered,
      earthHovered,
      quality,
      reducedMotion,
      setPhase,
      setDestination,
      setHovered,
      setEarthHovered,
      progress,
      phaseStart,
    }),
    [phase, destination, hovered, earthHovered, quality, reducedMotion, setPhase]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
