'use client'

import { motion } from 'framer-motion'
import { useMouseParallax } from '@/lib/hooks/useMouseParallax'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface AdvancedGlowingOrbProps {
  size?: 'sm' | 'md' | 'lg'
  intensity?: number
}

export default function AdvancedGlowingOrb({ size = 'lg', intensity = 0.12 }: AdvancedGlowingOrbProps) {
  const { parallaxOffset } = useMouseParallax(intensity)
  const prefersReducedMotion = useReducedMotion()

  const sizes = {
    sm: 'w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64',
    md: 'w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96',
    lg: 'w-64 h-64 sm:w-80 sm:h-80 md:w-[600px] md:h-[600px]',
  }

  return (
    <motion.div
      className={`${sizes[size]} relative`}
      style={{
        x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.7,
        y: prefersReducedMotion ? 0 : parallaxOffset.y * 0.7,
      }}
      animate={prefersReducedMotion ? {} : {
        scale: [1, 1.15, 1],
        rotate: [0, 360],
      }}
      transition={{
        scale: {
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        rotate: {
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        },
      }}
    >
      {/* Outer volumetric glow rings */}
      <motion.div
        className="absolute inset-0 border-2 border-neon-blue/50 rounded-full"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          rotate: [0, -360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))',
        }}
      />
      
      <motion.div
        className="absolute inset-6 border-2 border-neon-purple/50 rounded-full"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.25, 1],
          opacity: [0.5, 0.8, 0.5],
          rotate: [0, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
        style={{
          filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))',
        }}
      />
      
      <motion.div
        className="absolute inset-12 border-2 border-neon-pink/50 rounded-full"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
          rotate: [0, -360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
        style={{
          filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))',
        }}
      />

      {/* Central volumetric glowing core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink rounded-full blur-2xl"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          filter: 'drop-shadow(0 0 40px rgba(0, 212, 255, 0.6))',
        }}
      />

      {/* Inner highlight with bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-white/40 via-neon-blue/60 to-transparent rounded-full blur-lg" />
      
      {/* Animated particle sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-neon-blue rounded-full"
          style={{
            x: `calc(${Math.cos((i * Math.PI * 2) / 8) * 70}% - 4px)`,
            y: `calc(${Math.sin((i * Math.PI * 2) / 8) * 70}% - 4px)`,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [0.3, 1.2, 0.3],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Additional glow layers for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-neon-blue/20 via-neon-purple/10 to-transparent rounded-full"
        animate={prefersReducedMotion ? {} : {
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

