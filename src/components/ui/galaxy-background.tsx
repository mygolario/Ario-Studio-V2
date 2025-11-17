'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const starsRef = useRef<Star[]>([])
  const energyWavesRef = useRef<EnergyWave[]>([])
  const cosmicParticlesRef = useRef<CosmicParticle[]>([])

  interface Star {
    x: number
    y: number
    radius: number
    opacity: number
    twinkleSpeed: number
    twinkleOffset: number
    brightness: number
  }

  interface EnergyWave {
    x: number
    y: number
    radius: number
    maxRadius: number
    opacity: number
    speed: number
    color: string
    side: 'left' | 'right'
  }

  interface CosmicParticle {
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

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
    }
    resizeCanvas()

    // Optimized star count based on screen size
    const isMobile = window.innerWidth < 768
    const starCount = isMobile ? 200 : 350
    const initialHeight = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
    
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * initialHeight,
      radius: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.015 + 0.008,
      twinkleOffset: Math.random() * Math.PI * 2,
      brightness: Math.random() * 0.4 + 0.6,
    }))

    // Energy waves from sides - fewer but more impactful
    const waveColors = [
      'rgba(168, 85, 247, 0.4)', // purple
      'rgba(0, 212, 255, 0.35)', // cyan
      'rgba(236, 72, 153, 0.4)', // pink
    ]
    energyWavesRef.current = Array.from({ length: 6 }, (_, i) => {
      const side = i % 2 === 0 ? 'left' : 'right'
      return {
        x: side === 'left' ? -100 : canvas.width + 100,
        y: Math.random() * initialHeight,
        radius: 0,
        maxRadius: Math.random() * 400 + 300,
        opacity: Math.random() * 0.3 + 0.2,
        speed: Math.random() * 2 + 1.5,
        color: waveColors[Math.floor(Math.random() * waveColors.length)],
        side,
      }
    })

    // Cosmic particles - fewer but more dynamic
    const particleColors = [
      'rgba(168, 85, 247, 0.8)',
      'rgba(0, 212, 255, 0.7)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(14, 165, 233, 0.7)',
    ]
    cosmicParticlesRef.current = []

    let time = 0
    let lastParticleTime = 0

    const animate = () => {
      // Throttle canvas updates for better performance
      const currentHeight = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
      if (canvas.height < currentHeight) {
        canvas.height = currentHeight
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.008 // Slower time increment for smoother animation

      // Draw deep space gradients - optimized
      const viewportHeight = window.innerHeight
      const gradientCount = Math.ceil(canvas.height / viewportHeight)
      
      for (let i = 0; i < gradientCount; i++) {
        const yOffset = i * viewportHeight

        // Left side gradient
        const gradient1 = ctx.createRadialGradient(
          canvas.width * 0.1,
          yOffset + (viewportHeight * 0.3),
          0,
          canvas.width * 0.1,
          yOffset + (viewportHeight * 0.3),
          canvas.width * 1.5
        )
        gradient1.addColorStop(0, 'rgba(168, 85, 247, 0.1)')
        gradient1.addColorStop(0.4, 'rgba(0, 212, 255, 0.06)')
        gradient1.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient1
        ctx.fillRect(0, yOffset, canvas.width, viewportHeight)

        // Right side gradient
        const gradient2 = ctx.createRadialGradient(
          canvas.width * 0.9,
          yOffset + (viewportHeight * 0.7),
          0,
          canvas.width * 0.9,
          yOffset + (viewportHeight * 0.7),
          canvas.width * 1.5
        )
        gradient2.addColorStop(0, 'rgba(236, 72, 153, 0.1)')
        gradient2.addColorStop(0.4, 'rgba(14, 165, 233, 0.06)')
        gradient2.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient2
        ctx.fillRect(0, yOffset, canvas.width, viewportHeight)
      }

      // Update and draw energy waves
      energyWavesRef.current.forEach((wave) => {
        wave.radius += wave.speed
        wave.opacity = Math.max(0, wave.opacity - 0.003)

        if (wave.radius >= wave.maxRadius || wave.opacity <= 0) {
          const currentDocHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight)
          wave.radius = 0
          wave.opacity = Math.random() * 0.3 + 0.2
          wave.y = Math.random() * currentDocHeight
          wave.x = wave.side === 'left' ? -100 : canvas.width + 100
        }

        // Draw energy wave with multiple rings
        for (let ring = 0; ring < 3; ring++) {
          const ringRadius = wave.radius - (ring * 30)
          if (ringRadius <= 0) continue
          
          const ringOpacity = (wave.opacity * (1 - ring * 0.3)) * (1 - ringRadius / wave.maxRadius)
          const ringGradient = ctx.createRadialGradient(wave.x, wave.y, 0, wave.x, wave.y, ringRadius)
          ringGradient.addColorStop(0, wave.color.replace('0.4', ringOpacity.toString()).replace('0.35', ringOpacity.toString()))
          ringGradient.addColorStop(0.5, wave.color.replace('0.4', (ringOpacity * 0.5).toString()).replace('0.35', (ringOpacity * 0.5).toString()))
          ringGradient.addColorStop(1, 'transparent')
          
          ctx.fillStyle = ringGradient
          ctx.beginPath()
          ctx.arc(wave.x, wave.y, ringRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Create cosmic particles occasionally
      if (time - lastParticleTime > 2 + Math.random() * 3) {
        const side = Math.random() > 0.5 ? 'left' : 'right'
        cosmicParticlesRef.current.push({
          x: side === 'left' ? -20 : canvas.width + 20,
          y: Math.random() * canvas.height,
          vx: side === 'left' ? Math.random() * 1.5 + 0.8 : -(Math.random() * 1.5 + 0.8),
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 8 + 4,
          opacity: Math.random() * 0.8 + 0.4,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          life: 0,
          maxLife: Math.random() * 100 + 80,
        })
        lastParticleTime = time
      }

      // Update and draw cosmic particles
      cosmicParticlesRef.current = cosmicParticlesRef.current.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++
        particle.opacity = particle.opacity * (1 - particle.life / particle.maxLife)

        if (particle.life >= particle.maxLife || particle.x < -50 || particle.x > canvas.width + 50) {
          return false
        }

        // Draw particle with glow
        const particleGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
        particleGradient.addColorStop(0, particle.color.replace('0.8', particle.opacity.toString()).replace('0.7', particle.opacity.toString()))
        particleGradient.addColorStop(0.5, particle.color.replace('0.8', (particle.opacity * 0.6).toString()).replace('0.7', (particle.opacity * 0.6).toString()))
        particleGradient.addColorStop(1, 'transparent')

        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = particle.color.replace('0.8', particle.opacity.toString()).replace('0.7', particle.opacity.toString())
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

      // Draw optimized stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.25 + 0.75
        const currentOpacity = star.opacity * twinkle * star.brightness

        // Single glow layer for performance
        const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 4)
        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.6})`)
        glowGradient.addColorStop(0.5, `rgba(255, 255, 255, ${currentOpacity * 0.3})`)
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

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
      // Reinitialize stars on resize
      const newHeight = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
      const isMobile = window.innerWidth < 768
      const starCount = isMobile ? 200 : 350
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * newHeight,
        radius: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.015 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.4 + 0.6,
      }))
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    initCanvas()
  }, [initCanvas])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1, background: '#000000' }}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{
          width: '100%',
          height: '100%',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
