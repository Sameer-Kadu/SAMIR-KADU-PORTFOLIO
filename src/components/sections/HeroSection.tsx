"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, MapPin, ChevronDown } from "lucide-react";
import { HERO_SECTION } from "../../lib/constants";
import ParticlesContainer from "../../components/shared/ParticlesContainer";

const roles = [
  "Full Stack Engineer",
  "QA Automation Specialist",
  "UI/UX Developer",
  "Cloud (AWS) Engineer",
];

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0A0E1A]"
    >
      {/* Mesh gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Dark mode mesh */}
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-600/6 rounded-full blur-[80px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        {/* Light mode mesh */}
        <div className="block dark:hidden absolute inset-0 bg-[radial-gradient(at_40%_20%,rgba(37,99,235,0.06)_0px,transparent_50%),radial-gradient(at_80%_0%,rgba(99,102,241,0.04)_0px,transparent_50%)]" />
      </div>

      <ParticlesContainer />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex flex-col items-center text-center">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {HERO_SECTION.badge}
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-4"
          >
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
              <span className="text-gray-900 dark:text-white">
                Hi, I&apos;m{" "}
              </span>
              <span className="text-gradient">{HERO_SECTION.name}</span>
            </h1>
          </motion.div>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="h-10 sm:h-12 flex items-center justify-center mb-6"
          >
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-heading font-medium text-gray-500 dark:text-gray-400">
              <span className="text-brand-600 dark:text-brand-400">/</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Intro text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
          >
            {HERO_SECTION.introText}
          </motion.p>

          {/* Current role + location */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8 text-sm text-gray-500 dark:text-gray-500"
          >
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {HERO_SECTION.currentRole}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <MapPin className="w-3 h-3" />
              {HERO_SECTION.location}
            </span>
          </motion.div>

          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {HERO_SECTION.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-sm font-medium bg-brand-50 dark:bg-brand-600/10 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-600/20"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            {HERO_SECTION.ctaButtons.map((btn, i) => (
              i === 0 ? (
                <a
                  key={i}
                  href={btn.link}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("projects");
                  }}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base transition-all duration-200 shadow-glow-sm hover:shadow-glow-md cursor-pointer"
                >
                  {btn.text}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              ) : (
                <a
                  key={i}
                  href={btn.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 font-semibold text-base transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20"
                >
                  <Download className="w-4 h-4" />
                  {btn.text}
                </a>
              )
            ))}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="w-full max-w-2xl"
          >
            <div className="grid grid-cols-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] overflow-hidden">
              {HERO_SECTION.stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center justify-center py-4 px-2 ${
                    i < HERO_SECTION.stats.length - 1
                      ? "border-r border-gray-200 dark:border-white/[0.06]"
                      : ""
                  }`}
                >
                  <span className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500 mt-0.5 text-center">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollTo("about")}
          aria-label="Scroll to about section"
          className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-brand-500 transition-colors duration-200 cursor-pointer"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </motion.div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
    </section>
  );
};

export default HeroSection;
