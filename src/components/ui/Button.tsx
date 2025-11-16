'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'relative font-medium transition-all duration-300 rounded-lg overflow-hidden group'
    
    const variants = {
      primary: 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon-blue hover:shadow-glow-lg',
      secondary: 'glass border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:border-neon-cyan',
      ghost: 'text-white/80 hover:text-white hover:bg-glass-light',
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button

