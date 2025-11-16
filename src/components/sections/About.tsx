'use client'

import { motion } from 'framer-motion'
import { Sparkles, Zap, Code, Rocket } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const highlights = [
  {
    title: 'Cinematic web experiences',
    description: 'Scroll-based storytelling and interactive narratives',
    icon: Sparkles,
  },
  {
    title: 'AI-powered workflows',
    description: 'Intelligent automation and agent systems',
    icon: Zap,
  },
  {
    title: 'Next.js & modern stack',
    description: 'Production-ready, scalable architecture',
    icon: Code,
  },
  {
    title: 'End-to-end delivery',
    description: 'From concept to launch and beyond',
    icon: Rocket,
  },
]

export default function About() {
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

  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background pointer-events-none" />

      <Container size="xl">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left: Story */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border text-text-muted text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                About Ario Studio
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight tracking-tight">
                Design, engineering, and automation in one place.
              </h2>

              <p className="text-xl md:text-2xl text-text-muted leading-relaxed font-light">
                Ario Studio is a cinematic web and AI studio. We design, build, and automate interactive experiences for founders, agencies, and product teams who want their digital presence to feel alive — not like another static template.
              </p>
            </motion.div>
          </div>

          {/* Right: Stats & Highlights */}
          <div className="space-y-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <Card hover glow="blue" className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                          {highlight.title}
                        </h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
