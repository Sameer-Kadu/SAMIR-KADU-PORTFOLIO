"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/content/projects";
import { SOCIAL } from "@/content/site";
import type { Project } from "@/content/types";
import { childVariants, inViewOnce, staggerVariants } from "@/lib/motion";
import Module from "@/components/system/Module";

/** The case study is a large view — only loaded once a project is opened. */
const CaseStudy = dynamic(() => import("./work/CaseStudy"), { ssr: false });

function ProjectRow({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.li variants={childVariants} className="group relative">
      <article className="relative overflow-hidden rounded-xl border border-line bg-panel transition-colors duration-med hover:border-line-strong">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          {/* Detail */}
          <div className="order-2 flex flex-col p-6 md:order-1 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span className="font-mono-tech text-[0.6875rem] text-accent">{project.index}</span>
              <span className="h-px w-5 bg-line-strong" />
              <span className="tech-label">{PROJECT_CATEGORIES[project.category]}</span>
              <span className="tech-label">· {project.year}</span>
              {project.status === "live" && (
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] text-ink-3">
                  <span className="status-dot" />
                  deployed
                </span>
              )}
            </div>

            <h3 className="text-[1.375rem] font-semibold leading-tight text-ink md:text-[1.5rem]">
              {project.title}
            </h3>
            <p className="mt-1.5 text-[0.875rem] text-accent">{project.tagline}</p>

            <p className="mt-4 max-w-xl text-[0.875rem] leading-[1.7] text-ink-2">
              {project.description}
            </p>

            <p className="tech-label mt-5">{project.context}</p>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <li
                  key={t}
                  className="rounded border border-line px-2 py-0.5 font-mono-tech text-[0.6875rem] text-ink-2"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <button
                type="button"
                onClick={onOpen}
                data-cursor="view"
                className="btn btn-primary h-10 px-4 text-[0.8125rem]"
              >
                Read case study
              </button>

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="tap inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-2 transition-colors duration-fast hover:text-ink"
                  aria-label={`${project.title} source code on GitHub`}
                >
                  <Github className="h-4 w-4" />
                  Source
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="tap inline-flex items-center gap-1 text-[0.8125rem] text-ink-2 transition-colors duration-fast hover:text-ink"
                  aria-label={`${project.title} live demo`}
                >
                  Demo
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Preview */}
          <button
            type="button"
            onClick={onOpen}
            data-cursor="view"
            aria-label={`Open the ${project.title} case study`}
            className="relative order-1 aspect-[1.92/1] overflow-hidden border-b border-line bg-sunken md:order-2 md:aspect-auto md:border-b-0 md:border-l"
          >
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-top transition-transform duration-slow group-hover:scale-[1.03]"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent opacity-0 transition-opacity duration-med group-hover:opacity-100"
              aria-hidden="true"
            />
          </button>
        </div>
      </article>
    </motion.li>
  );
}

export default function Work() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Module
      id="work"
      index="03"
      code="work"
      title="Systems I've designed and shipped."
      lead="Two case studies, each documented the way I'd document it for a team: the problem, the approach, the architecture, and the decisions behind it."
    >
      <motion.ul
        variants={staggerVariants(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="space-y-5"
      >
        {PROJECTS.map((project) => (
          <ProjectRow key={project.id} project={project} onOpen={() => setOpen(project)} />
        ))}
      </motion.ul>

      <motion.div
        variants={childVariants}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6"
      >
        <span className="tech-label">more repositories</span>
        <a
          href={SOCIAL.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="external"
          className="tap link-underline inline-flex items-center gap-1.5 text-[0.875rem] text-ink"
        >
          <Github className="h-4 w-4" />
          github.com/{SOCIAL.githubHandle}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </motion.div>

      <AnimatePresence>
        {open && <CaseStudy project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </Module>
  );
}
