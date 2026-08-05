"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { usePreciseDesktop } from "@/lib/hooks/useMediaQuery";

/** Labels for elements that opt in via `data-cursor`. */
const LABELS: Record<string, string> = {
  view: "View",
  external: "Open ↗",
  explore: "Explore",
};

/**
 * Minimal cursor enhancement, desktop only.
 *
 * The native cursor is hidden by a class this component adds after mount, so a
 * JS failure simply leaves the normal cursor in place. Text inputs and editable
 * regions keep their native carets (see globals via `.cursor-native`).
 */
export default function Cursor() {
  const enabled = usePreciseDesktop();
  const reduceMotion = useReducedMotion();
  const active = enabled && !reduceMotion;

  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springed = { stiffness: 900, damping: 45, mass: 0.35 };
  const sx = useSpring(x, springed);
  const sy = useSpring(y, springed);

  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const key = target?.getAttribute("data-cursor") ?? null;
      setLabel(key ? LABELS[key] ?? null : null);
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, visible, x, y]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] -translate-x-1/2 -translate-y-1/2"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{
          width: label ? "auto" : pressed ? 8 : 12,
          height: label ? 26 : pressed ? 8 : 12,
          paddingInline: label ? 10 : 0,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center rounded-full border border-accent/60 bg-accent/15 backdrop-blur-[1px]"
      >
        {label && (
          <span className="font-mono-tech whitespace-nowrap text-[0.625rem] uppercase tracking-[0.12em] text-accent">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
