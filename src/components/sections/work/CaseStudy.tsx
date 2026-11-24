"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "@/content/types";
import { PROJECT_CATEGORIES } from "@/content/projects";
import { EASE } from "@/lib/motion";
import ArchitectureDiagram from "./ArchitectureDiagram";

/**
 * Immersive case-study view.
 *
 * Opens over the work list as a modal dialog: focus is trapped, Escape closes,
 * background scroll is locked, and focus returns to the trigger on close.
 */
export default function CaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  // Section numbering is derived from array order — architecture and links are
  // appended only when the project actually carries that data.
  const sections = project.caseStudy;
  const architectureIndex = project.architecture ? sections.length : -1;
  const linksIndex = architectureIndex >= 0 ? architectureIndex + 1 : sections.length;

  const outline = [
    ...sections.map((s, i) => ({ label: s.title, index: i })),
    ...(project.architecture ? [{ label: "Architecture", index: architectureIndex }] : []),
    { label: "Source", index: linksIndex },
  ];

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";

    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      style.overflow = previousOverflow;
      previous?.focus?.();
    };
  }, [onClose]);

  // Track which numbered section is in view to light the outline.
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-section-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(Number(visible.target.getAttribute("data-section-index")));
        }
      },
      { root, rootMargin: "-10% 0px -60% 0px", threshold: [0, 0.4, 1] }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const jump = (index: number) => {
    scrollerRef.current
      ?.querySelector(`[data-section-index="${index}"]`)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <motion.button
        type="button"
        aria-label="Close case study"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.24 }}
        className="absolute inset-0 h-full w-full cursor-default bg-bg/85 backdrop-blur-[3px]"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        tabIndex={-1}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.38, ease: EASE }}
        className="absolute inset-x-0 bottom-0 top-4 mx-auto flex max-w-6xl flex-col overflow-hidden rounded-t-2xl border border-line-strong bg-bg shadow-float outline-none sm:inset-x-4 md:top-8"
      >
        {/* Header */}
        <header className="flex shrink-0 items-start gap-4 border-b border-line px-5 py-4 md:px-8">
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
              <span className="font-mono-tech text-[0.6875rem] text-accent">{project.index}</span>
              <span className="tech-label">{PROJECT_CATEGORIES[project.category]}</span>
              <span className="tech-label">· {project.year}</span>
            </div>
            <h2
              id="case-study-title"
              className="truncate text-[1.375rem] font-semibold text-ink md:text-[1.75rem]"
            >
              {project.title}
            </h2>
            <p className="mt-1 truncate text-[0.8125rem] text-ink-2">{project.tagline}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-ink-2 transition-colors duration-fast hover:border-line-strong hover:text-ink"
            aria-label="Close case study"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Outline rail — desktop */}
          <nav
            aria-label="Case study sections"
            className="hidden w-52 shrink-0 border-r border-line px-5 py-6 lg:block"
          >
            <p className="tech-label mb-4">contents</p>
            <ul className="space-y-0.5">
              {outline.map((item) => {
                const isActive = activeSection === item.index;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => jump(item.index)}
                      className={`flex w-full items-baseline gap-2.5 rounded-md px-2 py-1.5 text-left text-[0.8125rem] transition-colors duration-fast ${
                        isActive ? "bg-accent/10 text-ink" : "text-ink-3 hover:text-ink-2"
                      }`}
                    >
                      <span className="font-mono-tech text-[0.625rem]">
                        {String(item.index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Body */}
          <div ref={scrollerRef} className="scroll-slim min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl px-5 py-7 md:px-8 md:py-10">
              {/* Screenshot */}
              {/* contain, not cover: these are UI screenshots — the whole frame
                  is the information, so nothing gets cropped away. */}
              {project.image && (
                <div className="relative mb-9 aspect-[1.93/1] overflow-hidden rounded-xl border border-line bg-sunken">
                  <Image
                    src={project.image}
                    alt={`${project.title} interface`}
                    fill
                    sizes="(max-width: 768px) 92vw, 720px"
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              <p className="mb-10 text-[0.9375rem] leading-[1.75] text-ink-2">
                {project.description}
              </p>

              {/* Narrative sections */}
              {sections.map((section, i) => (
                <section
                  key={section.title}
                  data-section-index={i}
                  className="scroll-mt-4 border-t border-line py-8 first:border-t-0"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono-tech text-[0.6875rem] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink">
                      {section.title}
                    </h3>
                  </div>

                  {section.body && (
                    <p className="text-[0.9375rem] leading-[1.75] text-ink-2">{section.body}</p>
                  )}

                  {section.points && (
                    <ul className={`space-y-2.5 ${section.body ? "mt-4" : ""}`}>
                      {section.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink-2">
                          <span
                            className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* Architecture */}
              {project.architecture && (
                <section
                  data-section-index={architectureIndex}
                  className="scroll-mt-4 border-t border-line py-8"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="font-mono-tech text-[0.6875rem] text-accent">
                      {String(architectureIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink">
                      Architecture
                    </h3>
                  </div>
                  <ArchitectureDiagram layers={project.architecture} />
                </section>
              )}

              {/* Stack + links */}
              <section
                data-section-index={linksIndex}
                className="scroll-mt-4 border-t border-line py-8"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="font-mono-tech text-[0.6875rem] text-accent">
                    {String(linksIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink">
                    Stack &amp; source
                  </h3>
                </div>

                <ul className="mb-6 flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-line px-2.5 py-1 font-mono-tech text-[0.75rem] text-ink-2"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                      data-cursor="external"
                    >
                      <Github className="h-4 w-4" />
                      Source code
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      data-cursor="external"
                    >
                      Live demo
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
