'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Zap } from 'lucide-react'
import Container from '@/components/ui/Container'
import AnimatedGradientBlob from '@/components/shared/AnimatedGradientBlob'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface BulletPoint {
  text: string
  icon?: 'check' | 'spark' | 'zap'
}

interface ServiceSectionProps {
  headline: string
  subhead: string
  bullets: BulletPoint[]
  gradientColor: 'blue' | 'purple' | 'pink'
  index: number
}

const iconMap = {
  check: Check,
  spark: Sparkles,
  zap: Zap,
}

export default function ServiceSection({
  headline,
  subhead,
  bullets,
  gradientColor,
  index,
}: ServiceSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const rightVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.section
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 items-center">
          {/* Left Column: Content */}
          <motion.div
            className="space-y-10 md:space-y-12"
            variants={itemVariants}
          >
            {/* Headline */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.1] tracking-[-0.02em]"
              variants={itemVariants}
            >
              {headline}
            </motion.h2>

            {/* Subhead */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-white/50 leading-relaxed max-w-2xl font-light"
              variants={itemVariants}
            >
              {subhead}
            </motion.p>

            {/* Bullet Points */}
            <motion.div
              className="space-y-5 md:space-y-6 pt-4"
              variants={itemVariants}
            >
              {bullets.map((bullet, bulletIndex) => {
                const IconComponent = bullet.icon ? iconMap[bullet.icon] : Check
                return (
                  <motion.div
                    key={bulletIndex}
                    className="flex items-start gap-4"
                    variants={itemVariants}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: bulletIndex * 0.1 }}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <IconComponent
                        className={`w-5 h-5 md:w-6 md:h-6 ${
                          gradientColor === 'blue'
                            ? 'text-neon-blue'
                            : gradientColor === 'purple'
                            ? 'text-neon-purple'
                            : 'text-neon-pink'
                        }`}
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                      {bullet.text}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Animated Gradient Blob */}
          <motion.div
            className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
            variants={rightVariants}
            style={{
              x: prefersReducedMotion ? 0 : undefined,
            }}
          >
            <AnimatedGradientBlob color={gradientColor} size="lg" />
            
            {/* Subtle parallax effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={prefersReducedMotion ? {} : {
                y: [0, -30, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.5,
              }}
            />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  )
}

