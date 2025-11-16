'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'relative font-medium transition-all duration-300 rounded-lg overflow-hidden group'
    
    const variants = {
      primary: 'bg-white text-dark hover:bg-white/90 shadow-lg hover:shadow-xl',
      secondary: 'glass border border-white/20 text-white hover:bg-white/5 hover:border-white/30',
      ghost: 'text-white/70 hover:text-white hover:bg-white/5',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ 
          scale: 1.02,
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {/* Subtle hover accent - minimal */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
            initial={false}
          />
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button

