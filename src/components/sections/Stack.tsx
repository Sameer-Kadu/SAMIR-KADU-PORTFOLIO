"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DOMAINS, STACK_FLOW } from "@/content/domains";
import { childVariants, inViewOnce, staggerVariants } from "@/lib/motion";
import Module from "@/components/system/Module";

/**
 * Skills, organised as a system rather than a tag cloud: first the path a
 * request takes through the stack, then the depth behind each domain.
 * No proficiency percentages — they measure nothing.
 */
export default function Stack() {
  return (
    <Module
      id="stack"
      index="02"
      code="stack"
      title="The stack, in the order a request meets it."
      lead="Grouped by the job each technology does. Everything listed here has been used to build or verify something real."
    >
      {/* ── Request path ── */}
      <motion.div
        variants={staggerVariants(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mb-14"
      >
        <p className="tech-label mb-5">request path</p>

        <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {STACK_FLOW.map((stage, i) => (
            <motion.li
              key={stage.stage}
              variants={childVariants}
              className="relative flex flex-col bg-panel p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono-tech text-[0.625rem] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.8125rem] font-medium text-ink">{stage.stage}</span>
              </div>
              <ul className="space-y-1">
                {stage.tech.map((t) => (
                  <li key={t} className="font-mono-tech text-[0.6875rem] text-ink-2">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      {/* ── Domain depth ── */}
      <motion.div
        variants={staggerVariants(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
      >
        <p className="tech-label mb-5">by domain</p>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {DOMAINS.map((domain) => (
            <motion.section
              key={domain.id}
              variants={childVariants}
              aria-labelledby={`domain-${domain.id}`}
              className="flex flex-col rounded-xl border border-line bg-panel p-5 transition-colors duration-med hover:border-line-strong"
            >
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line-strong font-mono-tech text-[0.625rem] font-semibold text-ink-2">
                  {domain.code}
                </span>
                <h3 id={`domain-${domain.id}`} className="text-[0.9375rem] font-semibold text-ink">
                  {domain.label}
                </h3>
                <span className="tech-label ml-auto">{domain.tech.length}</span>
              </div>

              <p className="mb-4 text-[0.8125rem] leading-relaxed text-ink-3">{domain.summary}</p>

              <ul className="mt-auto flex flex-wrap gap-1.5">
                {domain.tech.map((tech) => (
                  <li
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 text-[0.75rem] text-ink-2 transition-colors duration-fast hover:border-line-strong hover:text-ink"
                  >
                    {tech.icon && (
                      <Image
                        src={tech.icon}
                        alt=""
                        width={14}
                        height={14}
                        className={`h-3.5 w-3.5 object-contain ${
                          tech.tone === "mono"
                            ? "dark:invert"
                            : tech.tone === "dark"
                              ? "dark:rounded-[3px] dark:bg-white dark:p-px"
                              : ""
                        }`}
                      />
                    )}
                    {tech.name}
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </motion.div>
    </Module>
  );
}
