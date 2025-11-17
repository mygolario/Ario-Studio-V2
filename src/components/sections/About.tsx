'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Code, Rocket } from 'lucide-react'
import Container from '@/components/ui/Container'
import { gsap, ScrollTrigger } from '@/lib/gsap-setup'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface Module {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
}

const modules: Module[] = [
  {
    id: 'cinematic',
    title: 'Cinematic Web Experiences',
    description: 'Scroll-based narratives, alive interfaces, and emotional motion design.',
    icon: Sparkles,
    color: 'primary',
  },
  {
    id: 'ai',
    title: 'AI-Powered Workflows',
    description: 'Intelligent agent systems that automate your operations.',
    icon: Zap,
    color: 'secondary',
  },
  {
    id: 'stack',
    title: 'Next.js & Modern Stack',
    description: 'Production-ready engineering for scale and performance.',
    icon: Code,
    color: 'accent',
  },
  {
    id: 'delivery',
    title: 'End-to-End Delivery',
    description: 'From concept to launch — with ongoing optimization.',
    icon: Rocket,
    color: 'primary',
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

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    // Fade in left side from blur
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current,
        {
          opacity: 0,
          filter: 'blur(20px)',
          x: -50,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          x: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    // Animate modules one at a time
    if (sectionRef.current) {
      const moduleElements = sectionRef.current.querySelectorAll('.about-module')
      
      moduleElements.forEach((module, index) => {
        gsap.fromTo(
          module,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
            rotateX: 20,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: module,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        )

        // Rotate and glow on scroll
        const moduleElement = module as HTMLElement
        ScrollTrigger.create({
          trigger: moduleElement,
          start: 'top 70%',
          end: 'top 30%',
          onEnter: () => {
            gsap.to(moduleElement, {
              rotateY: 5,
              scale: 1.02,
              duration: 0.5,
              ease: 'power2.out',
            })
          },
          onLeave: () => {
            gsap.to(moduleElement, {
              rotateY: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
            })
          },
        })
      })
    }
  }, [prefersReducedMotion])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: Large title + cinematic paragraph */}
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

          {/* Right: Animated floating modules */}
          <div className="space-y-6">
            {modules.map((module, index) => {
              const IconComponent = module.icon
              const colors = colorClasses[module.color as keyof typeof colorClasses]

              return (
                <motion.div
                  key={module.id}
                  className="about-module group"
                  data-glow={colors.glow}
                  whileHover={prefersReducedMotion ? {} : {
                    y: -4,
                    scale: 1.02,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Glowing pill/card */}
                  <div className={`
                    relative glass-premium rounded-2xl p-6
                    border ${colors.border}
                    bg-gradient-to-br ${colors.bg}
                    backdrop-blur-xl
                    transition-all duration-500
                  `}>
                    {/* Glow on hover */}
                    <motion.div
                      className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-0 blur-xl`}
                      whileHover={{ opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10 flex items-start gap-4">
                      {/* Icon */}
                      <motion.div
                        className={`
                          flex-shrink-0 w-14 h-14 rounded-xl
                          ${colors.bg} border ${colors.border}
                          flex items-center justify-center
                          backdrop-blur-sm
                        `}
                        animate={prefersReducedMotion ? {} : {
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.4,
                        }}
                      >
                        <IconComponent 
                          className={`w-7 h-7 ${colors.icon}`}
                          strokeWidth={1.5}
                        />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-2">
                          {module.title}
                        </h3>
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                          {module.description}
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
