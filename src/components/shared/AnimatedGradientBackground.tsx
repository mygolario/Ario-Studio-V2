'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()

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

    // Ultra Gradient colors - AI Galaxy theme
    const colors = [
      { r: 168, g: 85, b: 247 },   // Purple
      { r: 0, g: 212, b: 255 },    // Cyan
      { r: 14, g: 165, b: 233 },   // Teal
      { r: 236, g: 72, b: 153 },   // Magenta
    ]

    let time = 0
    const speed = 0.0003

    const draw = () => {
      time += speed
      
      // Create gradient
      const gradient = ctx.createLinearGradient(
        canvas.width * (0.5 + Math.sin(time) * 0.3),
        canvas.height * (0.5 + Math.cos(time * 0.7) * 0.3),
        canvas.width * (0.5 - Math.sin(time) * 0.3),
        canvas.height * (0.5 - Math.cos(time * 0.7) * 0.3)
      )

      // Add color stops with smooth transitions
      const colorIndex1 = Math.floor(time) % colors.length
      const colorIndex2 = (colorIndex1 + 1) % colors.length
      const t = (time % 1)

      const c1 = colors[colorIndex1]
      const c2 = colors[colorIndex2]

      // Interpolate between colors
      const r1 = Math.floor(c1.r + (c2.r - c1.r) * t)
      const g1 = Math.floor(c1.g + (c2.g - c1.g) * t)
      const b1 = Math.floor(c1.b + (c2.b - c1.b) * t)

      const nextColorIndex = (colorIndex2 + 1) % colors.length
      const c3 = colors[nextColorIndex]
      const r2 = Math.floor(c2.r + (c3.r - c2.r) * t)
      const g2 = Math.floor(c2.g + (c3.g - c2.g) * t)
      const b2 = Math.floor(c2.b + (c3.b - c2.b) * t)

      gradient.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.15)`)
      gradient.addColorStop(0.5, `rgba(${r2}, ${g2}, ${b2}, 0.12)`)
      gradient.addColorStop(1, `rgba(${r1}, ${g1}, ${b1}, 0.08)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add grain/noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8
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
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 opacity-40"
      />
      {/* Additional overlay for depth */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
    </>
  )
}

