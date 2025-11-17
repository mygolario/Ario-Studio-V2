'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Code, 
  Bot, 
  Zap,
  Layers,
  Cpu,
  Workflow,
  Rocket
} from 'lucide-react'
import Container from '@/components/ui/Container'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface Capsule {
  id: string
  title: string
  caption: string
  icon: React.ComponentType<any>
  color: 'primary' | 'secondary' | 'accent' | 'cyan'
  details: string
  features: string[]
}

const capsules: Capsule[] = [
  {
    id: '1',
    title: 'Cinematic UX Systems',
    caption: 'Scroll-based storytelling and interactive narratives',
    icon: Sparkles,
    color: 'primary',
    details: 'We design immersive, motion-first interfaces that tell your brand story through cinematic scroll experiences.',
    features: ['Scroll-based narratives', 'Motion design', 'Interactive storytelling', 'Visual systems'],
  },
  {
    id: '2',
    title: 'Next.js Engineering',
    caption: 'Production-ready, scalable architecture',
    icon: Code,
    color: 'secondary',
    details: 'Built on Next.js with TypeScript, optimized for performance, SEO, and scale.',
    features: ['Next.js 14+', 'TypeScript', 'Performance optimization', 'SEO-first'],
  },
  {
    id: '3',
    title: 'AI Automation & Agents',
    caption: 'Intelligent workflows and agent systems',
    icon: Bot,
    color: 'accent',
    details: 'Custom AI agents and automation workflows that enhance productivity and user experience.',
    features: ['AI Agents', 'Workflow automation', 'Custom integrations', 'Process optimization'],
  },
  {
    id: '4',
    title: 'Workflow Integrations',
    caption: 'Seamless connections across your stack',
    icon: Workflow,
    color: 'cyan',
    details: 'Integrate with your existing tools and workflows for a unified experience.',
    features: ['API integrations', 'Third-party tools', 'Custom connectors', 'Data sync'],
  },
]

const colorClasses = {
  primary: {
    border: 'border-primary/30',
    glow: 'shadow-neon-blue',
    bg: 'from-primary/10 via-primary/5 to-transparent',
    icon: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  secondary: {
    border: 'border-secondary/30',
    glow: 'shadow-neon-purple',
    bg: 'from-secondary/10 via-secondary/5 to-transparent',
    icon: 'text-secondary',
    iconBg: 'bg-secondary/10',
  },
  accent: {
    border: 'border-accent/30',
    glow: 'shadow-neon-pink',
    bg: 'from-accent/10 via-accent/5 to-transparent',
    icon: 'text-accent',
    iconBg: 'bg-accent/10',
  },
  cyan: {
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    bg: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
    icon: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
  },
}

export default function FeatureCapsules() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
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
            What We Build
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-text-primary leading-tight tracking-tight mb-6">
            Interactive feature capsules
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto font-light">
            Premium capabilities delivered through cinematic interfaces and AI-powered workflows.
          </p>
        </motion.div>

        {/* Capsules Grid - 2x2 on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {capsules.map((capsule, index) => {
            const IconComponent = capsule.icon
            const colors = colorClasses[capsule.color]
            const isExpanded = expandedId === capsule.id

            return (
              <motion.div
                key={capsule.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative group"
                onHoverStart={() => setExpandedId(capsule.id)}
                onHoverEnd={() => setExpandedId(null)}
              >
                {/* Floating glass-neon card */}
                <motion.div
                  className={`
                    relative glass-premium rounded-2xl p-6 md:p-8 
                    border ${colors.border} 
                    bg-gradient-to-br ${colors.bg}
                    cursor-pointer overflow-hidden
                    transition-all duration-500
                    ${isExpanded ? 'scale-[1.02]' : ''}
                  `}
                  whileHover={prefersReducedMotion ? {} : {
                    y: -8,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 212, 255, 0.2)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-0 blur-xl`}
                    animate={isExpanded ? { opacity: 0.5 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon with micro-animation */}
                  <motion.div
                    className={`relative z-10 mb-6 inline-flex p-4 rounded-xl ${colors.iconBg} backdrop-blur-sm`}
                    animate={isExpanded ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent 
                      className={`w-8 h-8 md:w-10 md:h-10 ${colors.icon}`}
                      strokeWidth={1.5}
                    />
                    {/* Icon glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl ${colors.iconBg} blur-md`}
                      animate={isExpanded ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-3 relative z-10">
                    {capsule.title}
                  </h3>

                  {/* Caption */}
                  <p className="text-base md:text-lg text-text-secondary mb-4 relative z-10">
                    {capsule.caption}
                  </p>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 overflow-hidden"
                      >
                        <p className="text-sm md:text-base text-text-muted mb-4 leading-relaxed">
                          {capsule.details}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {capsule.features.map((feature, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="px-3 py-1 rounded-full text-xs md:text-sm bg-surface-glass border border-border/30 text-text-secondary"
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Border glow on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl border-2 ${colors.border} opacity-0`}
                    animate={isExpanded ? { opacity: 1 } : { opacity: 0 }}
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

