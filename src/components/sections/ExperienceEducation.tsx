"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Award, CheckCircle2 } from "lucide-react";
import { EXPERIENCE_EDUCATION } from "../../lib/constants";

const typeConfig = {
  experience: {
    Icon: Briefcase,
    color: "bg-brand-50 dark:bg-brand-600/15 border-brand-100 dark:border-brand-600/25",
    iconColor: "text-brand-600 dark:text-brand-400",
    badgeColor: "bg-brand-50 dark:bg-brand-600/10 text-brand-700 dark:text-brand-400 border-brand-200 dark:border-brand-600/30",
    lineColor: "bg-brand-500",
  },
  education: {
    Icon: GraduationCap,
    color: "bg-violet-50 dark:bg-violet-500/10 border-violet-100 dark:border-violet-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    badgeColor: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-500/30",
    lineColor: "bg-violet-500",
  },
  certification: {
    Icon: Award,
    color: "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    badgeColor: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
    lineColor: "bg-amber-500",
  },
};

const ExperienceEducation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="experience"
      ref={ref}
      className="section-padding bg-white dark:bg-[#0A0E1A] relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-600/10 border border-brand-200 dark:border-brand-600/20 text-brand-700 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Experience
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {EXPERIENCE_EDUCATION.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base">
            {EXPERIENCE_EDUCATION.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-100 dark:bg-white/[0.06]" aria-hidden="true" />

          <div className="space-y-8">
            {EXPERIENCE_EDUCATION.timeline.map((item, index) => {
              const cfg = typeConfig[item.type as keyof typeof typeConfig] ?? typeConfig.experience;
              const { Icon } = cfg;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 * index, ease: "easeOut" }}
                  className="relative pl-16"
                >
                  {/* Timeline icon */}
                  <div
                    className={`absolute left-0 w-10 h-10 rounded-2xl border flex items-center justify-center ${cfg.color} z-10`}
                  >
                    <Icon className={`w-4.5 h-4.5 ${cfg.iconColor}`} style={{ width: 18, height: 18 }} />
                  </div>

                  {/* Card */}
                  <div className="rounded-3xl p-6 sm:p-7 bg-gray-50 dark:bg-white/[0.025] border border-gray-100 dark:border-white/[0.06] hover:border-gray-200 dark:hover:border-white/10 transition-colors duration-200 group">

                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-0.5">
                          {(item as { company?: string; institution?: string }).company ??
                            (item as { company?: string; institution?: string }).institution}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {item.badge && (
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                          {item.duration}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="space-y-1.5">
                        {item.highlights.map((point, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-600 dark:text-gray-400 leading-snug">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Achievement stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 grid grid-cols-3 gap-4 rounded-3xl bg-gradient-to-br from-brand-50 to-accent-50/50 dark:from-brand-600/[0.08] dark:to-accent-500/[0.05] border border-brand-100 dark:border-brand-600/20 p-6"
        >
          {[
            { value: "3+", label: "Years in industry" },
            { value: "1", label: "AWS Certification" },
            { value: "60%+", label: "Regression time saved" },
          ].map((s, i) => (
            <div key={i} className={`text-center ${i < 2 ? "border-r border-brand-100 dark:border-brand-600/20" : ""}`}>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-gradient mb-0.5">
                {s.value}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ExperienceEducation;
