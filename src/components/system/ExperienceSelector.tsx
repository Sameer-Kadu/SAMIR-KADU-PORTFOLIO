"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Orbit, SquareTerminal } from "lucide-react";
import { useExperienceMode } from "@/lib/explorer/mode";
import { EASE } from "@/lib/motion";

const OPTIONS = [
  {
    mode: "engineer" as const,
    index: "01",
    title: "Engineer View",
    lede: "Explore the portfolio as a structured engineering profile.",
    Icon: SquareTerminal,
    traits: ["Structured", "Technical", "Fast"],
  },
  {
    mode: "explorer" as const,
    index: "02",
    title: "Explorer View",
    lede: "Enter and explore the engineering universe.",
    Icon: Orbit,
    traits: ["Immersive", "Interactive", "3D"],
  },
];

/**
 * First-visit experience selector, shown once per session on eligible desktops.
 *
 * Framed as a navigation console rather than a settings dialog. Dismissing it
 * (Escape, backdrop, or the skip link) simply keeps Engineer View — the
 * visitor is never blocked from the real content.
 */
export default function ExperienceSelector() {
  const { offering, setMode, dismissOffer } = useExperienceMode();
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!offering) return;

    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismissOffer();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [offering, dismissOffer]);

  return (
    <AnimatePresence>
      {offering && (
        <div className="fixed inset-0 z-[85] grid place-items-center px-6">
          <motion.button
            type="button"
            aria-label="Continue in Engineer View"
            onClick={dismissOffer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 h-full w-full cursor-default bg-bg/85 backdrop-blur-[3px]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-selector-title"
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line-strong bg-raised shadow-float outline-none"
          >
            {/* Console header */}
            <div className="flex items-center gap-3 border-b border-line px-6 py-4">
              <span className="status-dot" />
              <span className="tech-label">navigation console</span>
              <span className="tech-label ml-auto">2 modes available</span>
            </div>

            <div className="px-6 pb-6 pt-7">
              <h2
                id="experience-selector-title"
                className="text-[1.5rem] font-semibold leading-tight text-ink"
              >
                Choose your experience
              </h2>
              <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-ink-2">
                The same portfolio, two ways in. You can switch between them at any time —
                nothing is locked behind either choice.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {OPTIONS.map(({ mode, index, title, lede, Icon, traits }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setMode(mode)}
                    className="group relative flex flex-col rounded-xl border border-line bg-panel p-5 text-left transition-colors duration-med hover:border-accent focus-visible:border-accent"
                  >
                    <div className="mb-4 flex items-center gap-2.5">
                      <span className="font-mono-tech text-[0.6875rem] text-accent">{index}</span>
                      <span className="h-px flex-1 bg-line" />
                      <Icon className="h-4 w-4 text-ink-3 transition-colors duration-med group-hover:text-accent" />
                    </div>

                    <h3 className="text-[1.0625rem] font-semibold text-ink">{title}</h3>
                    <p className="mt-2 min-h-[2.5rem] text-[0.8125rem] leading-relaxed text-ink-2">
                      {lede}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {traits.map((t) => (
                        <li
                          key={t}
                          className="rounded border border-line px-1.5 py-0.5 font-mono-tech text-[0.625rem] text-ink-3"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-3 transition-colors duration-med group-hover:text-accent">
                      {mode === "engineer" ? "Continue" : "Launch"}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" />
                    </span>
                  </button>
                ))}
              </div>

              <p className="mt-5 text-[0.75rem] text-ink-3">
                Explorer View is a WebGL experience for large screens.{" "}
                <button
                  type="button"
                  onClick={dismissOffer}
                  className="link-underline text-ink-2"
                >
                  Skip and use Engineer View
                </button>
                .
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
