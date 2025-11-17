'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import ParticleField from '@/components/shared/ParticleField'
import NebulaBackground from '@/components/shared/NebulaBackground'
import Orange3DCard from '@/components/shared/Orange3DCard'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function CinematicHero() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Animation variants
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
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24"
      style={{
        opacity: prefersReducedMotion ? 1 : opacity,
        y: prefersReducedMotion ? 0 : y,
      }}
    >
      {/* Galaxy Background Layers */}
      <div className="absolute inset-0">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
        
        {/* Animated gradient from dark charcoal → purple/blue/teal edges */}
        <motion.div 
          className="absolute inset-0"
          animate={prefersReducedMotion ? {} : {
            background: [
              'radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
              'radial-gradient(ellipse at top right, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
              'radial-gradient(ellipse at bottom center, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
              'radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Nebula Background */}
      <NebulaBackground />

      {/* Particle Field */}
      <ParticleField />

      <Container size="xl" className="relative z-10">
        <motion.div
          className="max-w-6xl mx-auto text-center"
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

          {/* Main Heading - Modern geometric sans, strong but not oversized */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-text-primary leading-[1.1] tracking-[-0.02em] mb-6 max-w-4xl mx-auto"
          >
            <span className="block">Cinematic AI websites</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              that feel alive.
            </span>
          </motion.h1>

          {/* Supporting Text - One concise subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-12 font-light"
          >
            Motion-first, AI-focused websites for founders, SaaS, and creative brands.
          </motion.p>

          {/* 3D Orange Card */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <Orange3DCard>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                  AI Studio
                </h3>
                <p className="text-base md:text-lg text-white/90">
                  Build teams of AI agents that work together seamlessly
                </p>
              </div>
            </Orange3DCard>
          </motion.div>

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
    </motion.section>
  )
}
