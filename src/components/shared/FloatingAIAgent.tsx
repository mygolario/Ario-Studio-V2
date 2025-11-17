'use client'

import { motion } from 'framer-motion'
import { Sparkles, Zap, Brain } from 'lucide-react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface FloatingAIAgentProps {
  position: 'left' | 'right'
  delay?: number
  icon?: 'sparkles' | 'zap' | 'brain'
  color?: 'primary' | 'secondary' | 'accent'
}

const icons = {
  sparkles: Sparkles,
  zap: Zap,
  brain: Brain,
}

const getGradientStyle = (color: 'primary' | 'secondary' | 'accent') => {
  const colors = {
    primary: 'rgba(0, 212, 255, 0.2)',
    secondary: 'rgba(168, 85, 247, 0.2)',
    accent: 'rgba(236, 72, 153, 0.2)',
  }
  return {
    background: `radial-gradient(circle, ${colors[color]} 0%, rgba(0, 0, 0, 0) 70%)`,
  }
}

export default function FloatingAIAgent({
  position,
  delay = 0,
  icon = 'sparkles',
  color = 'primary',
}: FloatingAIAgentProps) {
  const prefersReducedMotion = useReducedMotion()
  const IconComponent = icons[icon]

  const positionClasses = {
    left: 'left-[10%] top-[20%]',
    right: 'right-[10%] top-[30%]',
  }

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} w-20 h-20 md:w-24 md:h-24`}
      initial={{ opacity: 0, scale: 0 }}
      animate={prefersReducedMotion ? {
        opacity: 1,
        scale: 1,
      } : {
        opacity: [0.6, 1, 0.6],
        scale: [0.9, 1.1, 0.9],
        y: [0, -30, 0],
        x: position === 'left' ? [0, 10, 0] : [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full blur-xl" 
        style={getGradientStyle(color)}
      />
      
      {/* Main orb */}
      <div className="relative w-full h-full rounded-full border border-white/10 backdrop-blur-sm bg-gradient-to-br from-white/5 to-transparent">
        {/* Inner glow */}
        <div 
          className="absolute inset-2 rounded-full" 
          style={getGradientStyle(color)}
        />
        
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <IconComponent
            className={`w-8 h-8 md:w-10 md:h-10 ${
              color === 'primary' ? 'text-primary' :
              color === 'secondary' ? 'text-secondary' : 'text-accent'
            }`}
            strokeWidth={1.5}
          />
        </div>

        {/* Animated particles */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className={`absolute top-0 left-1/2 w-1 h-1 rounded-full ${
                color === 'primary' ? 'bg-primary' :
                color === 'secondary' ? 'bg-secondary' : 'bg-accent'
              }`}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: delay + 0.5,
              }}
            />
            <motion.div
              className={`absolute bottom-0 right-1/4 w-1 h-1 rounded-full ${
                color === 'primary' ? 'bg-primary' :
                color === 'secondary' ? 'bg-secondary' : 'bg-accent'
              }`}
              animate={{
                y: [0, 20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: delay + 1,
              }}
            />
          </>
        )}
      </div>
    </motion.div>
  )
}

