"use client"

import { useState, useEffect } from "react"

interface ScrollDirectionReturn {
  isScrolled: boolean
  isVisible: boolean
}

export const useScrollDirection = (): ScrollDirectionReturn => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // Background blur effect
          setIsScrolled(currentScrollY > 50)

          // Hide/show navbar on scroll
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false) // Scrolling down
          } else {
            setIsVisible(true) // Scrolling up
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return { isScrolled, isVisible }
}
