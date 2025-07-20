"use client"

import { useRef, useEffect, memo } from "react"
import type { GooeyBackgroundProps } from "../../types/nav"

const GooeyBackground = memo(({ activeIndex, itemCount, containerRef }: GooeyBackgroundProps) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const lastActiveIndex = useRef(activeIndex)
  const isAnimating = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    const rect = container.getBoundingClientRect()

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = rect.width + "px"
    canvas.style.height = rect.height + "px"
    ctx.scale(dpr, dpr)

    // Reduced particle count for better performance
    const particleCount = 12
    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]

    // Initialize particles only once
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          targetX: 0,
          targetY: 0,
          alpha: 0.4 + Math.random() * 0.2,
          isAtTarget: false,
        })
      }
    }

    // Check if active index changed
    const indexChanged = lastActiveIndex.current !== activeIndex
    if (indexChanged) {
      lastActiveIndex.current = activeIndex
      isAnimating.current = true
      // Reset particles target state
      particlesRef.current.forEach((particle) => {
        particle.isAtTarget = false
      })
    }

    // Get the actual active nav button position
    const getActiveNavPosition = () => {
      const navButtons = container.querySelectorAll("button")
      if (navButtons[activeIndex]) {
        const buttonRect = navButtons[activeIndex].getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        return {
          x: buttonRect.left - containerRect.left + buttonRect.width / 2,
          y: buttonRect.top - containerRect.top + buttonRect.height / 2,
        }
      }

      // Fallback to calculated position
      const itemWidth = rect.width / itemCount
      return {
        x: (activeIndex + 0.5) * itemWidth,
        y: rect.height / 2,
      }
    }

    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime) => {
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime

      ctx.clearRect(0, 0, rect.width, rect.height)

      const activePos = getActiveNavPosition()
      let allParticlesAtTarget = true

      particlesRef.current.forEach((particle, i) => {
        // Much smaller radius to keep particles close to the nav item
        const angle = (i / particleCount) * Math.PI * 5
        const baseRadius = 8 // Much smaller base radius
        const radiusVariation = Math.sin(currentTime * 0.003 + i) * 50 // Smaller variation
        const currentRadius = baseRadius + radiusVariation

        particle.targetX = activePos.x + Math.cos(angle) * currentRadius
        particle.targetY = activePos.y + Math.sin(angle) * currentRadius * 0.6 // Slightly flattened

        // Check if particle is close to target (smaller threshold)
        const distanceToTarget = Math.sqrt(
          Math.pow(particle.targetX - particle.x, 2) + Math.pow(particle.targetY - particle.y, 2),
        )

        if (distanceToTarget > 2) {
          // Smaller threshold
          allParticlesAtTarget = false
          particle.isAtTarget = false
        } else {
          particle.isAtTarget = true
        }

        // Move towards target with stronger easing when far, gentler when close
        const easingStrength = Math.min(distanceToTarget / 50, 1) * 0.10 + 0.02

        if (!particle.isAtTarget) {
          particle.x += (particle.targetX - particle.x) * easingStrength
          particle.y += (particle.targetY - particle.y) * easingStrength
        } else {
          // Very gentle floating motion when at target
          particle.x += Math.sin(currentTime * 0.002 + i) * 0.8
          particle.y += Math.cos(currentTime * 0.002 + i) * 0.5
        }

        // Minimal random movement
        particle.x += particle.vx * 0.2
        particle.y += particle.vy * 0.2

        // Boundary check with gentler bouncing
        if (particle.x < 5 || particle.x > rect.width - 5) particle.vx *= -0.3
        if (particle.y < 5 || particle.y > rect.height - 5) particle.vy *= -0.3

        // Draw particle with enhanced glow
        ctx.save()
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 8

        // Draw main particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw inner glow
        ctx.globalAlpha = particle.alpha * 0.5
        ctx.shadowBlur = 4
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 0.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })

      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [activeIndex, itemCount])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "screen" }} />
})

GooeyBackground.displayName = "GooeyBackground"

export { GooeyBackground }
