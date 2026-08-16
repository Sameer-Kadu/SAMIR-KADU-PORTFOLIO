"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const STEPS = [
  "initialising exploration system",
  "compiling surface shaders",
  "plotting trajectory",
  "establishing viewport",
] as const;

/**
 * Loading sequence.
 *
 * Steps advance against genuine milestones — the WebGL context being created
 * and the first frame actually rendering — rather than a scripted fake wait, so
 * a fast machine gets through it quickly.
 */
export default function ExplorerLoader({
  ready,
  onDone,
}: {
  ready: boolean;
  onDone: () => void;
}) {
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);
  const finished = useRef(false);

  // Walk the first steps promptly; the last one waits for the real signal.
  useEffect(() => {
    if (step >= STEPS.length - 1) return;
    const id = setTimeout(() => setStep((s) => s + 1), 190);
    return () => clearTimeout(id);
  }, [step]);

  // The hand-off runs exactly once. Its timers live in a ref and are cleared
  // only on unmount — an effect-scoped cleanup would cancel the completion
  // timer when `setStep` below re-triggers this effect, stranding the loader.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finish = useCallback(
    (delay: number) => {
      if (finished.current) return;
      finished.current = true;
      setStep(STEPS.length);
      timers.current.push(
        setTimeout(() => {
          setClosing(true);
          timers.current.push(setTimeout(onDone, 520));
        }, delay)
      );
    },
    [onDone]
  );

  useEffect(() => {
    if (!ready || step < STEPS.length - 1) return;
    finish(260);
  }, [ready, step, finish]);

  // Backstop: never strand the visitor if the readiness signal never arrives.
  useEffect(() => {
    const id = setTimeout(() => finish(0), 6000);
    return () => clearTimeout(id);
  }, [finish]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const pct = Math.round((Math.min(step, STEPS.length) / STEPS.length) * 100);

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-0 z-40 grid place-items-center bg-[#04060a]"
        >
          <div className="w-full max-w-[24rem] px-8">
            <div className="mb-7 flex items-baseline justify-between">
              <span className="text-[13px] font-semibold text-white">Explorer View</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                {pct}%
              </span>
            </div>

            <ul className="space-y-2.5">
              {STEPS.map((s, i) => {
                const done = step > i;
                const current = step === i;
                return (
                  <li
                    key={s}
                    className="flex items-center justify-between gap-4 font-mono text-[11px] transition-opacity duration-200"
                    style={{ opacity: done ? 1 : current ? 0.7 : 0.25 }}
                  >
                    <span className="text-white/70">{s}</span>
                    <span className={done ? "text-[#34c789]" : "text-white/30"}>
                      {done ? "ok" : current ? "··" : ""}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 h-px w-full bg-white/10">
              <motion.div
                className="h-px bg-[#5c98ff]"
                animate={{ scaleX: Math.min(step, STEPS.length) / STEPS.length }}
                transition={{ duration: 0.2, ease: "linear" }}
                style={{ originX: 0 }}
              />
            </div>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
              engineering world · samir kadu
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
