'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { INTERESTS_HOBBIES } from '../../lib/constants';
import { easeInOut } from "framer-motion";

const InterestsHobbies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeInOut },
  },
};

  return (
    <section 
      id="interests" 
      ref={ref}
      className="py-24 bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-indigo-100/80 dark:from-purple-900/80 dark:via-slate-900/80 dark:to-indigo-900/80 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.1),transparent)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.05),transparent)]" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.1),transparent)] dark:bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.05),transparent)]" aria-hidden="true"></div>
      
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            {INTERESTS_HOBBIES.title}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Beyond coding, I'm passionate about exploring creativity, staying active, and continuously learning new things that inspire my work and life.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {INTERESTS_HOBBIES.items.map((item, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
            >
              <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-slate-700/50 hover:scale-105 hover:bg-white/80 dark:hover:bg-slate-800/80 h-full flex flex-col items-center text-center group-hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-110"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <Image 
                      src={item.icon} 
                      alt={item.name} 
                      width={48} 
                      height={48} 
                      className="w-12 h-12 filter brightness-0 invert"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {item.description}
                  </p>
                )}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-16 transition-all duration-500 rounded-full"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <div className="inline-block bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50">
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
              "Creativity is intelligence having fun" - Albert Einstein
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default InterestsHobbies;
