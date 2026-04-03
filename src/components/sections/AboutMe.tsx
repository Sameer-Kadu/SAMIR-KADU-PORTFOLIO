"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ABOUT_ME } from "../../lib/constants";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] as const, delay },
  },
});

const AboutMe = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="about"
      className="py-24 bg-gradient-to-br from-gray-50/80 via-white/80 to-blue-50/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-slate-900/80 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-5">
            <span>👋</span>
            <span>Get to know me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {ABOUT_ME.title}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">

          {/* Story — spans 3 cols */}
          <motion.div
            className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl p-7 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-xs font-bold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-4">My Story</p>
            {ABOUT_ME.story.split("\n\n").map((para, i) => (
              <p key={i} className={`text-gray-700 dark:text-gray-300 leading-relaxed text-base ${i > 0 ? "mt-4" : ""}`}>
                {para}
              </p>
            ))}

            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Beyond engineering: </span>
                {ABOUT_ME.interests}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm"
              >
                Let&apos;s Connect
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/Samir_Kadu_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-105 shadow text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right column — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Stats 2×2 */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {ABOUT_ME.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-tight">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Right Now status */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800/50"
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <p className="text-xs font-bold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-4">Right Now</p>
              <div className="space-y-3">
                {ABOUT_ME.currentFocus.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 w-20 flex-shrink-0 pt-0.5">{item.label}</span>
                    <span className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              className="relative flex-1"
              variants={fadeUp(0.4)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl rotate-1 opacity-10" />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-5 shadow border border-gray-100 dark:border-gray-700 text-center h-full flex flex-col items-center justify-center">
                <div className="text-2xl mb-2">💡</div>
                <p className="text-gray-800 dark:text-gray-200 font-semibold italic leading-snug text-sm">
                  &ldquo;{ABOUT_ME.quote.text}&rdquo;
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">— {ABOUT_ME.quote.author}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* What defines my work — full width */}
        <motion.div
          className="max-w-6xl mx-auto mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700"
          variants={fadeUp(0.45)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4 text-center">
            What defines my work
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ABOUT_ME.highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
