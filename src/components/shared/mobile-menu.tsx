"use client"

import { motion } from "framer-motion"
import type { MobileMenuProps } from "../../types/nav"

const MobileMenu = ({ isOpen, navLinks, activeSection, onNavigate }: MobileMenuProps) => {
  return (
    <motion.div
      className={`lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20 mobile-menu overflow-hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      initial={{ opacity: 0, height: 0, y: -20 }}
      animate={{
        opacity: isOpen ? 1 : 0,
        height: isOpen ? "auto" : 0,
        y: isOpen ? 0 : -20,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.name}
              onClick={() => onNavigate(link.href)}
              className={`text-left px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 hover:scale-105 transform ${
                activeSection === link.href.substring(1)
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                x: isOpen ? 0 : -20,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              {link.name}
            </motion.button>
          ))}

          {/* Mobile CTA */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <motion.button
              onClick={() => onNavigate("#contact")}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 10,
              }}
              transition={{
                delay: navLinks.length * 0.1 + 0.1,
                duration: 0.3,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Connect
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

MobileMenu.displayName = "MobileMenu"

export { MobileMenu }
export default MobileMenu
