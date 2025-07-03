'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { sectionVariants } from '../../lib/animations';

const AnimatedSection = ({ children, id }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="py-0"
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
