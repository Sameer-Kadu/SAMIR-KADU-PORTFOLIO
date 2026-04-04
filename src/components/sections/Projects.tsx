'use client';

import Image from "next/image";
import { PROJECTS } from "../../lib/constants";
import { useState } from "react";
import { ExternalLink, ArrowUpRight, Lightbulb, Zap, TrendingUp } from "lucide-react";

const GitHubSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const categoryLabels: Record<string, string> = {
  work: "Professional",
  personal: "Personal",
  hackathon: "Hackathon",
};

const categoryColors: Record<string, string> = {
  work: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  personal: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  hackathon: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
};

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filteredProjects = PROJECTS.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section
      id="projects"
      className="relative py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(99 102 241)'%3e%3cpath d='m0 .5h32m-16 0v32'/%3e%3c/svg%3e")`,
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase mb-4">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Projects & Case Studies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real problems solved. Real code shipped. Each project tells a story — the challenge, the approach, and the result.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mt-6" />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { key: "all", label: "All Projects" },
            { key: "work", label: "Professional" },
            { key: "hackathon", label: "Hackathons" },
            { key: "personal", label: "Personal" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                filter === key
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Project image */}
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={340}
                  className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge */}
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                    categoryColors[project.category] ?? categoryColors.work
                  }`}
                >
                  {categoryLabels[project.category] ?? project.category}
                </span>

                {/* Quick action links on hover */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View source code"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 hover:bg-white hover:text-gray-900 shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <GitHubSVG className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View live demo"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Challenge → Outcome (expandable) */}
                {expanded === project.id && (
                  <div className="space-y-3 mb-5 animate-in fade-in duration-300">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-800">
                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">The Challenge</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{project.challenge}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-800">
                      <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">The Outcome</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{project.outcome}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                  <button
                    onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {expanded === project.id ? "Hide Case Study" : "View Case Study"}
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                      >
                        <GitHubSVG className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <ExternalLink className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No projects in this category</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Try a different filter above.</p>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center mt-14">
          <a
            href="https://github.com/Sameer-Kadu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <GitHubSVG className="w-4 h-4" />
            View all projects on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
