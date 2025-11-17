'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import LensFlare from '@/components/shared/LensFlare'
import FloatingAIAgent from '@/components/shared/FloatingAIAgent'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function CinematicHero() {
  const prefersReducedMotion = useReducedMotion()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Galaxy Background Layers */}
      <div className="absolute inset-0">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Radial gradients for galaxy effect */}
        <div 
          className="absolute inset-0 opacity-60" 
          style={{ 
            background: 'radial-gradient(ellipse at top center, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
          }} 
        />
        <div 
          className="absolute inset-0 opacity-50"
          style={{ 
            background: 'radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
          }} 
        />
        <div 
          className="absolute inset-0 opacity-40"
          style={{ 
            background: 'radial-gradient(ellipse at bottom left, rgba(236, 72, 153, 0.06) 0%, transparent 70%)',
          }} 
        />
        
        {/* Conic gradient for depth */}
        <div 
          className="absolute inset-0 opacity-30 blur-3xl"
          style={{
            background: 'conic-gradient(from 0deg, rgba(0, 212, 255, 0.05) 0%, rgba(168, 85, 247, 0.05) 33%, rgba(236, 72, 153, 0.05) 66%, rgba(0, 212, 255, 0.05) 100%)',
          }}
        />
      </div>

      {/* Lens Flare Overlay */}
      <LensFlare />

      {/* Floating AI Agents */}
      <FloatingAIAgent position="left" delay={0} icon="sparkles" color="primary" />
      <FloatingAIAgent position="right" delay={1} icon="zap" color="secondary" />
      <FloatingAIAgent position="left" delay={2} icon="brain" color="accent" />

      <Container size="xl" className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Small Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border/50 text-text-muted text-xs md:text-sm font-medium uppercase tracking-wider mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Ario Studio · AI Creative Lab
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-text-primary leading-[1.1] tracking-[-0.02em] mb-6"
          >
            Cinematic AI websites{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              that feel alive.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10 font-light"
          >
            Motion-first, AI-focused websites for founders, SaaS, and creative brands. 
            We craft experiences that blend cutting-edge technology with cinematic storytelling.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="primary" size="lg" className="text-base md:text-lg px-8 py-4">
                Start a project
              </Button>
            </motion.div>
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="secondary" size="lg" className="text-base md:text-lg px-8 py-4 group">
                <span className="flex items-center gap-2">
                  <Play className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  Watch showreel
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Additional ambient glows */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none" />
    </section>
  )
}

