"use client"

import { motion } from "framer-motion"
import type { NavItemProps } from "../../types/nav"

const NavItem = ({ link, isActive, onClick }: NavItemProps) => {
  return (
    <motion.button
      onClick={() => onClick(link.href)}
      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 z-10 ${
        isActive
          ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
      }`}
      whileHover={{
        scale: 1.05,
        boxShadow: isActive ? "0 10px 25px -5px rgba(59, 130, 246, 0.4)" : "0 4px 15px -2px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {link.name}

      {/* Simple static glow for active state - no animation loop */}
      {isActive && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />
      )}

      {/* Simple hover effect without continuous animation */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none opacity-0"
        whileHover={{
          opacity: 0.1,
          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

NavItem.displayName = "NavItem"

export { NavItem }
export default NavItem
