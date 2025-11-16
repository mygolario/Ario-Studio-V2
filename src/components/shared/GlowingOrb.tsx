'use client'

import { motion } from 'framer-motion'
import { useMouseParallax } from '@/lib/hooks/useMouseParallax'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface GlowingOrbProps {
  size?: 'sm' | 'md' | 'lg'
  intensity?: number
}

export default function GlowingOrb({ size = 'lg', intensity = 0.15 }: GlowingOrbProps) {
  const { parallaxOffset } = useMouseParallax(intensity)
  const prefersReducedMotion = useReducedMotion()

  const sizes = {
    sm: 'w-48 h-48 md:w-64 md:h-64',
    md: 'w-64 h-64 md:w-96 md:h-96',
    lg: 'w-80 h-80 md:w-[500px] md:h-[500px]',
  }

  return (
    <motion.div
      className={`${sizes[size]} relative`}
      style={{
        x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.8,
        y: prefersReducedMotion ? 0 : parallaxOffset.y * 0.8,
      }}
      animate={prefersReducedMotion ? {} : {
        scale: [1, 1.1, 1],
        rotate: [0, 360],
      }}
      transition={{
        scale: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        rotate: {
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        },
      }}
    >
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 border-2 border-neon-blue/40 rounded-full"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute inset-4 border-2 border-neon-purple/40 rounded-full"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      
      <motion.div
        className="absolute inset-8 border-2 border-neon-pink/40 rounded-full"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Central glowing core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink rounded-full blur-2xl"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-white/30 via-neon-blue/50 to-transparent rounded-full blur-md" />
      
      {/* Particle sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-neon-blue rounded-full"
          style={{
            x: `calc(${Math.cos((i * Math.PI * 2) / 6) * 60}% - 4px)`,
            y: `calc(${Math.sin((i * Math.PI * 2) / 6) * 60}% - 4px)`,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  )
}

