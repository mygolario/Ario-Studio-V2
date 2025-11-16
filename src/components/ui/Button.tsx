'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'relative font-medium transition-all duration-300 rounded-xl overflow-hidden group'
    
    const variants = {
      primary: 'bg-primary text-background hover:bg-primary-light shadow-glow-accent hover:shadow-glow-accent-lg',
      secondary: 'glass border border-border text-text-primary hover:bg-surface-glass hover:border-border-light',
      ghost: 'text-text-muted hover:text-text-primary hover:bg-surface-glass',
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
        {/* Hover glow effect for primary */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            initial={false}
          />
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
