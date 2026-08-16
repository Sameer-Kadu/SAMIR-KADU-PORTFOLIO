"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ExperienceMode = "engineer" | "explorer";

const STORAGE_KEY = "portfolio:mode";
const SELECTOR_SEEN_KEY = "portfolio:mode-offered";

type ModeContext = {
  mode: ExperienceMode;
  setMode: (mode: ExperienceMode) => void;
  /** True once we know the device can actually run Explorer View. */
  eligible: boolean;
  /** True while the first-visit "choose your experience" overlay should show. */
  offering: boolean;
  dismissOffer: () => void;
};

const Ctx = createContext<ModeContext | null>(null);

export function useExperienceMode(): ModeContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useExperienceMode must be used inside ExperienceModeProvider");
  return ctx;
}

/**
 * Detects whether Explorer View can run at all.
 *
 * Three gates, all of which must pass: a large enough viewport, a precise
 * pointer (Explorer is a mouse-look experience), and a working WebGL context.
 * The 1024px threshold is the existing design system's `lg` breakpoint — the
 * same fork where the hero already swaps its radial diagram for a list.
 */
function detectEligibility(): boolean {
  if (typeof window === "undefined") return false;

  const bigEnough = window.matchMedia("(min-width: 1024px)").matches;
  const precisePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
  if (!bigEnough || !precisePointer) return false;

  // Probe for a real WebGL context, then release it immediately.
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    if (!gl) return false;
    const lose = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function ExperienceModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ExperienceMode>("engineer");
  const [eligible, setEligible] = useState(false);
  const [offering, setOffering] = useState(false);

  useEffect(() => {
    const ok = detectEligibility();
    setEligible(ok);
    if (!ok) return;

    let stored: string | null = null;
    let offered: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
      offered = sessionStorage.getItem(SELECTOR_SEEN_KEY);
    } catch {
      // Storage denied — fall through to defaults.
    }

    if (stored === "explorer" || stored === "engineer") {
      setModeState(stored);
    } else if (!offered) {
      // First visit on an eligible device: offer the choice once per session.
      setOffering(true);
    }

    // Re-check on resize so shrinking the window drops out of Explorer View.
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        setEligible(false);
        setModeState("engineer");
        setOffering(false);
      } else {
        setEligible(detectEligibility());
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const setMode = useCallback((next: ExperienceMode) => {
    setModeState(next);
    setOffering(false);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      sessionStorage.setItem(SELECTOR_SEEN_KEY, "1");
    } catch {
      // Non-fatal.
    }
  }, []);

  const dismissOffer = useCallback(() => {
    setOffering(false);
    try {
      sessionStorage.setItem(SELECTOR_SEEN_KEY, "1");
    } catch {
      // Non-fatal.
    }
  }, []);

  // Lock page scroll while Explorer View owns the viewport.
  useEffect(() => {
    const active = eligible && mode === "explorer";
    document.documentElement.classList.toggle("explorer-active", active);
    return () => document.documentElement.classList.remove("explorer-active");
  }, [eligible, mode]);

  const value = useMemo(
    () => ({ mode, setMode, eligible, offering, dismissOffer }),
    [mode, setMode, eligible, offering, dismissOffer]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
