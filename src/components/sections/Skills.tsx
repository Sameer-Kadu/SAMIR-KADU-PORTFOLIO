'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { SKILLS } from '../../lib/constants';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.0, 0.0, 0.2, 1] as const, delay },
  },
});

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 bg-gradient-to-br from-white/80 via-gray-50/80 to-blue-50/80 dark:from-gray-900/80 dark:via-slate-900/80 dark:to-black/80 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <span>🛠️</span>
            <span>My Toolbox</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {SKILLS.title}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {SKILLS.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* ── Tier 1: Core Stack ── */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500">Core Stack</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-800" />
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Ship with daily</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {SKILLS.core.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="group flex flex-col items-center justify-center gap-3 p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                variants={fadeUp(0.15 + i * 0.05)}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" aria-hidden="true" />
                  <Image src={skill.icon} alt={skill.name} width={48} height={48} className="relative w-full h-full object-contain" />
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-semibold text-center leading-tight">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Tier 2: Proficient ── */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500">Proficient</span>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent dark:from-purple-800" />
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Production-proven</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {SKILLS.proficient.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="group flex flex-col items-center justify-center gap-2 p-3 sm:p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-gray-200/80 dark:border-gray-700/80 hover:shadow-lg hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
                variants={fadeUp(0.25 + i * 0.04)}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image src={skill.icon} alt={skill.name} width={32} height={32} className="w-full h-full object-contain" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-[10px] sm:text-xs font-medium text-center leading-tight">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Tier 3: Testing & DevOps Tools ── */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500">Testing &amp; DevOps Tools</span>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent dark:from-emerald-800" />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {SKILLS.tools.map((tool, i) => (
              <motion.span
                key={tool}
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 cursor-default"
                variants={fadeUp(0.35 + i * 0.03)}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="text-center text-sm text-gray-400 dark:text-gray-500 mt-12 max-w-lg mx-auto"
          variants={fadeUp(0.6)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          Core stack shipped to production for 3+ years at scale — not tutorial projects.
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;
