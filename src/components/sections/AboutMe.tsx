"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ABOUT_ME } from "../../lib/constants";
import {
  Rocket,
  Layers,
  TestTube2,
  BookOpen,
  ArrowRight,
  Download,
  Award,
  Briefcase,
  FlaskConical,
  Cloud,
} from "lucide-react";

const coreValueIcons = [Rocket, Layers, TestTube2, BookOpen];

const statIconMap = [Briefcase, FlaskConical, Layers, Cloud];

const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Subtle bg accent */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 dark:bg-blue-950/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Section label */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase mb-4">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {ABOUT_ME.headline}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── LEFT: Bio + Core Values ── */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Bio */}
            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-7 border border-gray-100 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {ABOUT_ME.bio}
              </p>
            </div>

            {/* Core values */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                How I work
              </h3>
              <div className="space-y-3">
                {ABOUT_ME.coreValues.map((item, i) => {
                  const Icon = coreValueIcons[i] ?? Rocket;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200"
                    >
                      <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="/Samir_Kadu_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: Bento stats + cert card ── */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {/* Stats bento grid */}
            <div className="grid grid-cols-2 gap-4">
              {ABOUT_ME.stats.map((stat, i) => {
                const Icon = statIconMap[i] ?? Award;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-5 text-center border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Certification highlight */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/10 rounded-2xl p-6 border border-amber-200 dark:border-amber-700/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-800/40 text-amber-600 dark:text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
                    Certification
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    AWS Certified Solutions Architect – Associate
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Amazon Web Services · May 2023
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tech stack chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
            >
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                Core Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "React", "Next.js", "TypeScript", "Node.js",
                  "Spring Boot", "Selenium", "Cypress", "AWS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
