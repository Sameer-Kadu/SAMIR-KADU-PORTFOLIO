"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { INTERESTS_HOBBIES } from "../../lib/constants";

const InterestsHobbies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="interests"
      ref={ref}
      className="section-padding bg-gray-50/80 dark:bg-[#0D1120] relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            Beyond Code
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {INTERESTS_HOBBIES.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg text-base">
            The things that inspire how I think and build.
          </p>
        </motion.div>

        {/* Interests grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INTERESTS_HOBBIES.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
              className="group relative rounded-3xl p-6 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] shadow-card-light dark:shadow-card-dark hover:border-violet-200 dark:hover:border-violet-500/30 transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/60 to-transparent dark:from-violet-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

              <div className="relative flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                {/* Name */}
                <h3 className="font-heading text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InterestsHobbies;
