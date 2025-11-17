'use client'

import { useEffect, useRef } from 'react'

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const starsRef = useRef<Star[]>([])
  const particlesRef = useRef<Particle[]>([])

  interface Star {
    x: number
    y: number
    radius: number
    opacity: number
    twinkleSpeed: number
    twinkleOffset: number
  }

  interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    color: string
    side: 'left' | 'right'
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      // Use a large height to cover full page, will be updated dynamically
      canvas.height = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('scroll', resizeCanvas)

    // Create stars - distribute across a large area to cover full page
    const starCount = 400
    const initialHeight = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * initialHeight,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    // Create floating particles from sides
    const particleCount = 15
    const colors = [
      'rgba(168, 85, 247, 0.4)', // purple
      'rgba(0, 212, 255, 0.4)', // cyan
      'rgba(236, 72, 153, 0.4)', // pink
      'rgba(14, 165, 233, 0.4)', // blue
    ]
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
      const side = i % 2 === 0 ? 'left' : 'right'
      return {
        x: side === 'left' ? -50 : canvas.width + 50,
        y: Math.random() * initialHeight,
        vx: side === 'left' ? Math.random() * 0.5 + 0.2 : -(Math.random() * 0.5 + 0.2),
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 40 + 20,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        side,
      }
    })

    let time = 0

    const animate = () => {
      // Update canvas height dynamically based on document height
      const currentHeight = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
      if (canvas.height < currentHeight) {
        canvas.height = currentHeight
        // Add more stars if needed
        const additionalStars = Math.floor((currentHeight - starsRef.current.length * (window.innerHeight / 400)) / (window.innerHeight / 400))
        if (additionalStars > 0) {
          const newStars = Array.from({ length: Math.min(additionalStars, 100) }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * (currentHeight - window.innerHeight) + window.innerHeight,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            twinkleOffset: Math.random() * Math.PI * 2,
          }))
          starsRef.current.push(...newStars)
        }
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw nebula/gradient background - multiple gradients for full page coverage
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      
      // Create multiple nebula gradients along the page
      for (let i = 0; i < Math.ceil(canvas.height / viewportHeight); i++) {
        const yOffset = i * viewportHeight
        
        const gradient1 = ctx.createRadialGradient(
          canvas.width * 0.2,
          yOffset + (viewportHeight * 0.3),
          0,
          canvas.width * 0.2,
          yOffset + (viewportHeight * 0.3),
          canvas.width * 0.8
        )
        gradient1.addColorStop(0, 'rgba(168, 85, 247, 0.08)')
        gradient1.addColorStop(0.5, 'rgba(0, 212, 255, 0.05)')
        gradient1.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient1
        ctx.fillRect(0, yOffset, canvas.width, viewportHeight)

        const gradient2 = ctx.createRadialGradient(
          canvas.width * 0.8,
          yOffset + (viewportHeight * 0.7),
          0,
          canvas.width * 0.8,
          yOffset + (viewportHeight * 0.7),
          canvas.width * 0.8
        )
        gradient2.addColorStop(0, 'rgba(236, 72, 153, 0.08)')
        gradient2.addColorStop(0.5, 'rgba(14, 165, 233, 0.05)')
        gradient2.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient2
        ctx.fillRect(0, yOffset, canvas.width, viewportHeight)
      }

      // Draw and update stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        const currentOpacity = star.opacity * twinkle

        // Star glow
        const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 4)
        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.5})`)
        glowGradient.addColorStop(0.5, `rgba(255, 255, 255, ${currentOpacity * 0.2})`)
        glowGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2)
        ctx.fill()

        // Star core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw and update floating particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Reset particle when it goes off screen
        const currentDocHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight)
        if (particle.side === 'left' && particle.x > canvas.width + 100) {
          particle.x = -50
          particle.y = Math.random() * currentDocHeight
        } else if (particle.side === 'right' && particle.x < -100) {
          particle.x = canvas.width + 50
          particle.y = Math.random() * currentDocHeight
        }

        // Wrap vertically
        if (particle.y < -50) particle.y = currentDocHeight + 50
        if (particle.y > currentDocHeight + 50) particle.y = -50

        // Draw particle with glow
        const particleGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        )
        particleGradient.addColorStop(0, particle.color.replace('0.4', particle.opacity.toString()))
        particleGradient.addColorStop(0.5, particle.color.replace('0.4', (particle.opacity * 0.5).toString()))
        particleGradient.addColorStop(1, 'transparent')

        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1, background: '#000000' }}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{ 
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}

