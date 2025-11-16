'use client'

import { motion } from 'framer-motion'
import { useMouseParallax } from '@/lib/hooks/useMouseParallax'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface MinimalHeroVisualProps {
  intensity?: number
}

export default function MinimalHeroVisual({ intensity = 0.05 }: MinimalHeroVisualProps) {
  const { parallaxOffset } = useMouseParallax(intensity)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="absolute top-1/2 right-0 md:right-10 lg:right-20 -translate-y-1/2 pointer-events-none z-0"
      style={{
        x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.3,
        y: prefersReducedMotion ? 0 : parallaxOffset.y * 0.3,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Sleek minimal chip/panel design */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        {/* Outer subtle ring - pushed behind */}
        <motion.div
          className="absolute inset-0 border border-white/10 rounded-2xl"
          animate={prefersReducedMotion ? {} : {
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Inner panel with soft gradient */}
        <motion.div
          className="absolute inset-4 glass-premium rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
          }}
        >
          {/* Subtle AI accent line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent"
            animate={prefersReducedMotion ? {} : {
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Minimal corner accent */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-neon-blue/40 rounded-full blur-sm" />
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-neon-purple/30 rounded-full blur-sm" />
        </motion.div>

        {/* Subtle glow behind - very minimal */}
        <motion.div
          className="absolute inset-0 bg-neon-blue/5 rounded-2xl blur-2xl -z-10"
          animate={prefersReducedMotion ? {} : {
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  )
}

