'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const prefersReducedMotion = useReducedMotion()

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
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
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            y: prefersReducedMotion ? 0 : heroY,
            opacity: prefersReducedMotion ? 1 : opacity,
          }}
        >
          {/* Left: Content */}
          <div className="space-y-8 md:space-y-10">
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border text-text-muted text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Cinematic AI-Driven Web Experiences
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-text-primary leading-[1.1] tracking-[-0.02em]"
            >
              We build interactive stories for ambitious brands.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl text-text-muted leading-relaxed max-w-2xl font-light"
            >
              Ario Studio turns your product into a cinematic, scroll-based experience — powered by AI, crafted with motion, and engineered on Next.js.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button variant="primary" size="lg" className="text-lg px-8 py-4">
                Book a cinematic build
              </Button>
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                View selected work
              </Button>
            </motion.div>
          </div>

          {/* Right: Cinematic Visual */}
          <motion.div
            className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
            style={{
              y: prefersReducedMotion ? 0 : visualY,
            }}
            variants={itemVariants}
          >
            {/* Layered Cards Composition */}
            <div className="relative w-full h-full">
              {/* Card 1 - Back */}
              <motion.div
                className="absolute inset-0 glass-premium rounded-glass-xl"
                animate={prefersReducedMotion ? {} : {
                  y: [0, -20, 0],
                  rotate: [0, -2, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-glass-xl" />
              </motion.div>

              {/* Card 2 - Middle */}
              <motion.div
                className="absolute inset-0 glass-strong rounded-glass-xl translate-x-4 translate-y-4"
                animate={prefersReducedMotion ? {} : {
                  y: [0, -15, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent rounded-glass-xl" />
              </motion.div>

              {/* Card 3 - Front */}
              <motion.div
                className="absolute inset-0 glass rounded-glass-xl translate-x-8 translate-y-8"
                animate={prefersReducedMotion ? {} : {
                  y: [0, -10, 0],
                  rotate: [0, -1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent rounded-glass-xl" />
                
                {/* Abstract pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-24 h-24 border border-primary/30 rounded-lg" />
                  <div className="absolute bottom-4 right-4 w-16 h-16 border border-secondary/30 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-accent/20 rounded-lg rotate-45" />
                </div>
              </motion.div>

              {/* Glow effects */}
              <div className="absolute -inset-20 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -inset-32 bg-secondary/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-text-muted text-sm"
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
