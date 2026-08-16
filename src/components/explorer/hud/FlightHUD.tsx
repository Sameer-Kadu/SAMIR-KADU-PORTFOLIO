"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExplorer } from "@/lib/explorer/store";
import { EASE } from "@/lib/motion";

/**
 * Flight telemetry.
 *
 * The numbers are presentational and labelled as a decorative readout rather
 * than dressed up as real orbital mechanics — they communicate "we are moving"
 * without pretending to be a simulation.
 */
export default function FlightHUD() {
  const { phase, progress, earthHovered } = useExplorer();
  const [tick, setTick] = useState(0);

  // Sample the shared progress ref a few times a second — enough for a
  // readout to feel live, far cheaper than re-rendering every frame.
  useEffect(() => {
    if (phase === "cockpit" || phase === "world" || phase === "landing") return;
    const id = setInterval(() => setTick((t) => t + 1), 90);
    return () => clearInterval(id);
  }, [phase]);

  const p = progress.current;
  const inFlight =
    phase === "warp" ||
    phase === "arming" ||
    phase === "approach" ||
    phase === "entry" ||
    phase === "clouds";

  const status =
    phase === "warp"
      ? "DECELERATING"
      : phase === "arming"
        ? "TARGET LOCKED"
        : phase === "approach"
          ? "APPROACHING"
          : phase === "entry"
            ? "ATMOSPHERIC ENTRY"
            : phase === "clouds"
              ? "DESCENDING"
              : earthHovered
                ? "DESTINATION LOCKED"
                : "STANDING BY";

  // Range closes and speed rises then bleeds off across the sequence.
  const altitude =
    phase === "warp" || phase === "arming"
      ? Math.round(2_400_000 - (phase === "warp" ? p : 1) * 1_100_000)
      : phase === "approach"
        ? Math.round(1_240_000 * (1 - p) + 120_000)
        : phase === "entry"
          ? Math.round(120_000 * (1 - p) + 11_000)
          : Math.round(11_000 * (1 - p) + 900);

  const velocity =
    phase === "warp"
      ? Math.round(94_000 * Math.pow(1 - p, 1.6) + 6400)
      : phase === "arming"
        ? 6400
        : phase === "approach"
          ? Math.round(6400 + p * 21_000)
          : phase === "entry"
            ? Math.round(27_400 - p * 19_000)
            : Math.round(8400 - p * 7100);

  return (
    <>
      {/* Status strip, bottom-centre */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex items-center gap-3 rounded-full border border-white/12 bg-black/45 px-5 py-2 backdrop-blur-sm"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                inFlight || earthHovered ? "bg-[#5c98ff]" : "bg-white/40"
              }`}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">
              {status}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Telemetry, only while actually flying */}
      <AnimatePresence>
        {inFlight && (
          <motion.dl
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="pointer-events-none absolute right-8 top-1/2 z-20 -translate-y-1/2 space-y-4 text-right"
            data-tick={tick}
          >
            {[
              { label: "altitude", value: `${altitude.toLocaleString()} km` },
              { label: "velocity", value: `${velocity.toLocaleString()} km/h` },
              { label: "vector", value: phase === "approach" ? "INBOUND" : "DESCENT" },
            ].map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                  {row.label}
                </dt>
                <dd className="font-mono text-[13px] tabular-nums text-white/85">{row.value}</dd>
              </div>
            ))}
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              readout is decorative
            </p>
          </motion.dl>
        )}
      </AnimatePresence>
    </>
  );
}
