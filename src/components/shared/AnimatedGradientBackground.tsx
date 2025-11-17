'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Parallax shift on scroll
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Multi-layer gradient colors - AI Galaxy theme
    const colors = [
      { r: 15, g: 15, b: 20 },      // Deep charcoal
      { r: 168, g: 85, b: 247 },   // Purple
      { r: 0, g: 212, b: 255 },    // Blue/Cyan
      { r: 236, g: 72, b: 153 },   // Magenta
      { r: 14, g: 165, b: 233 },   // Cyan
    ]

    let time = 0
    const speed = 0.0002 // Slow cinematic speed (20-40s loops)

    const draw = () => {
      time += speed
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Layer 1: Base gradient
      const gradient1 = ctx.createLinearGradient(
        canvas.width * (0.5 + Math.sin(time) * 0.4),
        canvas.height * (0.5 + Math.cos(time * 0.8) * 0.4),
        canvas.width * (0.5 - Math.sin(time) * 0.4),
        canvas.height * (0.5 - Math.cos(time * 0.8) * 0.4)
      )

      const colorIndex1 = Math.floor(time) % colors.length
      const colorIndex2 = (colorIndex1 + 1) % colors.length
      const t = (time % 1)

      const c1 = colors[colorIndex1]
      const c2 = colors[colorIndex2]

      const r1 = Math.floor(c1.r + (c2.r - c1.r) * t)
      const g1 = Math.floor(c1.g + (c2.g - c1.g) * t)
      const b1 = Math.floor(c1.b + (c2.b - c1.b) * t)

      gradient1.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.25)`)
      gradient1.addColorStop(0.5, `rgba(${Math.floor(r1 * 0.8)}, ${Math.floor(g1 * 0.8)}, ${Math.floor(b1 * 0.8)}, 0.2)`)
      gradient1.addColorStop(1, `rgba(${r1}, ${g1}, ${b1}, 0.15)`)

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Layer 2: Secondary gradient (offset)
      const gradient2 = ctx.createRadialGradient(
        canvas.width * (0.3 + Math.sin(time * 1.2) * 0.3),
        canvas.height * (0.7 + Math.cos(time * 0.9) * 0.3),
        0,
        canvas.width * (0.3 + Math.sin(time * 1.2) * 0.3),
        canvas.height * (0.7 + Math.cos(time * 0.9) * 0.3),
        canvas.width * 0.8
      )

      const nextColorIndex = (colorIndex2 + 1) % colors.length
      const c3 = colors[nextColorIndex]
      const r2 = Math.floor(c2.r + (c3.r - c2.r) * t)
      const g2 = Math.floor(c2.g + (c3.g - c2.g) * t)
      const b2 = Math.floor(c2.b + (c3.b - c2.b) * t)

      gradient2.addColorStop(0, `rgba(${r2}, ${g2}, ${b2}, 0.2)`)
      gradient2.addColorStop(1, 'transparent')

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add grain/noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 6 // Subtle grain
        data[i] = Math.max(0, Math.min(255, data[i] + noise))     // R
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)) // G
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)) // B
      }

      ctx.putImageData(imageData, 0, 0)

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [prefersReducedMotion])

  // Floating dust/particles
  useEffect(() => {
    if (prefersReducedMotion || !particlesRef.current) return

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    const animate = () => {
      if (!particlesRef.current) return

      particlesRef.current.innerHTML = ''

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = window.innerWidth
        if (particle.x > window.innerWidth) particle.x = 0
        if (particle.y < 0) particle.y = window.innerHeight
        if (particle.y > window.innerHeight) particle.y = 0

        const dot = document.createElement('div')
        dot.style.position = 'absolute'
        dot.style.left = `${particle.x}px`
        dot.style.top = `${particle.y}px`
        dot.style.width = `${particle.size}px`
        dot.style.height = `${particle.size}px`
        dot.style.borderRadius = '50%'
        dot.style.background = `rgba(168, 85, 247, ${particle.opacity})`
        dot.style.pointerEvents = 'none'
        particlesRef.current?.appendChild(dot)
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />
    )
  }

  return (
    <>
      {/* Base dark background with gradient overlay */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f15] to-[#0a0a0f]" />
      
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          y: parallaxY,
        }}
      />
      {/* Floating dust particles */}
      <div
        ref={particlesRef}
        className="fixed inset-0 -z-10 pointer-events-none"
      />
      {/* Subtle overlay to ensure text readability */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none opacity-30" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.2) 100%)',
        }}
      />
    </>
  )
}
