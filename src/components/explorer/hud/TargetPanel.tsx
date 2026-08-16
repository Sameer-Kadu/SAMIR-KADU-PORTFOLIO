"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useExplorer } from "@/lib/explorer/store";
import { EASE } from "@/lib/motion";

/**
 * Earth targeting overlay.
 *
 * Two stages, so the destination is discoverable without shouting: a quiet
 * "signal detected" marker while the visitor is simply looking around, and a
 * full target lock the moment the pointer reaches the planet.
 */
export default function TargetPanel({ onEnter }: { onEnter: () => void }) {
  const { phase, earthHovered } = useExplorer();
  if (phase !== "cockpit") return null;

  return (
    <>
      {/* Passive prompt */}
      <AnimatePresence>
        {!earthHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
            className="pointer-events-none absolute left-8 top-1/2 z-20 -translate-y-1/2"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              signal detected
            </p>
            <p className="mt-1.5 max-w-[13rem] text-[13px] leading-relaxed text-white/60">
              An inhabited system is broadcasting nearby. Look around, then approach it.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Target lock */}
      <AnimatePresence>
        {earthHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute inset-x-0 top-[16%] z-20 flex justify-center"
          >
            <div className="pointer-events-auto w-[19rem] overflow-hidden rounded-lg border border-[#5c98ff]/40 bg-black/55 backdrop-blur-md">
              <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-2">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[#5c98ff]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5c98ff]">
                  destination locked
                </span>
              </div>

              <div className="px-4 py-3.5">
                <p className="text-[17px] font-semibold text-white">Earth</p>
                <p className="mt-0.5 text-[12px] text-white/55">
                  Engineering world located
                </p>

                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-white/10 pt-3">
                  {[
                    ["class", "Terrestrial"],
                    ["status", "Inhabited"],
                    ["surface", "Outpost"],
                    ["signal", "Strong"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-2">
                      <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                        {k}
                      </dt>
                      <dd className="font-mono text-[11px] text-white/70">{v}</dd>
                    </div>
                  ))}
                </dl>

                <button
                  type="button"
                  onClick={onEnter}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#5c98ff] px-4 py-2.5 text-[13px] font-semibold text-[#04070d] transition-colors duration-150 hover:bg-[#7fb0ff]"
                >
                  Enter engineering world
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
