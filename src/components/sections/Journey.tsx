"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { JOURNEY } from "@/content/journey";
import type { TimelineEntry } from "@/content/types";
import { childVariants, inViewOnce, staggerVariants } from "@/lib/motion";
import Module from "@/components/system/Module";

const ICONS: Record<TimelineEntry["type"], React.ComponentType<{ className?: string }>> = {
  experience: Briefcase,
  education: GraduationCap,
  certification: Award,
};

const TYPE_LABEL: Record<TimelineEntry["type"], string> = {
  experience: "role",
  education: "education",
  certification: "certification",
};

export default function Journey() {
  return (
    <Module
      id="journey"
      index="04"
      code="journey"
      title="How the engineering got built."
      lead="Formal grounding, then production ownership, then the cloud architecture that supports it — in the order it happened."
      sunken
    >
      <motion.ol
        variants={staggerVariants(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="relative"
      >
        {JOURNEY.map((entry, i) => {
          const Icon = ICONS[entry.type];
          const isLast = i === JOURNEY.length - 1;

          return (
            <motion.li key={entry.title} variants={childVariants} className="relative">
              {/* Spine */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[1.1875rem] top-11 w-px bg-line"
                />
              )}

              <div className={isLast ? "" : "pb-6"}>
                <div className="flex gap-4 md:gap-5">
                  <span
                    aria-hidden="true"
                    className="relative z-10 grid h-[2.375rem] w-[2.375rem] shrink-0 place-items-center rounded-full border border-line-strong bg-bg text-ink-2"
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <article className="min-w-0 flex-1 rounded-xl border border-line bg-panel p-5 transition-colors duration-med hover:border-line-strong md:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="tech-label">{TYPE_LABEL[entry.type]}</span>
                      {entry.badge && (
                        <span className="rounded border border-line px-1.5 py-0.5 font-mono-tech text-[0.625rem] text-ink-2">
                          {entry.badge}
                        </span>
                      )}
                      <span className="font-mono-tech ml-auto text-[0.6875rem] text-ink-3">
                        {entry.duration}
                      </span>
                    </div>

                    <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink md:text-[1.125rem]">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-[0.875rem] text-accent">{entry.org}</p>

                    <p className="mt-3.5 text-[0.875rem] leading-[1.7] text-ink-2">
                      {entry.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {entry.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-3 text-[0.8125rem] leading-relaxed text-ink-2"
                        >
                          <span
                            className="mt-[0.4375rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {entry.tech && entry.tech.length > 0 && (
                      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                        <span className="tech-label">stack</span>
                        {entry.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-line px-2 py-0.5 font-mono-tech text-[0.6875rem] text-ink-2"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </div>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </Module>
  );
}
