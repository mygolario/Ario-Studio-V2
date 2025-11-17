'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function LensFlare() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main horizontal lens flare line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 0.6 } : {
          opacity: [0.4, 0.7, 0.4],
          x: ['-10%', '10%', '-10%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Core bright line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent h-full blur-[1px]" />
        
        {/* Wider glow layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent h-[2px] -translate-y-1/2 blur-sm" />
        
        {/* Outer bloom */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent h-[4px] -translate-y-1/2 blur-md" />
        
        {/* Additional color layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/40 to-transparent h-[3px] -translate-y-1/2 blur-lg" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent h-[5px] -translate-y-1/2 blur-xl" />
      </motion.div>

      {/* Vertical accent flares */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-px h-32 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 0.3 } : {
          opacity: [0.2, 0.4, 0.2],
          scaleY: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent blur-sm" />
      </motion.div>

      <motion.div
        className="absolute top-2/3 right-1/4 w-px h-24 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 0.3 } : {
          opacity: [0.2, 0.4, 0.2],
          scaleY: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-transparent blur-sm" />
      </motion.div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 0.1 } : {
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="absolute inset-0 bg-gradient-conic from-primary/20 via-secondary/20 via-accent/20 to-primary/20 blur-3xl" />
      </motion.div>
    </div>
  )
}

