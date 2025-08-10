"use client"

import { useState, useEffect, useRef } from "react"

interface ScrollDirectionReturn {
  isScrolled: boolean
  isVisible: boolean
}

export const useScrollDirection = (): ScrollDirectionReturn => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            // scrolling down
            setIsVisible(false)
          } else {
            // scrolling up
            setIsVisible(true)
          }
          lastScrollY.current = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { isScrolled, isVisible }
}
