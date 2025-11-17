'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const starsRef = useRef<Star[]>([])
  const energyWavesRef = useRef<EnergyWave[]>([])
  const cosmicParticlesRef = useRef<CosmicParticle[]>([])
  const nebulaCloudsRef = useRef<NebulaCloud[]>([])

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

  interface NebulaCloud {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    color: string
    side: 'left' | 'right'
    rotation: number
    rotationSpeed: number
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

    // More stars for richer background
    const isMobile = window.innerWidth < 768
    const starCount = isMobile ? 300 : 500
    const initialHeight = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)

    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * initialHeight,
      radius: Math.random() * 1.5 + 0.4,
      opacity: Math.random() * 0.8 + 0.3,
      twinkleSpeed: Math.random() * 0.015 + 0.008,
      twinkleOffset: Math.random() * Math.PI * 2,
      brightness: Math.random() * 0.4 + 0.6,
    }))

    // More energy waves
    const waveColors = [
      'rgba(168, 85, 247, 0.5)', // purple
      'rgba(0, 212, 255, 0.4)', // cyan
      'rgba(236, 72, 153, 0.5)', // pink
      'rgba(14, 165, 233, 0.4)', // blue
    ]
    energyWavesRef.current = Array.from({ length: 10 }, (_, i) => {
      const side = i % 2 === 0 ? 'left' : 'right'
      return {
        x: side === 'left' ? -100 : canvas.width + 100,
        y: Math.random() * initialHeight,
        radius: 0,
        maxRadius: Math.random() * 500 + 400,
        opacity: Math.random() * 0.4 + 0.25,
        speed: Math.random() * 2.5 + 1.5,
        color: waveColors[Math.floor(Math.random() * waveColors.length)],
        side,
      }
    })

    // Nebula clouds for depth
    const nebulaColors = [
      'rgba(168, 85, 247, 0.2)',
      'rgba(0, 212, 255, 0.15)',
      'rgba(236, 72, 153, 0.2)',
      'rgba(14, 165, 233, 0.15)',
    ]
    nebulaCloudsRef.current = Array.from({ length: 8 }, (_, i) => {
      const side = i % 2 === 0 ? 'left' : 'right'
      return {
        x: side === 'left' ? -200 : canvas.width + 200,
        y: Math.random() * initialHeight,
        vx: side === 'left' ? Math.random() * 0.4 + 0.15 : -(Math.random() * 0.4 + 0.15),
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 400 + 300,
        opacity: Math.random() * 0.25 + 0.15,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        side,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
      }
    })

    // Cosmic particles
    const particleColors = [
      'rgba(168, 85, 247, 0.9)',
      'rgba(0, 212, 255, 0.8)',
      'rgba(236, 72, 153, 0.9)',
      'rgba(14, 165, 233, 0.8)',
    ]
    cosmicParticlesRef.current = []

    let time = 0
    let lastParticleTime = 0

    const animate = () => {
      const currentHeight = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
      if (canvas.height < currentHeight) {
        canvas.height = currentHeight
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Enhanced deep space gradients
      const viewportHeight = window.innerHeight
      const gradientCount = Math.ceil(canvas.height / viewportHeight)

      for (let i = 0; i < gradientCount; i++) {
        const yOffset = i * viewportHeight

        // Multiple gradient layers for depth
        const gradient1 = ctx.createRadialGradient(
          canvas.width * 0.1,
          yOffset + (viewportHeight * 0.25),
          0,
          canvas.width * 0.1,
          yOffset + (viewportHeight * 0.25),
          canvas.width * 2
        )
        gradient1.addColorStop(0, 'rgba(168, 85, 247, 0.15)')
        gradient1.addColorStop(0.3, 'rgba(0, 212, 255, 0.1)')
        gradient1.addColorStop(0.6, 'rgba(236, 72, 153, 0.06)')
        gradient1.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient1
        ctx.fillRect(0, yOffset, canvas.width, viewportHeight)

        const gradient2 = ctx.createRadialGradient(
          canvas.width * 0.9,
          yOffset + (viewportHeight * 0.75),
          0,
          canvas.width * 0.9,
          yOffset + (viewportHeight * 0.75),
          canvas.width * 2
        )
        gradient2.addColorStop(0, 'rgba(236, 72, 153, 0.15)')
        gradient2.addColorStop(0.3, 'rgba(14, 165, 233, 0.1)')
        gradient2.addColorStop(0.6, 'rgba(168, 85, 247, 0.06)')
        gradient2.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient2
        ctx.fillRect(0, yOffset, canvas.width, viewportHeight)
      }

      // Draw nebula clouds
      nebulaCloudsRef.current.forEach((cloud) => {
        cloud.x += cloud.vx
        cloud.y += cloud.vy
        cloud.rotation += cloud.rotationSpeed

        const currentDocHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight)
        if (cloud.side === 'left' && cloud.x > canvas.width + 400) {
          cloud.x = -400
          cloud.y = Math.random() * currentDocHeight
        } else if (cloud.side === 'right' && cloud.x < -400) {
          cloud.x = canvas.width + 400
          cloud.y = Math.random() * currentDocHeight
        }

        if (cloud.y < -400) cloud.y = currentDocHeight + 400
        if (cloud.y > currentDocHeight + 400) cloud.y = -400

        ctx.save()
        ctx.translate(cloud.x, cloud.y)
        ctx.rotate(cloud.rotation)

        const cloudGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, cloud.size)
        cloudGradient.addColorStop(0, cloud.color.replace('0.2', cloud.opacity.toString()).replace('0.15', cloud.opacity.toString()))
        cloudGradient.addColorStop(0.5, cloud.color.replace('0.2', (cloud.opacity * 0.7).toString()).replace('0.15', (cloud.opacity * 0.7).toString()))
        cloudGradient.addColorStop(1, 'transparent')

        ctx.fillStyle = cloudGradient
        ctx.beginPath()
        ctx.ellipse(0, 0, cloud.size, cloud.size * 0.7, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Update and draw energy waves
      energyWavesRef.current.forEach((wave) => {
        wave.radius += wave.speed
        wave.opacity = Math.max(0, wave.opacity - 0.002)

        if (wave.radius >= wave.maxRadius || wave.opacity <= 0) {
          const currentDocHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight)
          wave.radius = 0
          wave.opacity = Math.random() * 0.4 + 0.25
          wave.y = Math.random() * currentDocHeight
          wave.x = wave.side === 'left' ? -100 : canvas.width + 100
        }

        // Draw energy wave with multiple rings
        for (let ring = 0; ring < 4; ring++) {
          const ringRadius = wave.radius - (ring * 40)
          if (ringRadius <= 0) continue

          const ringOpacity = (wave.opacity * (1 - ring * 0.25)) * (1 - ringRadius / wave.maxRadius)
          const ringGradient = ctx.createRadialGradient(wave.x, wave.y, 0, wave.x, wave.y, ringRadius)
          ringGradient.addColorStop(0, wave.color.replace('0.5', ringOpacity.toString()).replace('0.4', ringOpacity.toString()))
          ringGradient.addColorStop(0.4, wave.color.replace('0.5', (ringOpacity * 0.6).toString()).replace('0.4', (ringOpacity * 0.6).toString()))
          ringGradient.addColorStop(1, 'transparent')

          ctx.fillStyle = ringGradient
          ctx.beginPath()
          ctx.arc(wave.x, wave.y, ringRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Create cosmic particles more frequently
      if (time - lastParticleTime > 1.5 + Math.random() * 2) {
        const side = Math.random() > 0.5 ? 'left' : 'right'
        cosmicParticlesRef.current.push({
          x: side === 'left' ? -20 : canvas.width + 20,
          y: Math.random() * canvas.height,
          vx: side === 'left' ? Math.random() * 2 + 1 : -(Math.random() * 2 + 1),
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 10 + 5,
          opacity: Math.random() * 0.9 + 0.5,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          life: 0,
          maxLife: Math.random() * 120 + 100,
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

        // Draw particle with enhanced glow
        const particleGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        particleGradient.addColorStop(0, particle.color.replace('0.9', particle.opacity.toString()).replace('0.8', particle.opacity.toString()))
        particleGradient.addColorStop(0.4, particle.color.replace('0.9', (particle.opacity * 0.7).toString()).replace('0.8', (particle.opacity * 0.7).toString()))
        particleGradient.addColorStop(1, 'transparent')

        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = particle.color.replace('0.9', particle.opacity.toString()).replace('0.8', particle.opacity.toString())
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

      // Draw stars with enhanced glow
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        const currentOpacity = star.opacity * twinkle * star.brightness

        // Enhanced glow
        const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 5)
        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.7})`)
        glowGradient.addColorStop(0.4, `rgba(255, 255, 255, ${currentOpacity * 0.4})`)
        glowGradient.addColorStop(0.7, `rgba(255, 255, 255, ${currentOpacity * 0.2})`)
        glowGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * 5, 0, Math.PI * 2)
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
      const newHeight = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
      const isMobile = window.innerWidth < 768
      const starCount = isMobile ? 300 : 500
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * newHeight,
        radius: Math.random() * 1.5 + 0.4,
        opacity: Math.random() * 0.8 + 0.3,
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
