'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface AnimatedGradientBlobProps {
  color?: 'blue' | 'purple' | 'pink'
  size?: 'sm' | 'md' | 'lg'
}

export default function AnimatedGradientBlob({ 
  color = 'blue', 
  size = 'lg' 
}: AnimatedGradientBlobProps) {
  const prefersReducedMotion = useReducedMotion()

  const colorClasses = {
    blue: {
      from: 'rgba(0, 212, 255, 0.2)',
      via: 'rgba(6, 182, 212, 0.15)',
      to: 'transparent',
    },
    purple: {
      from: 'rgba(168, 85, 247, 0.2)',
      via: 'rgba(236, 72, 153, 0.15)',
      to: 'transparent',
    },
    pink: {
      from: 'rgba(236, 72, 153, 0.2)',
      via: 'rgba(168, 85, 247, 0.15)',
      to: 'transparent',
    },
  }

  const sizes = {
    sm: 'w-64 h-64 md:w-80 md:h-80',
    md: 'w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]',
    lg: 'w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]',
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Main gradient blob */}
      <motion.div
        className={`absolute ${sizes[size]} rounded-full blur-3xl`}
        style={{
          background: `radial-gradient(circle, ${colorClasses[color].from} 0%, ${colorClasses[color].via} 50%, ${colorClasses[color].to} 100%)`,
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary blob for depth */}
      <motion.div
        className={`absolute ${sizes[size]} rounded-full blur-2xl`}
        style={{
          background: `radial-gradient(circle, ${colorClasses[color].from} 0%, ${colorClasses[color].via} 50%, ${colorClasses[color].to} 100%)`,
          opacity: 0.4,
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -20, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Mesh pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        animate={prefersReducedMotion ? {} : {
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

