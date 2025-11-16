'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: 'blue' | 'purple' | 'pink' | 'none'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glow = 'blue', children, ...props }, ref) => {
    const glowClasses = {
      blue: 'hover:shadow-neon-blue',
      purple: 'hover:shadow-neon-purple',
      pink: 'hover:shadow-neon-pink',
      none: '',
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass rounded-xl p-6 transition-all duration-300',
          hover && 'cursor-pointer',
          hover && glowClasses[glow],
          className
        )}
        whileHover={hover ? { 
          scale: 1.02,
          y: -4,
          rotateX: 2,
          rotateY: 2,
        } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card

