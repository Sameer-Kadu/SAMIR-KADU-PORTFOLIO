"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SKILLS } from "../../lib/constants";

type SkillCategory = "frontend" | "backend" | "qa" | "devops";

const CATEGORIES: { key: SkillCategory; label: string; count: number }[] = [
  { key: "frontend", label: "Frontend", count: SKILLS.frontend.length },
  { key: "backend", label: "Backend", count: SKILLS.backend.length },
  { key: "qa", label: "QA Automation", count: SKILLS.qaAutomation.length },
  { key: "devops", label: "DevOps", count: SKILLS.devops.length },
];

const categoryMap: Record<SkillCategory, typeof SKILLS.frontend> = {
  frontend: SKILLS.frontend,
  backend: SKILLS.backend,
  qa: SKILLS.qaAutomation,
  devops: SKILLS.devops,
};

const SkillPill = ({
  skill,
  index,
  isInView,
}: {
  skill: { name: string; icon: string };
  index: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.96 }}
    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
    transition={{ duration: 0.4, delay: 0.05 * index, ease: "easeOut" }}
    className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.07] hover:border-brand-200 dark:hover:border-brand-600/30 hover:shadow-md dark:hover:shadow-none hover:bg-gray-50 dark:hover:bg-white/[0.07] transition-all duration-200 cursor-default"
  >
    <div className="relative w-8 h-8 flex-shrink-0">
      <Image
        src={skill.icon}
        alt={skill.name}
        width={32}
        height={32}
        className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-110"
      />
    </div>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200 whitespace-nowrap">
      {skill.name}
    </span>
  </motion.div>
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("frontend");

  const activeSkills = categoryMap[activeCategory];

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding bg-white dark:bg-[#0A0E1A] relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-600/10 border border-brand-200 dark:border-brand-600/20 text-brand-700 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Skills & Stack
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {SKILLS.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg text-base">
                {SKILLS.subtitle}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core stack — always visible, prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-4">
            Core Stack
          </p>
          <div className="flex flex-wrap gap-3">
            {SKILLS.core.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * i + 0.2 }}
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-brand-50 dark:bg-brand-600/[0.08] border border-brand-100 dark:border-brand-600/20 hover:bg-brand-100 dark:hover:bg-brand-600/15 hover:border-brand-200 dark:hover:border-brand-600/30 transition-all duration-200 cursor-default"
              >
                <div className="relative w-9 h-9 flex-shrink-0">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={36}
                    height={36}
                    className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm font-semibold text-brand-700 dark:text-brand-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="section-divider mb-10" />

        {/* Category tabs + skills grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-4">
            All Skills
          </p>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-7">
            {CATEGORIES.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === key
                    ? "bg-brand-600 text-white shadow-glow-sm"
                    : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === key
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {activeSkills.map((skill, i) => (
              <SkillPill key={skill.name} skill={skill} index={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Bottom credibility note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 pt-8 border-t border-gray-100 dark:border-white/[0.06] flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-500"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            All skills used in production projects
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            3+ years of professional experience
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            AWS Certified Solutions Architect
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
