'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { SKILLS } from '../../lib/constants';

const SkillCategory = ({ title, skills, isInView }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] as const },
    },
  };

  return (
    <motion.div
      className="w-full md:w-1/2 lg:w-1/4 p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h3>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="group flex flex-col items-center justify-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
            variants={itemVariants}
          >
            <div className="relative w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" aria-hidden="true"></div>
              <Image
                src={skill.icon}
                alt={skill.name}
                width={64}
                height={64}
                className="relative object-contain p-2 bg-white/80 dark:bg-gray-900/80 rounded-full shadow-md"
              />
            </div>
            <p className="text-gray-800 dark:text-gray-200 text-center text-sm font-semibold">
              {skill.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section 
      id="skills" 
      ref={ref}
      className="py-24 bg-gradient-to-br from-white/80 via-gray-50/80 to-blue-100/80 dark:from-gray-900/80 dark:via-slate-900/80 dark:to-black/80 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
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
            A collection of technologies and tools I use to bring ideas to life.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
        </motion.div>
        <div className="flex flex-wrap justify-center -mx-4">
          <SkillCategory title="Frontend" skills={SKILLS.frontend} isInView={isInView} />
          <SkillCategory title="Backend" skills={SKILLS.backend} isInView={isInView} />
          <SkillCategory title="QA Automation" skills={SKILLS.qaAutomation} isInView={isInView} />
          <SkillCategory title="DevOps" skills={SKILLS.devops} isInView={isInView} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
