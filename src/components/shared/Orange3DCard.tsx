'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap-setup'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface Orange3DCardProps {
  children?: React.ReactNode
}

export default function Orange3DCard({ children }: Orange3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  })

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const mouseX = (e.clientX - centerX) / (rect.width / 2)
      const mouseY = (e.clientY - centerY) / (rect.height / 2)
      
      x.set(mouseX)
      y.set(mouseY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
      setIsHovered(false)
    }

    const card = cardRef.current
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    card.addEventListener('mouseenter', () => setIsHovered(true))

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [x, y, prefersReducedMotion])

  // Parallax on scroll
  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return

    gsap.to(cardRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => {
      gsap.killTweensOf(cardRef.current)
    }
  }, [prefersReducedMotion])

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-2xl mx-auto perspective-1000"
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Card */}
      <motion.div
        className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-orange-500/90 via-orange-600/80 to-amber-600/90 backdrop-blur-sm"
        style={{
          boxShadow: isHovered
            ? '0 30px 80px rgba(251, 146, 60, 0.4), 0 0 0 1px rgba(251, 146, 60, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 20px 60px rgba(251, 146, 60, 0.3), 0 0 0 1px rgba(251, 146, 60, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          transform: 'translateZ(0)',
        }}
        animate={isHovered ? {
          scale: 1.02,
        } : {
          scale: 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Inner shadow for 3D depth */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
        
        {/* Surface texture - tiny dots */}
        <div className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {children || (
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                AI Studio
              </h3>
              <p className="text-lg text-white/90">
                Build teams of AI agents that work together seamlessly
              </p>
            </div>
          )}
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-400/20 to-amber-500/20 blur-2xl -z-10"
          animate={isHovered ? {
            opacity: 0.6,
            scale: 1.1,
          } : {
            opacity: 0.3,
            scale: 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

