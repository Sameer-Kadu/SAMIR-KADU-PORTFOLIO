"use client"

import Link from "next/link"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { NAV_LINKS } from "../../lib/constants"
import { ThemeToggle } from "../ui/ThemeToggle"
import { useScrollSpy } from "../../lib/hooks/useScrollSpy"
import { navVariants } from "../../lib/animations"
import { GooeyBackground } from "./gooey-background"
import MobileMenu from "./mobile-menu"
import NavItem from "./nav-item"
import { useScrollDirection } from "../../lib/hooks/useScrollDirection"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navContainerRef = useRef<HTMLDivElement>(null)

  // Custom hooks for scroll behavior
  const { isScrolled, isVisible } = useScrollDirection()

  const sectionIds = useMemo(() => NAV_LINKS.map((link) => link.href.substring(1)), [])

  const activeSection = useScrollSpy(sectionIds)
  const activeIndex = useMemo(() => {
    const index = sectionIds.findIndex((id) => id === activeSection)
    return index >= 0 ? index : 0
  }, [sectionIds, activeSection])

  // Memoized scroll handler
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".mobile-menu")) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMobileMenuOpen])

  // Memoized navbar classes
  const navbarClasses = useMemo(
    () =>
      `fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "shadow-lg border-b border-gray-200/10 dark:border-gray-700/10" : ""}`,
    [isVisible, isScrolled],
  )

  return (
    <>
      <motion.nav variants={navVariants} initial="hidden" animate="visible" className={navbarClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo/Brand */}
            <Link
              href="/"
              className="group flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                  S
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
              <span className="hidden sm:block">Samir Kadu</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 relative" ref={navContainerRef}>
              <GooeyBackground activeIndex={activeIndex} itemCount={NAV_LINKS.length} containerRef={navContainerRef} />

              {NAV_LINKS.map((link, index) => (
                <NavItem
                  key={link.name}
                  link={link}
                  isActive={activeSection === link.href.substring(1)}
                  onClick={scrollToSection}
                />
              ))}
            </div>

            {/* Right side - Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 mobile-menu"
                aria-label="Toggle mobile menu"
              >
                <div className="relative w-6 h-6">
                  <span className={`hamburger-line top-1 ${isMobileMenuOpen ? "rotate-45 top-2.5" : ""}`}></span>
                  <span className={`hamburger-line top-2.5 ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
                  <span className={`hamburger-line top-4 ${isMobileMenuOpen ? "-rotate-45 top-2.5" : ""}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          navLinks={NAV_LINKS}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  )
}

export default Navbar
