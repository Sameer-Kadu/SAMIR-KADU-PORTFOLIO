'use client';

import { motion } from 'framer-motion';

const FloatingContactButton = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={scrollToContact}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
    >
      Contact Me
    </motion.button>
  );
};

export default FloatingContactButton;
