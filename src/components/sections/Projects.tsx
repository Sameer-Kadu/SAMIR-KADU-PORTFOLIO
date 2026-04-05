"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, CheckCircle2, Zap } from "lucide-react";
import { PROJECTS } from "../../lib/constants";

const categoryLabels: Record<string, string> = {
  work: "Professional",
  hackathon: "Hackathon",
  personal: "Personal",
};

const categoryColors: Record<string, string> = {
  work: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
  hackathon:
    "bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20",
  personal:
    "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
};

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "work", label: "Professional" },
  { key: "hackathon", label: "Hackathons" },
  { key: "personal", label: "Personal" },
];

const ProjectCard = ({
  project,
  index,
  isInView,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, delay: 0.1 * index, ease: "easeOut" }}
    className="group relative flex flex-col rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] shadow-card-light dark:shadow-card-dark hover:border-brand-200 dark:hover:border-brand-600/30 transition-all duration-300 overflow-hidden"
  >
    {/* Featured badge */}
    {project.featured && (
      <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-semibold shadow-glow-sm">
        <Zap className="w-3 h-3" />
        Featured
      </div>
    )}

    {/* Project image */}
    <div className="relative overflow-hidden bg-gray-100 dark:bg-white/5 h-52">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Hover action buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-brand-600 hover:bg-brand-700 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label={`View ${project.title} live demo`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-6">
      {/* Category + title */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200 leading-tight">
          {project.title}
        </h3>
        <span
          className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${
            categoryColors[project.category] ?? categoryColors.personal
          }`}
        >
          {categoryLabels[project.category] ?? project.category}
        </span>
      </div>

      {/* Tagline */}
      <p className="text-xs font-medium text-brand-600 dark:text-brand-400 mb-3">
        {project.tagline}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      {/* Impact points */}
      {project.impact && project.impact.length > 0 && (
        <div className="mb-5 space-y-1.5">
          {project.impact.map((point, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-gray-600 dark:text-gray-400 leading-snug">
                {point}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action links */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/[0.06]">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            View Code
          </a>
        )}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors duration-200 ml-auto"
          >
            Live Demo
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={ref}
      className="section-padding bg-gray-50/80 dark:bg-[#0D1120] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-600/10 border border-brand-200 dark:border-brand-600/20 text-brand-700 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Projects
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Things I&apos;ve{" "}
                <span className="text-gradient">built.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg text-base">
                Real-world products, side projects, and hackathon wins — each with a story.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                filter === key
                  ? "bg-brand-600 text-white shadow-glow-sm"
                  : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-base">
              No projects in this category yet.
            </p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
            More projects on my GitHub
          </p>
          <a
            href="https://github.com/Sameer-Kadu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            github.com/Sameer-Kadu
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
