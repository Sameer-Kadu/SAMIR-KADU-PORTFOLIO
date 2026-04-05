"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Code2,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  Download,
  Award,
} from "lucide-react";
import { ABOUT_ME } from "../../lib/constants";

const StatCard = ({
  stat,
  index,
  isInView,
}: {
  stat: (typeof ABOUT_ME.stats)[0];
  index: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
    className="flex flex-col p-4 sm:p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] shadow-card-light dark:shadow-none hover:border-brand-200 dark:hover:border-brand-600/30 transition-colors duration-200"
  >
    <span className="font-heading text-2xl sm:text-3xl font-bold text-gradient mb-0.5">
      {stat.value}
    </span>
    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
      {stat.label}
    </span>
    <span className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
      {stat.description}
    </span>
  </motion.div>
);

const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const iconMap = [Code2, Zap, Users, CheckCircle2];

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-gray-50/80 dark:bg-[#0D1120] relative overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

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
            About Me
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Building software that{" "}
            <span className="text-gradient">scales & matters.</span>
          </h2>
        </motion.div>

        {/* Main bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Bio card — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 rounded-3xl p-7 sm:p-8 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] shadow-card-light dark:shadow-card-dark"
          >
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-[1.8] mb-6">
              {ABOUT_ME.bio}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {ABOUT_ME.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {h}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-all duration-200 shadow-glow-sm hover:shadow-glow-md cursor-pointer"
              >
                Let&apos;s Connect
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/Samir_Kadu_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200"
              >
                <Download className="w-3.5 h-3.5" />
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right column: Current role + Availability */}
          <div className="flex flex-col gap-5">

            {/* Current role card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl p-6 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] shadow-card-light dark:shadow-card-dark"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-600/15 border border-brand-100 dark:border-brand-600/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-0.5">
                    Currently
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {ABOUT_ME.currentRole.title}
                  </p>
                  <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">
                    {ABOUT_ME.currentRole.company}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Since {ABOUT_ME.currentRole.since} · {ABOUT_ME.currentRole.type}
              </div>
            </motion.div>

            {/* Location card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl p-6 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] shadow-card-light dark:shadow-card-dark"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-0.5">
                    Based in
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Nagpur, India
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {ABOUT_ME.availability.label}
                </span>
                <span className="text-gray-500 dark:text-gray-500">· {ABOUT_ME.availability.type}</span>
              </div>
            </motion.div>

            {/* AWS cert card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="rounded-3xl p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/5 border border-amber-200/50 dark:border-amber-500/20 shadow-card-light dark:shadow-card-dark"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400/70 mb-0.5">
                    Certified
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    AWS Solutions Architect
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Associate · SAA-C03</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats row — 4 cols */}
          {ABOUT_ME.stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isInView={isInView} />
          ))}

          {/* What I bring card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="lg:col-span-2 rounded-3xl p-7 bg-gradient-to-br from-brand-600/[0.06] to-accent-500/[0.04] dark:from-brand-600/10 dark:to-accent-500/5 border border-brand-200/50 dark:border-brand-600/20"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400 mb-3">
              What I bring to every team
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ABOUT_ME.highlights.map((item, i) => {
                const Icon = iconMap[i % iconMap.length];
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="rounded-3xl p-7 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] shadow-card-light dark:shadow-card-dark flex flex-col justify-between"
          >
            <div className="text-3xl text-brand-400 font-serif mb-3 leading-none">&ldquo;</div>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed italic flex-1">
              {ABOUT_ME.quote.text}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 font-medium">
              — {ABOUT_ME.quote.author}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutMe;
