'use client'

import { forwardRef, useState } from 'react'
import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  hover?: boolean
  glow?: 'blue' | 'purple' | 'pink' | 'none'
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glow = 'blue', children, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false)
    
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    
    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hover) return
      
      const rect = e.currentTarget.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const xPct = mouseX / width - 0.5
      const yPct = mouseY / height - 0.5
      
      x.set(xPct)
      y.set(yPct)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
      setIsHovered(false)
    }

    const glowClasses = {
      blue: 'hover:shadow-neon-blue-lg',
      purple: 'hover:shadow-neon-purple-lg',
      pink: 'hover:shadow-neon-pink-lg',
      none: '',
    }

    const borderGlowClasses = {
      blue: 'border-neon-blue/30',
      purple: 'border-neon-purple/30',
      pink: 'border-neon-pink/30',
      none: 'border-white/10',
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass-premium rounded-glass-xl p-6 md:p-8 relative overflow-hidden',
          'transition-all duration-500',
          hover && 'cursor-pointer',
          hover && glowClasses[glow],
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: hover ? rotateX : 0,
          rotateY: hover ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileHover={hover ? {
          scale: 1.03,
          z: 50,
        } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        {...props}
      >
        {/* Deep gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${glow === 'blue' ? 'from-neon-blue/10 via-neon-purple/5 to-transparent' : glow === 'purple' ? 'from-neon-purple/10 via-neon-pink/5 to-transparent' : glow === 'pink' ? 'from-neon-pink/10 via-neon-purple/5 to-transparent' : 'from-white/5 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Glowing border with rim light */}
        <motion.div
          className={`absolute inset-0 rounded-glass-xl border-2 ${borderGlowClasses[glow]} pointer-events-none`}
          animate={isHovered ? {
            opacity: [0.3, 0.6, 0.3],
          } : {
            opacity: 0.2,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Inner shadow for depth */}
        <div className="absolute inset-0 rounded-glass-xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />

        {/* Content with 3D transform */}
        <div style={{ transform: 'translateZ(50px)' }} className="relative z-10">
          {children}
        </div>

        {/* Hover glow bloom effect */}
        {hover && (
          <motion.div
            className={`absolute -inset-4 rounded-glass-xl blur-2xl opacity-0 pointer-events-none ${glow === 'blue' ? 'bg-neon-blue/20' : glow === 'purple' ? 'bg-neon-purple/20' : glow === 'pink' ? 'bg-neon-pink/20' : 'bg-white/10'}`}
            animate={isHovered ? {
              opacity: [0, 0.6, 0],
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card
