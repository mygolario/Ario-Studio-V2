'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function AICreativeLabSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })

    // Particles for AI visualization
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      life: number
      maxLife: number
    }

    interface Connection {
      from: Particle
      to: Particle
      opacity: number
    }

    const particles: Particle[] = []
    const connections: Connection[] = []
    const colors = [
      'rgba(168, 85, 247, 0.8)', // purple
      'rgba(0, 212, 255, 0.7)', // cyan
      'rgba(236, 72, 153, 0.8)', // pink
      'rgba(14, 165, 233, 0.7)', // blue
    ]

    // Create particles
    const particleCount = 80
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 200 + 100,
      })
    }

    let time = 0
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Update particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Attract to mouse
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 200) {
          const force = (200 - distance) / 200
          particle.vx += (dx / distance) * force * 0.01
          particle.vy += (dy / distance) * force * 0.01
        }

        // Boundary bounce
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Friction
        particle.vx *= 0.98
        particle.vy *= 0.98

        // Pulsing opacity
        const pulse = Math.sin(time * 2 + particle.life * 0.1) * 0.2 + 0.8
        const currentOpacity = particle.opacity * pulse

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, particle.color.replace('0.8', currentOpacity.toString()).replace('0.7', currentOpacity.toString()))
        gradient.addColorStop(0.5, particle.color.replace('0.8', (currentOpacity * 0.6).toString()).replace('0.7', (currentOpacity * 0.6).toString()))
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = particle.color.replace('0.8', currentOpacity.toString()).replace('0.7', currentOpacity.toString())
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections
      connections.length = 0
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const connectionOpacity = (1 - distance / 150) * 0.3
            ctx.strokeStyle = `rgba(0, 212, 255, ${connectionOpacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })
      })

      // Central AI orb effect
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const orbSize = 100 + Math.sin(time * 2) * 20
      const orbOpacity = 0.3 + Math.sin(time * 1.5) * 0.1

      // Outer glow
      const orbGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, orbSize * 2)
      orbGradient.addColorStop(0, `rgba(168, 85, 247, ${orbOpacity})`)
      orbGradient.addColorStop(0.3, `rgba(0, 212, 255, ${orbOpacity * 0.7})`)
      orbGradient.addColorStop(0.6, `rgba(236, 72, 153, ${orbOpacity * 0.4})`)
      orbGradient.addColorStop(1, 'transparent')

      ctx.fillStyle = orbGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, orbSize * 2, 0, Math.PI * 2)
      ctx.fill()

      // Inner core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, orbSize)
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${orbOpacity * 2})`)
      coreGradient.addColorStop(0.5, `rgba(0, 212, 255, ${orbOpacity * 1.5})`)
      coreGradient.addColorStop(1, 'transparent')

      ctx.fillStyle = coreGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, orbSize, 0, Math.PI * 2)
      ctx.fill()

      // Rotating rings
      for (let ring = 0; ring < 3; ring++) {
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(time * 0.5 + ring * (Math.PI / 3))
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 - ring * 0.05})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(0, 0, orbSize + ring * 30, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold text-text-primary leading-tight tracking-tight mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Creative Lab
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
            Motion-first, AI-focused experiences
          </p>
        </motion.div>

        {/* Animated Canvas Visualization */}
        <motion.div
          className="relative rounded-3xl overflow-hidden border border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-xl"
          style={{
            scale: prefersReducedMotion ? 1 : scale,
            opacity: prefersReducedMotion ? 1 : opacity,
          }}
        >
          {/* Canvas Animation */}
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{
              minHeight: '500px',
              height: '600px',
              display: 'block',
            }}
          />

          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none" />

          {/* Floating text overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-center px-4">
              <motion.div
                className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4"
                animate={prefersReducedMotion ? {} : {
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(90deg, #00d4ff, #a855f7, #ec4899, #00d4ff)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI
              </motion.div>
              <p className="text-lg md:text-xl text-text-secondary/80 font-light">
                Interactive Intelligence
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
