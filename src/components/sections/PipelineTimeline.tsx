'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Palette, Code, Rocket } from 'lucide-react'
import Container from '@/components/ui/Container'
import { gsap, ScrollTrigger } from '@/lib/gsap-setup'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface Step {
  number: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'We explore your vision, goals, and target audience to understand what makes your brand unique.',
    icon: Search,
    color: 'primary',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Cinematic interfaces and motion design that tell your story through scroll-based narratives.',
    icon: Palette,
    color: 'secondary',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Production-ready Next.js applications with AI automation, optimized for performance and scale.',
    icon: Code,
    color: 'accent',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Deploy, iterate, and grow. We support you through launch and beyond with ongoing optimization.',
    icon: Rocket,
    color: 'primary',
  },
]

const colorClasses = {
  primary: {
    bg: 'bg-primary/20',
    border: 'border-primary/50',
    text: 'text-primary',
    glow: 'shadow-neon-blue',
  },
  secondary: {
    bg: 'bg-secondary/20',
    border: 'border-secondary/50',
    text: 'text-secondary',
    glow: 'shadow-neon-purple',
  },
  accent: {
    bg: 'bg-accent/20',
    border: 'border-accent/50',
    text: 'text-accent',
    glow: 'shadow-neon-pink',
  },
}

export default function PipelineTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })

  useEffect(() => {
    if (prefersReducedMotion || !timelineRef.current) return

    const steps = timelineRef.current.querySelectorAll('.timeline-step')
    
    steps.forEach((step, index) => {
      gsap.fromTo(
        step,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Pulse animation on scroll
      const bubble = step.querySelector('.step-bubble') as HTMLElement
      if (bubble) {
        gsap.to(bubble, {
          scale: 1.2,
          duration: 0.3,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          scrollTrigger: {
            trigger: step,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const element = trigger.trigger as HTMLElement
        if (element?.classList?.contains('timeline-step')) {
          trigger.kill()
        }
      })
    }
  }, [prefersReducedMotion])

  // Progress line animation
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section 
      id="process" 
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border/50 text-text-muted text-sm font-medium uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Our way of working
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-text-primary leading-tight tracking-tight mb-6">
            The Ario Studio Pipeline
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto font-light">
            A streamlined process that transforms your vision into an interactive, AI-powered experience.
          </p>
        </motion.div>

        {/* Timeline - Horizontal on desktop, vertical on mobile */}
        <div className="relative" ref={timelineRef}>
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border/30 -translate-y-1/2">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Vertical line for mobile */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-border/30">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-secondary to-accent"
              style={{ height: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const colors = colorClasses[step.color as keyof typeof colorClasses]

              return (
                <motion.div
                  key={index}
                  className="timeline-step relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Step Bubble */}
                  <motion.div
                    className="step-bubble relative z-10 mb-6 flex items-center justify-center"
                    whileHover={prefersReducedMotion ? {} : {
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Outer glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-full ${colors.bg} blur-xl`}
                      animate={prefersReducedMotion ? {} : {
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.3,
                      }}
                    />

                    {/* Main bubble */}
                    <div className={`
                      relative w-20 h-20 md:w-24 md:h-24 rounded-full 
                      glass-premium border-2 ${colors.border}
                      flex items-center justify-center
                      ${colors.glow}
                    `}>
                      <IconComponent 
                        className={`w-10 h-10 md:w-12 md:h-12 ${colors.text}`}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Pulse ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-full border-2 ${colors.border}`}
                      animate={prefersReducedMotion ? {} : {
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                        delay: index * 0.3,
                      }}
                    />
                  </motion.div>

                  {/* Step Number */}
                  <div className="text-5xl md:text-6xl font-display font-bold text-text-primary/10 mb-4">
                    {step.number}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed font-light">
                    {step.description}
                  </p>

                  {/* Tooltip Card on Hover */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 glass-premium rounded-xl p-4 border border-border/50 opacity-0 pointer-events-none z-20"
                    whileHover={prefersReducedMotion ? {} : {
                      opacity: 1,
                      y: -10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-sm text-text-muted">
                      {step.description}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

