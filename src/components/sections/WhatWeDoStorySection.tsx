'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Code, Bot } from 'lucide-react'
import Container from '@/components/ui/Container'
import { gsap, ScrollTrigger } from '@/lib/gsap-setup'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface StorySection {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<any>
  color: string
  tags: string[]
}

const sections: StorySection[] = [
  {
    id: 'design',
    title: 'Design Intelligent Experiences',
    subtitle: 'Cinematic UX, motion-first storytelling, and expressive UI systems.',
    icon: Sparkles,
    color: 'primary',
    tags: ['Modern UI systems', 'Cinematic scroll', 'Brand language', 'Motion design'],
  },
  {
    id: 'build',
    title: 'Build Advanced Web Systems',
    subtitle: 'Next.js engineering, AI automation, performance-first architecture.',
    icon: Code,
    color: 'secondary',
    tags: ['Next.js stack', 'Performance', 'Auth', 'SEO'],
  },
  {
    id: 'automate',
    title: 'Automate Your Operations',
    subtitle: 'Custom AI agents, workflow automation, integrations, and system intelligence.',
    icon: Bot,
    color: 'accent',
    tags: ['AI agents', 'Workflows', 'Integrations', 'Automation'],
  },
]

const colorClasses = {
  primary: {
    bg: 'from-primary/20 via-primary/10 to-transparent',
    border: 'border-primary/40',
    icon: 'text-primary',
    glow: 'rgba(0, 212, 255, 0.3)',
  },
  secondary: {
    bg: 'from-secondary/20 via-secondary/10 to-transparent',
    border: 'border-secondary/40',
    icon: 'text-secondary',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  accent: {
    bg: 'from-accent/20 via-accent/10 to-transparent',
    border: 'border-accent/40',
    icon: 'text-accent',
    glow: 'rgba(236, 72, 153, 0.3)',
  },
}

export default function WhatWeDoStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const storySections = sectionRef.current.querySelectorAll('.story-section')
    
    storySections.forEach((section, index) => {
      // Initial state - all sections visible but scaled down
      gsap.set(section, {
        opacity: index === 0 ? 1 : 0.3,
        scale: index === 0 ? 1 : 0.8,
        y: index === 0 ? 0 : 50,
      })

        ScrollTrigger.create({
          trigger: section as HTMLElement,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            // Activate this section
            gsap.to(section, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: 'power4.out',
            })

            // Deactivate others
            storySections.forEach((other) => {
              if (other !== section) {
                gsap.to(other, {
                  opacity: 0.2,
                  scale: 0.85,
                  y: 30,
                  duration: 0.8,
                  ease: 'power4.out',
                })
              }
            })
          },
          onLeave: () => {
            gsap.to(section, {
              opacity: 0.2,
              scale: 0.85,
              y: 30,
              duration: 0.8,
              ease: 'power4.out',
            })
          },
          onEnterBack: () => {
            gsap.to(section, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: 'power4.out',
            })
          },
        })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        const element = trigger.trigger as HTMLElement
        if (element?.classList?.contains('story-section')) {
          trigger.kill()
        }
      })
    }
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 lg:py-48 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <div className="space-y-32 md:space-y-40">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            const colors = colorClasses[section.color as keyof typeof colorClasses]

            return (
              <motion.div
                key={section.id}
                className="story-section relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                {/* Floating cinematic card */}
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    className={`
                      relative glass-premium rounded-3xl p-8 md:p-12 lg:p-16
                      border ${colors.border}
                      bg-gradient-to-br ${colors.bg}
                      backdrop-blur-xl
                    `}
                    whileHover={prefersReducedMotion ? {} : {
                      y: -8,
                      rotateX: 3,
                      rotateY: index % 2 === 0 ? -2 : 2,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${colors.bg} opacity-0 blur-2xl`}
                      whileHover={{ opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon/Visual Element */}
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
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-text-primary mb-6 text-center relative z-10">
                      {section.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed text-center mb-8 font-light relative z-10">
                      {section.subtitle}
                    </p>

                    {/* Tag chips */}
                    <div className="flex flex-wrap justify-center gap-3 relative z-10">
                      {section.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: tagIndex * 0.1 }}
                          className="px-4 py-2 rounded-full text-sm md:text-base bg-surface-glass border border-border/30 text-text-secondary font-medium backdrop-blur-sm"
                        >
                          {tag}
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

