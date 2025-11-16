'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InputProps extends Omit<HTMLMotionProps<'input'>, 'type'> {
  label?: string
  error?: string
  type?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
          </label>
        )}
        <motion.input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 glass rounded-lg',
            'text-white placeholder:text-white/40',
            'border border-white/10 focus:border-neon-blue',
            'focus:outline-none focus:ring-2 focus:ring-neon-blue/50',
            'transition-all duration-300',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends Omit<HTMLMotionProps<'textarea'>, 'children'> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
          </label>
        )}
        <motion.textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-3 glass rounded-lg',
            'text-white placeholder:text-white/40',
            'border border-white/10 focus:border-neon-blue',
            'focus:outline-none focus:ring-2 focus:ring-neon-blue/50',
            'transition-all duration-300 resize-none',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

