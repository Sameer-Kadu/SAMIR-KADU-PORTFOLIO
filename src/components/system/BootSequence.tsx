"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BOOT_LINES, SITE } from "@/content/site";
import { EASE } from "@/lib/motion";

const STEP_MS = 130;
const HOLD_MS = 220;

/** Session key shared with the pre-hydration script in `layout.tsx`. */
export const BOOT_KEY = "workspace:booted";

/**
 * Initialization sequence.
 *
 * Runs once per browser session and takes roughly a second. Repeat navigation
 * within the session never sees it: an inline script in the document head hides
 * the overlay before first paint, and this component unmounts immediately.
 *
 * The page content is fully rendered underneath the whole time — the overlay is
 * decoration, never a gate on content or crawlability.
 */
export default function BootSequence() {
  const reduceMotion = useReducedMotion();
  const [running, setRunning] = useState(true);
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const finish = () => {
      try {
        sessionStorage.setItem(BOOT_KEY, "1");
      } catch {
        // Private-mode storage denial is not worth failing over.
      }
      document.documentElement.dataset.booted = "1";
      setRunning(false);
    };

    const alreadyBooted =
      document.documentElement.dataset.booted === "1" ||
      (() => {
        try {
          return sessionStorage.getItem(BOOT_KEY) === "1";
        } catch {
          return false;
        }
      })();

    if (alreadyBooted || reduceMotion) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";

    const schedule = timers.current;
    BOOT_LINES.forEach((_, i) => {
      schedule.push(setTimeout(() => setStep(i + 1), STEP_MS * (i + 1)));
    });
    schedule.push(setTimeout(finish, STEP_MS * BOOT_LINES.length + HOLD_MS));

    return () => {
      schedule.forEach(clearTimeout);
      schedule.length = 0;
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!running) document.body.style.overflow = "";
  }, [running]);

  return (
    <AnimatePresence>
      {running && (
        <motion.div
          id="boot-overlay"
          aria-hidden="true"
          exit={{ opacity: 0, transition: { duration: 0.36, ease: EASE } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        >
          {/* Faint alignment grid so the overlay already reads as the workspace */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--grid)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid)) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          <div className="relative w-full max-w-[22rem] px-6">
            <div className="mb-6 flex items-baseline justify-between">
              <span className="font-mono text-[0.8125rem] font-medium tracking-tight text-ink">
                {SITE.name}
              </span>
              <span className="tech-label">workspace</span>
            </div>

            <ul className="space-y-2">
              {BOOT_LINES.map((line, i) => {
                const done = step > i;
                return (
                  <li
                    key={line}
                    className="flex items-center justify-between gap-4 font-mono text-[0.75rem] transition-opacity duration-fast"
                    style={{ opacity: done ? 1 : 0.28 }}
                  >
                    <span className="text-ink-2">{line}</span>
                    <span className={done ? "text-live" : "text-ink-3"}>
                      {done ? "ok" : "··"}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Progress hairline */}
            <div className="mt-6 h-px w-full bg-line">
              <motion.div
                className="h-px bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step / BOOT_LINES.length }}
                transition={{ duration: 0.13, ease: "linear" }}
                style={{ originX: 0 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
