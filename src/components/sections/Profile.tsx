"use client";

import { motion } from "framer-motion";
import { Award, Briefcase } from "lucide-react";
import { HIGHLIGHT_AWARD, METRICS, PRINCIPLES, PROFILE, STORY } from "@/content/profile";
import { childVariants, inViewOnce, staggerVariants } from "@/lib/motion";
import Module from "@/components/system/Module";

export default function Profile() {
  return (
    <Module
      id="profile"
      index="01"
      code="profile"
      title="Building software that has to keep working."
      lead={PROFILE.bio}
      sunken
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
        {/* ── Narrative ── */}
        <motion.ol
          variants={staggerVariants(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="relative"
        >
          {STORY.map((chapter, i) => (
            <motion.li key={chapter.key} variants={childVariants} className="relative pb-9 last:pb-0">
              {/* Spine */}
              {i < STORY.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[0.6875rem] top-7 w-px bg-line"
                />
              )}

              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-1 grid h-[1.375rem] w-[1.375rem] shrink-0 place-items-center rounded-full border border-line-strong bg-bg font-mono-tech text-[0.5625rem] text-ink-3"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="tech-label mb-2">{chapter.label}</p>
                  <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink md:text-[1.125rem]">
                    {chapter.heading}
                  </h3>
                  <p className="mt-2.5 max-w-xl text-[0.9375rem] leading-[1.75] text-ink-2">
                    {chapter.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* ── Side panel ── */}
        <motion.aside
          variants={staggerVariants(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start"
        >
          {/* Metrics */}
          <motion.dl
            variants={childVariants}
            className="grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-panel"
          >
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className={`p-4 ${i % 2 === 0 ? "border-r border-line" : ""} ${
                  i < 2 ? "border-b border-line" : ""
                }`}
              >
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-mono-tech text-[1.5rem] font-semibold leading-none text-ink">
                    {m.value}
                  </span>
                  <span className="mt-2 block text-[0.75rem] font-medium text-ink-2">
                    {m.label}
                  </span>
                  <span className="mt-0.5 block text-[0.6875rem] text-ink-3">{m.note}</span>
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Current position */}
          <motion.div variants={childVariants} className="rounded-xl border border-line bg-panel p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-ink-3">
                <Briefcase className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="tech-label">currently</p>
                <p className="mt-1.5 text-[0.875rem] font-medium text-ink">
                  {PROFILE.currentRole.title}
                </p>
                <p className="text-[0.875rem] text-ink-2">{PROFILE.currentRole.company}</p>
                <p className="mt-2 flex items-center gap-2 text-[0.75rem] text-ink-3">
                  <span className="status-dot" />
                  Since {PROFILE.currentRole.since} · {PROFILE.currentRole.type}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Award */}
          <motion.div variants={childVariants} className="rounded-xl border border-line bg-panel p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-warn">
                <Award className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="tech-label">{HIGHLIGHT_AWARD.label}</p>
                <p className="mt-1.5 text-[0.875rem] font-medium leading-snug text-ink">
                  {HIGHLIGHT_AWARD.title}
                </p>
                <p className="text-[0.75rem] text-ink-3">{HIGHLIGHT_AWARD.detail}</p>
              </div>
            </div>
          </motion.div>

          {/* Principles */}
          <motion.div variants={childVariants} className="rounded-xl border border-line bg-panel p-5">
            <p className="tech-label mb-3.5">what I bring</p>
            <ul className="space-y-2.5">
              {PRINCIPLES.map((p) => (
                <li key={p} className="flex gap-2.5 text-[0.8125rem] leading-snug text-ink-2">
                  <span
                    className="mt-[0.4375rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.aside>
      </div>
    </Module>
  );
}
