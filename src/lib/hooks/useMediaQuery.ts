"use client";

import { useEffect, useState } from "react";

/**
 * Subscribes to a media query. Returns `false` during SSR and the first client
 * render so markup stays deterministic, then settles on the real value.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True only for devices with a precise pointer and a desktop-sized viewport. */
export function usePreciseDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px) and (pointer: fine) and (hover: hover)");
}
