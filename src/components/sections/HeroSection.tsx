"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_SECTION } from "../../lib/constants";
import ParticlesContainer from "../../components/shared/ParticlesContainer";
import MagneticButton from "../ui/MagneticButton";
import { Mail, Download, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

// Inline SVGs for brand icons (lucide brand icons are deprecated)
const GitHubSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socialIconMap: Record<string, React.FC<{ className?: string }>> = {
  GitHub: GitHubSVG,
  LinkedIn: LinkedInSVG,
  Email: ({ className }) => <Mail className={className} />,
};

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % HERO_SECTION.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900" />
      <ParticlesContainer />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(99 102 241)'%3e%3cpath d='m0 .5h32m-16 0v32'/%3e%3c/svg%3e")`,
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── LEFT: Text content ── */}
        <div className="flex-1 text-center lg:text-left">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {HERO_SECTION.badge}
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
              {HERO_SECTION.headline}
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {HERO_SECTION.headlineAccent}
            </h1>
          </motion.div>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="h-10 flex items-center justify-center lg:justify-start mb-6"
          >
            <span className="text-gray-500 dark:text-gray-400 text-lg mr-2 font-medium">
              {HERO_SECTION.name} —
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-lg font-semibold text-blue-600 dark:text-blue-400"
              >
                {HERO_SECTION.roles[currentRoleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8"
          >
            {HERO_SECTION.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10"
          >
            <MagneticButton
              href={HERO_SECTION.ctaButtons[0].link}
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              href={HERO_SECTION.ctaButtons[1].link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center lg:justify-start gap-3"
          >
            {HERO_SECTION.socialLinks.map((link) => {
              const Icon = socialIconMap[link.name as keyof typeof socialIconMap];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : "_self"}
                  rel={link.name !== "Email" ? "noopener noreferrer" : ""}
                  aria-label={link.name}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  {Icon && <Icon className="w-5 h-5" />}
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* ── RIGHT: Stats card panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex-shrink-0 w-full lg:w-auto"
        >
          <div className="relative">
            {/* Avatar card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700 w-full lg:w-80">
              {/* Avatar */}
              <div className="flex justify-center mb-5">
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 blur-md opacity-40" />
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
                    <Image
                      src={HERO_SECTION.avatar}
                      alt={`${HERO_SECTION.name} — Full Stack Engineer`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="text-center mb-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {HERO_SECTION.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  @ Bajaj Finserv Health
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {HERO_SECTION.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={mounted ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700/60 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-600"
                  >
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Certification badge */}
              <div className="mt-4 flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  AWS Certified Solutions Architect
                </span>
              </div>
            </div>

            {/* Floating accent dot */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full shadow-lg" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-md" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <button
          onClick={() => scrollTo("about")}
          aria-label="Scroll to about section"
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors duration-200 cursor-pointer"
        >
          <span className="text-xs font-medium tracking-wide">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
    </section>
  );
};

export default HeroSection;
