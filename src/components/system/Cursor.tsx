"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { usePreciseDesktop } from "@/lib/hooks/useMediaQuery";

/** Labels for elements that opt in via `data-cursor`. */
const LABELS: Record<string, string> = {
  view: "View",
  external: "Open ↗",
  explore: "Explore",
};

/** Anything clickable gets the "ring" state even without a `data-cursor` label. */
const INTERACTIVE = "a, button, [role='button'], summary, label[for], select";

type Mode = "dot" | "ring" | "label";

/**
 * Minimal cursor enhancement, desktop only.
 *
 * The native cursor is hidden by a class this component adds after mount, so a
 * JS failure simply leaves the normal cursor in place. Text inputs and editable
 * regions keep their native carets (see globals via `.has-custom-cursor`).
 *
 * Contrast: the cursor must stay visible on every surface, including the
 * accent-filled primary buttons. The dot carries a ring in the page background
 * colour, and the label pill is an opaque raised surface with ink text — so
 * neither ever disappears into an accent background.
 */
export default function Cursor() {
  const enabled = usePreciseDesktop();
  const reduceMotion = useReducedMotion();
  const active = enabled && !reduceMotion;

  const [mode, setMode] = useState<Mode>("dot");
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springed = { stiffness: 900, damping: 45, mass: 0.35 };
  const sx = useSpring(x, springed);
  const sy = useSpring(y, springed);

  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const last = { x: -100, y: -100 };

    /** Decide the cursor state from whatever element is under the pointer. */
    const resolve = (el: HTMLElement | null) => {
      const labelled = el?.closest?.("[data-cursor]");
      const key = labelled?.getAttribute("data-cursor") ?? null;
      const text = key ? LABELS[key] ?? null : null;

      if (text) {
        setLabel(text);
        setMode("label");
      } else {
        setLabel(null);
        setMode(el?.closest?.(INTERACTIVE) ? "ring" : "dot");
      }
    };

    const onMove = (e: PointerEvent) => {
      last.x = e.clientX;
      last.y = e.clientY;
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      resolve(e.target as HTMLElement | null);
    };

    // Scrolling moves content under a still pointer without any pointermove,
    // which would leave a stale "View" label behind. Re-check on scroll.
    let raf = 0;
    const onScroll = () => {
      if (!visibleRef.current || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        resolve(document.elementFromPoint(last.x, last.y) as HTMLElement | null);
      });
    };

    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, x, y]);

  if (!active) return null;

  const size =
    mode === "label"
      ? { width: "auto", height: 26, paddingInline: 10 }
      : mode === "ring"
        ? { width: pressed ? 26 : 34, height: pressed ? 26 : 34, paddingInline: 0 }
        : { width: pressed ? 8 : 12, height: pressed ? 8 : 12, paddingInline: 0 };

  const look =
    mode === "label"
      ? // Opaque pill: readable on any surface, accent buttons included.
        "border-line-strong bg-raised shadow-float"
      : mode === "ring"
        ? // Hollow ring in ink with a background halo, so it frames the target.
          "border-ink/70 bg-transparent shadow-[0_0_0_1px_rgb(var(--bg)/0.6)]"
        : // Solid accent dot with a background-coloured halo.
          "border-accent bg-accent shadow-[0_0_0_2px_rgb(var(--bg)/0.85)]";

  return (
    // Positioning wrapper: framer-motion owns `transform` here (x / y), so the
    // centring offset lives on the plain inner div instead.
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80]"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={size}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center justify-center rounded-full border transition-colors duration-fast ${look}`}
        >
          {label && (
            <span className="font-mono-tech whitespace-nowrap text-[0.625rem] uppercase tracking-[0.12em] text-ink">
              {label}
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
