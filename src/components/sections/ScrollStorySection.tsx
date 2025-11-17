'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Code, Bot } from 'lucide-react'
import Container from '@/components/ui/Container'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface StoryBlock {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<any>
  color: string
  features: string[]
}

const blocks: StoryBlock[] = [
  {
    id: 'design',
    title: 'We Design Intelligent Experiences',
    subtitle: 'Cinematic UX, motion-first storytelling, and expressive UI systems.',
    icon: Sparkles,
    color: 'primary',
    features: ['Modern UI systems', 'Cinematic scroll', 'Brand language', 'Motion design'],
  },
  {
    id: 'build',
    title: 'We Build Advanced Web Systems',
    subtitle: 'Next.js engineering, AI automation, performance-first architecture.',
    icon: Code,
    color: 'secondary',
    features: ['Next.js stack', 'Performance', 'Auth', 'SEO'],
  },
  {
    id: 'automate',
    title: 'We Automate Your Operations',
    subtitle: 'Custom AI agents, workflow automation, integrations, and system intelligence.',
    icon: Bot,
    color: 'accent',
    features: ['AI agents', 'Workflows', 'Integrations', 'Automation'],
  },
]

const colorClasses = {
  primary: {
    border: 'border-primary/40',
    bg: 'from-primary/20 via-primary/10 to-transparent',
    icon: 'text-primary',
    glow: 'rgba(0, 212, 255, 0.3)',
  },
  secondary: {
    border: 'border-secondary/40',
    bg: 'from-secondary/20 via-secondary/10 to-transparent',
    icon: 'text-secondary',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  accent: {
    border: 'border-accent/40',
    bg: 'from-accent/20 via-accent/10 to-transparent',
    icon: 'text-accent',
    glow: 'rgba(236, 72, 153, 0.3)',
  },
}

export default function ScrollStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 lg:py-48">
      <Container size="xl" className="relative z-10">
        <div className="space-y-32 md:space-y-40 lg:space-y-48">
          {blocks.map((block, index) => {
            const IconComponent = block.icon
            const colors = colorClasses[block.color as keyof typeof colorClasses]
            
            // Calculate opacity and scale based on scroll position
            const blockProgress = useTransform(
              scrollYProgress,
              [
                (index - 0.5) / blocks.length,
                index / blocks.length,
                (index + 0.5) / blocks.length,
              ],
              [0.3, 1, 0.3]
            )
            
            const blockScale = useTransform(
              scrollYProgress,
              [
                (index - 0.5) / blocks.length,
                index / blocks.length,
                (index + 0.5) / blocks.length,
              ],
              [0.9, 1, 0.9]
            )
            
            const blockY = useTransform(
              scrollYProgress,
              [
                (index - 0.5) / blocks.length,
                index / blocks.length,
                (index + 0.5) / blocks.length,
              ],
              [50, 0, -50]
            )

            return (
              <motion.div
                key={block.id}
                className="relative"
                style={{
                  opacity: prefersReducedMotion ? 1 : blockProgress,
                  scale: prefersReducedMotion ? 1 : blockScale,
                  y: prefersReducedMotion ? 0 : blockY,
                }}
              >
                <div className="max-w-4xl mx-auto px-4">
                  {/* Floating glass/neon card */}
                  <motion.div
                    className={`
                      relative glass-premium rounded-3xl p-8 md:p-12 lg:p-16
                      border ${colors.border}
                      bg-gradient-to-br ${colors.bg}
                      backdrop-blur-xl
                    `}
                    whileHover={prefersReducedMotion ? {} : {
                      y: -8,
                      scale: 1.02,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${colors.bg} opacity-0 blur-2xl`}
                      whileHover={{ opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 mb-8 flex justify-center">
                      <motion.div
                        className={`
                          w-20 h-20 md:w-24 md:h-24 rounded-2xl
                          ${colors.bg} border ${colors.border}
                          flex items-center justify-center
                          backdrop-blur-sm
                        `}
                        animate={prefersReducedMotion ? {} : {
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.5,
                        }}
                      >
                        <IconComponent 
                          className={`w-10 h-10 md:w-12 md:h-12 ${colors.icon}`}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-semibold text-text-primary mb-6 text-center relative z-10">
                      {block.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed text-center mb-8 font-light relative z-10">
                      {block.subtitle}
                    </p>

                    {/* Feature chips */}
                    <div className="flex flex-wrap justify-center gap-3 relative z-10">
                      {block.features.map((feature, featureIndex) => (
                        <motion.span
                          key={featureIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="px-4 py-2 rounded-full text-sm md:text-base bg-surface-glass border border-border/30 text-text-secondary font-medium backdrop-blur-sm"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    {/* Border glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-3xl border-2 ${colors.border} opacity-0`}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
