"use client";
import { useRef } from "react";
import { motion, useInView, easeInOut } from "framer-motion";
import { EXPERIENCE_EDUCATION } from "../../lib/constants";

const ExperienceEducation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      y: 80,
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.8,
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.0, 0.0, 0.2, 1] as const,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: {
        duration: 1.5,
        ease: [0.42, 0, 0.58, 1] as const,
        delay: 0.8,
      },
    },
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 dark:from-gray-900 dark:via-slate-900/60 dark:to-gray-900 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27 width=%2732%27 height=%2732%27 fill=%27none%27 stroke=%27rgb(148 163 184 / 0.08)%27%3e%3cpath d=%27m0 .5h32m-16 0v32%27/%3e%3c/svg%3e')] dark:bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27 width=%2732%27 height=%2732%27 fill=%27none%27 stroke=%27rgb(30 41 59 / 0.4)%27%3e%3cpath d=%27m0 .5h32m-16 0v32%27/%3e%3c/svg%3e')] bg-[size:24px_24px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full mix-blend-multiply filter blur-3xl animate-bounce dark:from-blue-600/10 dark:to-cyan-600/10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse dark:from-purple-600/10 dark:to-pink-600/10" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse dark:from-indigo-600/5 dark:to-blue-600/5" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: -60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-full mb-6">
            <span className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold text-sm tracking-wide uppercase">
              <span className="text-2xl">🚀</span>
              <span>My Journey</span>
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent leading-tight">
              {EXPERIENCE_EDUCATION.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            A comprehensive timeline showcasing my professional evolution and
            academic milestones
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mx-auto rounded-full shadow-lg shadow-blue-500/25"></div>
        </motion.div>

        {/* Enhanced Timeline */}
        <motion.div
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Animated Center Line */}
          <div
            className="absolute left-1/2 top-0 h-full w-1 
        bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200 
        dark:from-blue-800 dark:via-purple-800 dark:to-indigo-800 
        rounded-full transform -translate-x-1/2 z-0"
          >
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 rounded-full shadow-lg"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          </div>

          {EXPERIENCE_EDUCATION.timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative mb-16 lg:mb-20 min-h-[300px] flex items-center"
              variants={cardVariants}
              custom={index}
            >
              <div
                className={`flex items-center w-full ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                } flex-col lg:gap-0 gap-8`}
              >
                {/* Enhanced Card */}
                <div className="w-full lg:w-5/12 relative group">
                  <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-200/50 dark:border-blue-700/50">
                          {item.duration}
                        </span>
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {item.title}
                      </h3>

                      <div className="flex items-center mb-6">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3" />
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          {item.company || item.institution}
                        </p>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden lg:block lg:w-2/12" />

                {/* Mobile timeline connector */}
                <div className="lg:hidden w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mx-auto" />
              </div>

              {/* Enhanced Timeline Icon - PROPERLY CENTERED */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 
         bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 
         rounded-full flex items-center justify-center text-white text-3xl 
         shadow-2xl border-4 border-white dark:border-gray-900 
         z-20 hover:scale-110 transition-transform duration-300"
                variants={iconVariants}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                <span className="relative z-10 drop-shadow-lg">
                  {item.icon || (item.company ? "💼" : "🎓")}
                </span>
              </motion.div>

              {/* Connection Line to Card */}
              <div
                className={`hidden lg:block absolute top-1/2 w-16 h-0.5 bg-gradient-to-r z-10 ${
                  index % 2 === 0
                    ? "right-1/2 from-purple-300 to-transparent mr-10"
                    : "left-1/2 from-transparent to-purple-300 ml-10"
                } dark:from-purple-600 dark:to-transparent`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Achievement Stats */}
      <motion.div
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        {[
          {
            number: `${
              EXPERIENCE_EDUCATION.timeline.filter((item) => item.company)
                .length
            }+`,
            label: "Professional Roles",
            icon: "💼",
          },
          {
            number: `${
              EXPERIENCE_EDUCATION.timeline.filter((item) => item.institution)
                .length
            }+`,
            label: "Academic Achievements",
            icon: "🎓",
          },
          {
            number: `${
              new Date().getFullYear() -
              Math.min(
                ...EXPERIENCE_EDUCATION.timeline.map(
                  (item) =>
                    parseInt(item.duration.split("-")[0]) ||
                    new Date().getFullYear()
                )
              )
            }+`,
            label: "Years of Growth",
            icon: "📈",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ExperienceEducation;