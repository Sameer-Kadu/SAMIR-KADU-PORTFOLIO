"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EXPERIENCE_EDUCATION } from "../../lib/constants";
import { Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";

const typeIconMap: Record<string, React.FC<{ className?: string }>> = {
  experience: ({ className }) => <Briefcase className={className} />,
  education: ({ className }) => <GraduationCap className={className} />,
  certification: ({ className }) => <Award className={className} />,
};

const typeLabelMap: Record<string, string> = {
  experience: "Work Experience",
  education: "Education",
  certification: "Certification",
};

const typeColorMap: Record<string, string> = {
  experience: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700",
  education: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700",
  certification: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700",
};

const dotColorMap: Record<string, string> = {
  experience: "bg-blue-500",
  education: "bg-emerald-500",
  certification: "bg-amber-500",
};

const ExperienceEducation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] as const },
    },
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide uppercase mb-4">
            My Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {EXPERIENCE_EDUCATION.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A timeline of professional experience, education, and credentials.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 -translate-x-1/2" />

          <div className="space-y-10">
            {EXPERIENCE_EDUCATION.timeline.map((item, index) => {
              const Icon = typeIconMap[item.type] ?? typeIconMap.experience;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className={`relative flex flex-col lg:flex-row items-start gap-0 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot — desktop center, mobile left */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-6 z-10">
                    <div
                      className={`w-4 h-4 rounded-full border-4 border-white dark:border-gray-950 shadow-md ${dotColorMap[item.type] ?? "bg-blue-500"}`}
                    />
                  </div>

                  {/* Card: offset to right of timeline on mobile, alternating on desktop */}
                  <div
                    className={`ml-14 lg:ml-0 w-full lg:w-[calc(50%-2rem)] ${
                      isLeft ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"
                    }`}
                  >
                    <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300">
                      {/* Type badge + duration row */}
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                            typeColorMap[item.type] ?? typeColorMap.experience
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {typeLabelMap[item.type] ?? item.type}
                        </span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                          {item.duration}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {item.title}
                      </h3>

                      {/* Company / Institution */}
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                        {(item as any).company ?? (item as any).institution}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Tech tags */}
                      {(item as any).tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {(item as any).tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden lg:block w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {[
            { Icon: Briefcase, value: "3+", label: "Years Professional Experience", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { Icon: GraduationCap, value: "PG-DAC", label: "Post-Graduate Qualification", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
            { Icon: Award, value: "AWS", label: "Cloud Certified", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
          ].map(({ Icon, value, label, color, bg }, i) => (
            <div
              key={i}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <div className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-xl ${bg}`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceEducation;
