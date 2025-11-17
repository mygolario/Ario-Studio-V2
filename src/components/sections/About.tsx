'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Code, Rocket } from 'lucide-react'
import Container from '@/components/ui/Container'
import { gsap } from '@/lib/gsap-setup'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface Feature {
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
}

const features: Feature[] = [
  {
    title: 'Cinematic Web Experiences',
    description: 'Scroll-based storytelling and interactive narratives',
    icon: Sparkles,
    color: 'primary',
  },
  {
    title: 'AI-Powered Workflows',
    description: 'Intelligent automation and agent systems',
    icon: Zap,
    color: 'secondary',
  },
  {
    title: 'Next.js & Modern Stack',
    description: 'Production-ready, scalable architecture',
    icon: Code,
    color: 'accent',
  },
  {
    title: 'End-to-End Delivery',
    description: 'From concept to launch and beyond',
    icon: Rocket,
    color: 'primary',
  },
]

const colorClasses = {
  primary: {
    border: 'border-primary/30',
    bg: 'from-primary/10 via-primary/5 to-transparent',
    icon: 'text-primary',
    glow: 'shadow-neon-blue',
  },
  secondary: {
    border: 'border-secondary/30',
    bg: 'from-secondary/10 via-secondary/5 to-transparent',
    icon: 'text-secondary',
    glow: 'shadow-neon-purple',
  },
  accent: {
    border: 'border-accent/30',
    bg: 'from-accent/10 via-accent/5 to-transparent',
    icon: 'text-accent',
    glow: 'shadow-neon-pink',
  },
}

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    // Fade in from blur for left side
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current,
        {
          opacity: 0,
          filter: 'blur(20px)',
          y: 30,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    // Stagger animation for right side modules
    if (rightRef.current) {
      const modules = rightRef.current.querySelectorAll('.feature-module')
      
      gsap.fromTo(
        modules,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [prefersReducedMotion])

  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: Main Title + Paragraph */}
          <div ref={leftRef} className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border/50 text-text-muted text-sm font-medium uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                About Ario Studio
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-text-primary leading-tight tracking-tight">
                Design, engineering, and automation in one place.
              </h2>

              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
                Ario Studio is a cinematic web and AI studio. We design, build, and automate interactive experiences for founders, agencies, and product teams who want their digital presence to feel alive — not like another static template.
              </p>
            </motion.div>
          </div>

          {/* Right: Floating Feature Modules */}
          <div ref={rightRef} className="space-y-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              const colors = colorClasses[feature.color as keyof typeof colorClasses]

              return (
                <motion.div
                  key={index}
                  className="feature-module group"
                  whileHover={prefersReducedMotion ? {} : {
                    y: -4,
                    scale: 1.02,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Rounded neon-pill card */}
                  <div className={`
                    relative glass-premium rounded-2xl p-6
                    border ${colors.border}
                    bg-gradient-to-br ${colors.bg}
                    transition-all duration-500
                    group-hover:${colors.glow}
                  `}>
                    {/* Glow on hover */}
                    <motion.div
                      className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-0 blur-xl`}
                      whileHover={{ opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10 flex items-start gap-4">
                      {/* Icon with morphing animation */}
                      <motion.div
                        className={`
                          flex-shrink-0 w-14 h-14 rounded-xl 
                          ${colors.bg} border ${colors.border}
                          flex items-center justify-center
                          backdrop-blur-sm
                        `}
                        whileHover={prefersReducedMotion ? {} : {
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent 
                          className={`w-7 h-7 ${colors.icon}`}
                          strokeWidth={1.5}
                        />
                        {/* Icon glow */}
                        <motion.div
                          className={`absolute inset-0 rounded-xl ${colors.bg} blur-md`}
                          animate={prefersReducedMotion ? {} : {
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.3,
                          }}
                        />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Border glow on hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border-2 ${colors.border} opacity-0`}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
