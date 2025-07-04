'use client';

import { motion } from 'framer-motion';
import { footerVariants } from '../../lib/animations';

const Footer = () => {
  return (
    <motion.footer 
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-100 dark:bg-gray-900 py-6 text-center text-gray-600 dark:text-gray-400"
    >
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Samir Kadu. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
