"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section currently occupies the viewport.
 *
 * Uses a single IntersectionObserver rather than a scroll listener, and picks
 * the most-visible entry so short sections next to tall ones still register.
 */
export function useSectionSpy(ids: string[], initial = ids[0]): string {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      {
        // Discount the fixed nav so a section counts once it is genuinely in view.
        rootMargin: "-15% 0px -35% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.9],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
