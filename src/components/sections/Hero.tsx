"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { PROFILE } from "@/content/profile";
import { PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { scrollToModule } from "@/lib/scroll";
import { EASE, staggerVariants, childVariants } from "@/lib/motion";
import DomainNetwork from "./hero/DomainNetwork";
import DomainStack from "./hero/DomainStack";

const ROTATE_MS = 3200;

export default function Hero() {
  const isWide = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  const [role, setRole] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setRole((r) => (r + 1) % PROFILE.disciplines.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      id="index"
      aria-label="Introduction"
      className="relative scroll-mt-[var(--nav-h)] pb-20 pt-[calc(var(--nav-h)+3.5rem)] md:pb-28 md:pt-[calc(var(--nav-h)+5rem)]"
    >
      <div className="shell">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 xl:gap-24">
          {/* ── Identity ── */}
          <motion.div
            variants={staggerVariants(0.07)}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={childVariants} className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[0.75rem] text-ink-2">
                <span className="status-dot" />
                {PROFILE.availability}
              </span>
              <span className="tech-label hidden xs:inline">
                {PROFILE.coreStack.slice(0, 3).join(" · ")}
              </span>
            </motion.div>

            <motion.h1
              variants={childVariants}
              className="text-[clamp(2.5rem,8vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink"
            >
              {PROFILE.name}
            </motion.h1>

            {/* Rotating discipline — fixed height, so no layout shift */}
            <motion.div
              variants={childVariants}
              className="mt-3 flex h-8 items-center gap-2.5 md:h-9"
            >
              <span className="h-px w-6 shrink-0 bg-accent" aria-hidden="true" />
              <span className="sr-only">{PROFILE.disciplines.join(", ")}</span>
              <span aria-hidden="true" className="relative block h-full flex-1 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={role}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="absolute inset-0 flex items-center text-[1.0625rem] font-medium text-ink-2 md:text-[1.1875rem]"
                  >
                    {PROFILE.disciplines[role]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p
              variants={childVariants}
              className="mt-7 max-w-xl text-[0.9375rem] leading-[1.75] text-ink-2 md:text-base"
            >
              {PROFILE.intro}
            </motion.p>

            {/* Current context */}
            <motion.dl
              variants={childVariants}
              className="mt-8 grid gap-x-8 gap-y-4 border-t border-line pt-6 xs:grid-cols-2"
            >
              <div>
                <dt className="tech-label">currently</dt>
                <dd className="mt-1.5 text-[0.875rem] text-ink">
                  {PROFILE.currentRole.title}
                  <span className="block text-ink-2">{PROFILE.currentRole.company}</span>
                </dd>
              </div>
              <div>
                <dt className="tech-label">based in</dt>
                <dd className="mt-1.5 flex items-center gap-1.5 text-[0.875rem] text-ink">
                  <MapPin className="h-3.5 w-3.5 text-ink-3" aria-hidden="true" />
                  {PROFILE.location}
                </dd>
              </div>
            </motion.dl>

            {/* Actions */}
            <motion.div variants={childVariants} className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToModule("work")}
                className="btn btn-primary group"
                data-cursor="view"
              >
                Explore the work
                <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" />
              </button>
              <a
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                data-cursor="external"
              >
                Résumé
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            {/* What's been built — answers "what has he made?" immediately */}
            <motion.div variants={childVariants} className="mt-9 border-t border-line pt-6">
              <p className="tech-label mb-3">case studies</p>
              <ul className="flex flex-col gap-2">
                {PROJECTS.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => scrollToModule("work")}
                      data-cursor="view"
                      className="tap group flex w-full items-center gap-3 text-left"
                    >
                      <span className="font-mono-tech text-[0.6875rem] text-ink-3">{p.index}</span>
                      <span className="link-underline text-[0.875rem] font-medium text-ink">
                        {p.title}
                      </span>
                      <span className="hidden truncate text-[0.8125rem] text-ink-3 sm:block">
                        {p.context}
                      </span>
                      <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-ink-3 transition-transform duration-fast group-hover:translate-x-0.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ── Engineering network ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="w-full"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="tech-label">engineering domains</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            {isWide ? <DomainNetwork /> : <DomainStack />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
