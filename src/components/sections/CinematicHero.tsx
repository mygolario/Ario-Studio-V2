'use client'

import { motion } from 'framer-motion'
import { Play, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import LensFlare from '@/components/shared/LensFlare'
import FloatingAIAgent from '@/components/shared/FloatingAIAgent'
import ParticleField from '@/components/shared/ParticleField'
import NebulaBackground from '@/components/shared/NebulaBackground'
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
            background: 'radial-gradient(ellipse at top center, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
          }} 
        />
        <div 
          className="absolute inset-0 opacity-50"
          style={{ 
            background: 'radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
          }} 
        />
        <div 
          className="absolute inset-0 opacity-40"
          style={{ 
            background: 'radial-gradient(ellipse at bottom left, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
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

      {/* Nebula Background */}
      <NebulaBackground />

      {/* Particle Field */}
      <ParticleField />

      {/* Lens Flare Overlay */}
      <LensFlare />

      {/* Floating AI Agents */}
      <FloatingAIAgent position="left" delay={0} icon="sparkles" color="primary" />
      <FloatingAIAgent position="right" delay={1} icon="zap" color="secondary" />
      <FloatingAIAgent position="left" delay={2} icon="brain" color="accent" />

      <Container size="xl" className="relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
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

          {/* Main Heading - Bigger and more cinematic */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            {/* Soft AI galaxy gradient glow behind title */}
            <motion.div
              className="absolute inset-0 blur-3xl -z-10"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
              }}
              animate={prefersReducedMotion ? {} : {
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-text-primary leading-[1.05] tracking-[-0.03em] relative z-10">
              <span className="block">Cinematic AI websites</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                that feel alive.
              </span>
            </h1>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-12 font-light"
          >
            Motion-first, AI-focused websites for founders, SaaS, and creative brands. 
            We craft experiences that blend cutting-edge technology with cinematic storytelling.
          </motion.p>

          {/* CTAs with micro-animations */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.05,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Button variant="primary" size="lg" className="text-base md:text-lg px-8 py-4 relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start a project
                  <motion.span
                    animate={prefersReducedMotion ? {} : {
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  initial={false}
                />
              </Button>
            </motion.div>
            <motion.div
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.05,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="secondary" size="lg" className="text-base md:text-lg px-8 py-4 group">
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={prefersReducedMotion ? {} : {
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Play className="w-4 h-4" />
                  </motion.span>
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
