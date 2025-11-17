'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Code, Bot, Workflow } from 'lucide-react'
import Container from '@/components/ui/Container'
import { gsap, ScrollTrigger } from '@/lib/gsap-setup'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface Service {
  id: string
  title: string
  tagline: string
  icon: React.ComponentType<any>
  color: 'blue' | 'purple' | 'pink'
  features: string[]
  description: string
}

const services: Service[] = [
  {
    id: 'design',
    title: 'Design Intelligent Experiences',
    tagline: 'Modern UI systems, cinematic scroll, brand language',
    icon: Sparkles,
    color: 'blue',
    features: ['Modern UI systems', 'Cinematic scroll', 'Brand language'],
    description: 'High-end UX, motion design, and branded digital journeys crafted for precision.',
  },
  {
    id: 'build',
    title: 'Advanced Web Systems',
    tagline: 'Next.js stack, performance, auth, SEO',
    icon: Code,
    color: 'purple',
    features: ['Next.js stack', 'Performance', 'Auth', 'SEO'],
    description: 'Next.js, AI-driven automation, and production-ready platforms engineered for scale.',
  },
  {
    id: 'automate',
    title: 'AI Automation & Agents',
    tagline: 'AI agents, workflows, integrations',
    icon: Bot,
    color: 'pink',
    features: ['AI agents', 'Workflows', 'Integrations'],
    description: 'Custom AI agents, workflow integration, and automated systems that save time.',
  },
]

const colorClasses = {
  blue: {
    border: 'border-primary/40',
    bg: 'from-primary/20 via-primary/10 to-transparent',
    glow: 'shadow-neon-blue',
    icon: 'text-primary',
    iconBg: 'bg-primary/20',
  },
  purple: {
    border: 'border-secondary/40',
    bg: 'from-secondary/20 via-secondary/10 to-transparent',
    glow: 'shadow-neon-purple',
    icon: 'text-secondary',
    iconBg: 'bg-secondary/20',
  },
  pink: {
    border: 'border-accent/40',
    bg: 'from-accent/20 via-accent/10 to-transparent',
    glow: 'shadow-neon-pink',
    icon: 'text-accent',
    iconBg: 'bg-accent/20',
  },
}

export default function Service3DPanels() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const panels = sectionRef.current.querySelectorAll('.service-panel')
    
    panels.forEach((panel, index) => {
      gsap.fromTo(
        panel,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotationX: 20,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.15,
        }
      )
    })

    return () => {
      gsap.killTweensOf(panels)
    }
  }, [prefersReducedMotion])

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Dynamic AI galaxy layer background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={prefersReducedMotion ? {} : {
            background: [
              'radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 60%)',
              'radial-gradient(ellipse at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)',
              'radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 60%)',
              'radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 60%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Particles */}
        {!prefersReducedMotion && Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${30 + Math.random() * 50}px`,
              height: `${30 + Math.random() * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 
                ? 'rgba(0, 212, 255, 0.15)' 
                : i % 3 === 1 
                ? 'rgba(168, 85, 247, 0.15)' 
                : 'rgba(236, 72, 153, 0.15)',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
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
            What We Do
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-text-primary leading-tight tracking-tight mb-6">
            Service 3D Panels
          </h2>
        </motion.div>

        {/* 3D Panels - Horizontal row on desktop, stacked on mobile */}
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            const colors = colorClasses[service.color]
            const isActive = activeId === service.id

            return (
              <motion.div
                key={service.id}
                className="service-panel relative group"
                onHoverStart={() => setActiveId(service.id)}
                onHoverEnd={() => setActiveId(null)}
                style={{ perspective: '1000px' }}
              >
                {/* 3D Panel Card */}
                <motion.div
                  className={`
                    relative glass-premium rounded-2xl p-6 md:p-8 h-full
                    border ${colors.border}
                    bg-gradient-to-br ${colors.bg}
                    cursor-pointer overflow-hidden
                    transition-all duration-500
                  `}
                  whileHover={prefersReducedMotion ? {} : {
                    y: -12,
                    rotateX: 5,
                    rotateY: index === 0 ? -3 : index === 2 ? 3 : 0,
                    scale: 1.03,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    boxShadow: isActive 
                      ? `0 30px 80px rgba(0, 0, 0, 0.5), 0 0 60px ${
                          service.color === 'blue' 
                            ? 'rgba(0, 212, 255, 0.3)' 
                            : service.color === 'purple' 
                            ? 'rgba(168, 85, 247, 0.3)' 
                            : 'rgba(236, 72, 153, 0.3)'
                        }`
                      : '0 20px 60px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-0 blur-2xl`}
                    animate={isActive ? { opacity: 0.6 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon in corner */}
                  <div className="relative z-10 mb-6">
                    <motion.div
                      className={`inline-flex p-3 rounded-xl ${colors.iconBg} backdrop-blur-sm`}
                      animate={isActive ? {
                        scale: [1, 1.15, 1],
                        rotate: [0, 10, -10, 0],
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent 
                        className={`w-6 h-6 md:w-8 md:h-8 ${colors.icon}`}
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-3 relative z-10">
                    {service.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-base md:text-lg text-text-secondary mb-6 relative z-10">
                    {service.tagline}
                  </p>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 overflow-hidden"
                      >
                        <p className="text-sm md:text-base text-text-muted mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="px-3 py-1.5 rounded-full text-xs md:text-sm bg-surface-glass border border-border/30 text-text-secondary font-medium"
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Background gradient shift on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-0`}
                    animate={isActive ? { opacity: 0.3 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Border glow on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl border-2 ${colors.border} opacity-0`}
                    animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

