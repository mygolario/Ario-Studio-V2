'use client'

import { motion } from 'framer-motion'
import { Search, Palette, Code, Rocket } from 'lucide-react'
import Container from '@/components/ui/Container'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We explore your vision, goals, and target audience to understand what makes your brand unique.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Design',
    description: 'Cinematic interfaces and motion design that tell your story through scroll-based narratives.',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Build',
    description: 'Production-ready Next.js applications with AI automation, optimized for performance and scale.',
    icon: Code,
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Deploy, iterate, and grow. We support you through launch and beyond with ongoing optimization.',
    icon: Rocket,
  },
]

export default function Process() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="process" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background pointer-events-none" />

      <Container size="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border text-text-muted text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Our way of working
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight tracking-tight">
              From concept to cinematic launch
            </h2>
            <p className="text-xl md:text-2xl text-text-muted leading-relaxed font-light">
              A streamlined process that transforms your vision into an interactive, AI-powered experience.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="glass-premium rounded-glass-xl p-6 md:p-8 h-full flex flex-col">
                    {/* Number */}
                    <div className="text-6xl md:text-7xl font-display font-bold text-text-primary/10 mb-4">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-text-muted leading-relaxed font-light flex-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Line (not on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

