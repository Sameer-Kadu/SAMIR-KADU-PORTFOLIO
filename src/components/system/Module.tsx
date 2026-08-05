"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { inViewOnce, revealVariants } from "@/lib/motion";

type ModuleProps = {
  id: string;
  index: string;
  /** Monospace eyebrow, e.g. "stack". */
  code: string;
  title: ReactNode;
  lead?: string;
  children: ReactNode;
  /** Alternate surface, used to separate adjacent modules. */
  sunken?: boolean;
  className?: string;
};

/**
 * Shared section frame. Every module carries the same numbered header and the
 * same reveal, which is what makes the site read as one indexed system rather
 * than a stack of unrelated pages.
 */
export default function Module({
  id,
  index,
  code,
  title,
  lead,
  children,
  sunken = false,
  className = "",
}: ModuleProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`section-pad relative scroll-mt-[var(--nav-h)] rule-t ${
        sunken ? "bg-sunken/60" : ""
      } ${className}`}
    >
      <div className="shell">
        <motion.header
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mb-12 md:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono-tech text-[0.6875rem] tracking-[0.14em] text-accent">
              {index}
            </span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="tech-label">{code}</span>
          </div>

          <h2
            id={`${id}-title`}
            className="max-w-3xl text-[clamp(1.75rem,4.2vw,2.75rem)] font-semibold leading-[1.12] text-ink"
          >
            {title}
          </h2>

          {lead && (
            <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2 md:text-base">
              {lead}
            </p>
          )}
        </motion.header>

        {children}
      </div>
    </section>
  );
}
