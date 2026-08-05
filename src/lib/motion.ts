import type { Transition, Variants } from "framer-motion";

/**
 * Motion system. Three speeds and one easing family, mirroring the CSS custom
 * properties in globals.css so JS- and CSS-driven motion stay in step.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_INOUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.15,
  med: 0.32,
  slow: 0.64,
} as const;

export const transition = {
  fast: { duration: DURATION.fast, ease: EASE },
  med: { duration: DURATION.med, ease: EASE },
  slow: { duration: DURATION.slow, ease: EASE },
} satisfies Record<string, Transition>;

/** Standard section reveal — used by every module for a consistent entrance. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
};

/** Container that staggers its children's reveal. */
export const staggerVariants = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Child of a stagger container. */
export const childVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transition.med },
};

/** Viewport config shared by every scroll-triggered reveal. */
export const inViewOnce = { once: true, amount: 0.18 } as const;
