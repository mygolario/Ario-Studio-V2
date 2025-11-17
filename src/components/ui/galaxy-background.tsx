'use client'

import { useEffect, useRef } from 'react'

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const starsRef = useRef<Star[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const nebulaCloudsRef = useRef<NebulaCloud[]>([])
  const glowingOrbsRef = useRef<GlowingOrb[]>([])

  interface Star {
    x: number
    y: number
    radius: number
    opacity: number
    twinkleSpeed: number
    twinkleOffset: number
    brightness: number
    trail: { x: number; y: number; opacity: number }[]
  }

  interface ShootingStar {
    x: number
    y: number
    vx: number
    vy: number
    length: number
    opacity: number
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

  interface GlowingOrb {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    color: string
    side: 'left' | 'right'
    pulseSpeed: number
    pulseOffset: number
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('scroll', resizeCanvas)

    // Create stars with trails
    const starCount = 500
    const initialHeight = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * initialHeight,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.9 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
      brightness: Math.random() * 0.5 + 0.5,
      trail: [],
    }))

    // Create shooting stars
    shootingStarsRef.current = []

    // Create nebula clouds from sides
    const nebulaColors = [
      'rgba(168, 85, 247, 0.15)', // purple
      'rgba(0, 212, 255, 0.12)', // cyan
      'rgba(236, 72, 153, 0.15)', // pink
      'rgba(14, 165, 233, 0.12)', // blue
    ]
    nebulaCloudsRef.current = Array.from({ length: 8 }, (_, i) => {
      const side = i % 2 === 0 ? 'left' : 'right'
      return {
        x: side === 'left' ? -200 : canvas.width + 200,
        y: Math.random() * initialHeight,
        vx: side === 'left' ? Math.random() * 0.3 + 0.1 : -(Math.random() * 0.3 + 0.1),
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 300 + 200,
        opacity: Math.random() * 0.2 + 0.1,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        side,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      }
    })

    // Create glowing orbs from sides
    const orbColors = [
      'rgba(168, 85, 247, 0.6)', // purple
      'rgba(0, 212, 255, 0.5)', // cyan
      'rgba(236, 72, 153, 0.6)', // pink
      'rgba(14, 165, 233, 0.5)', // blue
    ]
    glowingOrbsRef.current = Array.from({ length: 12 }, (_, i) => {
      const side = i % 2 === 0 ? 'left' : 'right'
      return {
        x: side === 'left' ? -100 : canvas.width + 100,
        y: Math.random() * initialHeight,
        vx: side === 'left' ? Math.random() * 0.8 + 0.3 : -(Math.random() * 0.8 + 0.3),
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 60 + 40,
        opacity: Math.random() * 0.4 + 0.2,
        color: orbColors[Math.floor(Math.random() * orbColors.length)],
        side,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      }
    })

    let time = 0
    let lastShootingStarTime = 0

    const animate = () => {
      const currentHeight = Math.max(window.innerHeight * 3, document.documentElement.scrollHeight || window.innerHeight * 3)
      if (canvas.height < currentHeight) {
        canvas.height = currentHeight
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw deep space nebula gradients
      const viewportHeight = window.innerHeight
      for (let i = 0; i < Math.ceil(canvas.height / viewportHeight); i++) {
        const yOffset = i * viewportHeight

        // Multiple layered nebula gradients for depth
        const gradient1 = ctx.createRadialGradient(
          canvas.width * 0.15,
          yOffset + (viewportHeight * 0.25),
          0,
          canvas.width * 0.15,
          yOffset + (viewportHeight * 0.25),
          canvas.width * 1.2
        )
        gradient1.addColorStop(0, 'rgba(168, 85, 247, 0.12)')
        gradient1.addColorStop(0.3, 'rgba(0, 212, 255, 0.08)')
        gradient1.addColorStop(0.6, 'rgba(236, 72, 153, 0.05)')
        gradient1.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient1
        ctx.fillRect(0, yOffset, canvas.width, viewportHeight)

        const gradient2 = ctx.createRadialGradient(
          canvas.width * 0.85,
          yOffset + (viewportHeight * 0.75),
          0,
          canvas.width * 0.85,
          yOffset + (viewportHeight * 0.75),
          canvas.width * 1.2
        )
        gradient2.addColorStop(0, 'rgba(236, 72, 153, 0.12)')
        gradient2.addColorStop(0.3, 'rgba(14, 165, 233, 0.08)')
        gradient2.addColorStop(0.6, 'rgba(168, 85, 247, 0.05)')
        gradient2.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient2
        ctx.fillRect(0, yOffset, canvas.width, viewportHeight)
      }

      // Draw and update nebula clouds
      nebulaCloudsRef.current.forEach((cloud) => {
        cloud.x += cloud.vx
        cloud.y += cloud.vy
        cloud.rotation += cloud.rotationSpeed

        const currentDocHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight)
        if (cloud.side === 'left' && cloud.x > canvas.width + 300) {
          cloud.x = -300
          cloud.y = Math.random() * currentDocHeight
        } else if (cloud.side === 'right' && cloud.x < -300) {
          cloud.x = canvas.width + 300
          cloud.y = Math.random() * currentDocHeight
        }

        if (cloud.y < -300) cloud.y = currentDocHeight + 300
        if (cloud.y > currentDocHeight + 300) cloud.y = -300

        // Draw nebula cloud with rotation
        ctx.save()
        ctx.translate(cloud.x, cloud.y)
        ctx.rotate(cloud.rotation)
        
        const cloudGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, cloud.size)
        cloudGradient.addColorStop(0, cloud.color.replace('0.15', cloud.opacity.toString()).replace('0.12', cloud.opacity.toString()))
        cloudGradient.addColorStop(0.5, cloud.color.replace('0.15', (cloud.opacity * 0.6).toString()).replace('0.12', (cloud.opacity * 0.6).toString()))
        cloudGradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = cloudGradient
        ctx.beginPath()
        ctx.ellipse(0, 0, cloud.size, cloud.size * 0.6, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw and update glowing orbs
      glowingOrbsRef.current.forEach((orb) => {
        orb.x += orb.vx
        orb.y += orb.vy

        const pulse = Math.sin(time * orb.pulseSpeed + orb.pulseOffset) * 0.3 + 0.7
        const currentSize = orb.size * pulse
        const currentOpacity = orb.opacity * pulse

        const currentDocHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight)
        if (orb.side === 'left' && orb.x > canvas.width + 150) {
          orb.x = -150
          orb.y = Math.random() * currentDocHeight
        } else if (orb.side === 'right' && orb.x < -150) {
          orb.x = canvas.width + 150
          orb.y = Math.random() * currentDocHeight
        }

        if (orb.y < -150) orb.y = currentDocHeight + 150
        if (orb.y > currentDocHeight + 150) orb.y = -150

        // Draw orb with multiple glow layers
        const orbGradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentSize)
        orbGradient.addColorStop(0, orb.color.replace('0.6', currentOpacity.toString()).replace('0.5', currentOpacity.toString()))
        orbGradient.addColorStop(0.3, orb.color.replace('0.6', (currentOpacity * 0.7).toString()).replace('0.5', (currentOpacity * 0.7).toString()))
        orbGradient.addColorStop(0.6, orb.color.replace('0.6', (currentOpacity * 0.4).toString()).replace('0.5', (currentOpacity * 0.4).toString()))
        orbGradient.addColorStop(1, 'transparent')

        ctx.fillStyle = orbGradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, currentSize, 0, Math.PI * 2)
        ctx.fill()

        // Outer glow
        const outerGlow = ctx.createRadialGradient(orb.x, orb.y, currentSize * 0.8, orb.x, orb.y, currentSize * 2)
        outerGlow.addColorStop(0, orb.color.replace('0.6', (currentOpacity * 0.3).toString()).replace('0.5', (currentOpacity * 0.3).toString()))
        outerGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = outerGlow
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, currentSize * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw and update stars with trails
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        const currentOpacity = star.opacity * twinkle * star.brightness

        // Update trail
        star.trail.push({ x: star.x, y: star.y, opacity: currentOpacity })
        if (star.trail.length > 5) {
          star.trail.shift()
        }

        // Draw trail
        star.trail.forEach((point, index) => {
          const trailOpacity = (point.opacity * (index / star.trail.length)) * 0.3
          ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`
          ctx.beginPath()
          ctx.arc(point.x, point.y, star.radius * 0.5, 0, Math.PI * 2)
          ctx.fill()
        })

        // Star outer glow
        const outerGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 6)
        outerGlow.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.4})`)
        outerGlow.addColorStop(0.3, `rgba(255, 255, 255, ${currentOpacity * 0.2})`)
        outerGlow.addColorStop(0.6, `rgba(255, 255, 255, ${currentOpacity * 0.1})`)
        outerGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = outerGlow
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * 6, 0, Math.PI * 2)
        ctx.fill()

        // Star inner glow
        const innerGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3)
        innerGlow.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.8})`)
        innerGlow.addColorStop(0.5, `rgba(255, 255, 255, ${currentOpacity * 0.4})`)
        innerGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = innerGlow
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2)
        ctx.fill()

        // Star core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Create and update shooting stars
      if (time - lastShootingStarTime > 3 + Math.random() * 5) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: -50,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 3 + 2,
          length: Math.random() * 50 + 30,
          opacity: 1,
          life: 0,
          maxLife: 60,
        })
        lastShootingStarTime = time
      }

      shootingStarsRef.current = shootingStarsRef.current.filter((shootingStar) => {
        shootingStar.x += shootingStar.vx
        shootingStar.y += shootingStar.vy
        shootingStar.life++
        shootingStar.opacity = 1 - (shootingStar.life / shootingStar.maxLife)

        if (shootingStar.life >= shootingStar.maxLife || shootingStar.y > canvas.height + 50) {
          return false
        }

        // Draw shooting star with trail
        const gradient = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.vx * shootingStar.length,
          shootingStar.y - shootingStar.vy * shootingStar.length
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`)
        gradient.addColorStop(0.5, `rgba(0, 212, 255, ${shootingStar.opacity * 0.8})`)
        gradient.addColorStop(1, 'transparent')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(shootingStar.x, shootingStar.y)
        ctx.lineTo(
          shootingStar.x - shootingStar.vx * shootingStar.length,
          shootingStar.y - shootingStar.vy * shootingStar.length
        )
        ctx.stroke()

        // Glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(0, 212, 255, ${shootingStar.opacity})`
        ctx.stroke()
        ctx.shadowBlur = 0

        return true
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
          height: '100%',
        }}
      />
    </div>
  )
}
