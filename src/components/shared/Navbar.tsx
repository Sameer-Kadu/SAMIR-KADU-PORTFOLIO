"use client"

import Link from "next/link"
import { useState, useRef, useMemo, useCallback, useEffect } from "react"
import { NAV_LINKS } from "../../lib/constants"
import { GooeyBackground } from "./gooey-background"
import MobileMenu from "./mobile-menu"
import NavItem from "./nav-item"
import { useScrollDirection } from "../../lib/hooks/useScrollDirection"
import FloatingContactButton from "./FloatingContactButton"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navContainerRef = useRef<HTMLDivElement>(null)

  const { isScrolled, isVisible } = useScrollDirection()

  const sectionIds = useMemo(() => NAV_LINKS.map(link => link.href.substring(1)), [])
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  // Smooth scroll to section
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }, [])

  // Track section for active link highlight
  useEffect(() => {
    const handleScroll = () => {
      let current = sectionIds[0]
      sectionIds.forEach(id => {
        const section = document.getElementById(id)
        if (section && window.scrollY >= section.offsetTop - 200) {
          current = id
        }
      })
      setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionIds])

  // Navbar CSS classes
  const navbarClasses = useMemo(
    () =>
      `fixed top-0 z-50 w-full transition-transform duration-500 ease-in-out mt-5 rounded-full
      ${isVisible ? "translate-y-0" : "-translate-y-[120%]"}
      ${isScrolled ? "backdrop-blur-3xl bg-opacity-140" : ""}`,
    [isVisible, isScrolled]
  )

  return (
    <>
      <nav className={navbarClasses}>
        <div className="mx-5 rounded-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 rounded-full">
            <div className="flex justify-between items-center p-2">
              {/* Logo */}
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
                <GooeyBackground
                  activeIndex={sectionIds.indexOf(activeSection)}
                  itemCount={NAV_LINKS.length}
                  containerRef={navContainerRef}
                />
                {NAV_LINKS.map(link => (
                  <NavItem
                    key={link.name}
                    link={link}
                    isActive={activeSection === link.href.substring(1)}
                    onClick={scrollToSection}
                  />
                ))}
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                <FloatingContactButton />
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
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          navLinks={NAV_LINKS}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar
