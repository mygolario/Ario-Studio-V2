'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import ParticleBackground from '@/components/shared/ParticleBackground'
import GlowingOrb from '@/components/shared/GlowingOrb'
import { useMouseParallax } from '@/lib/hooks/useMouseParallax'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const { parallaxOffset } = useMouseParallax(0.12)
  const prefersReducedMotion = useReducedMotion()

  // Parallax transforms for scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.9, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  // Staggered text animation variants
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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />
      
      {/* Cinematic spotlight effect */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-b from-neon-blue/20 via-neon-purple/10 to-transparent blur-3xl pointer-events-none"
        style={{
          y: prefersReducedMotion ? 0 : backgroundY,
        }}
        animate={prefersReducedMotion ? {} : {
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Ambient rim lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"
          style={{
            y: prefersReducedMotion ? 0 : midgroundY,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-neon-purple/50 to-transparent"
          style={{
            y: prefersReducedMotion ? 0 : foregroundY,
          }}
        />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            opacity: prefersReducedMotion ? 1 : opacity,
            scale: prefersReducedMotion ? 1 : scale,
          }}
        >
          {/* Staggered headline with enhanced glow */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 px-4"
            variants={itemVariants}
          >
            <motion.span 
              className="neon-glow-blue block mb-3"
              variants={itemVariants}
            >
              We Build Digital
            </motion.span>
            <motion.span 
              className="neon-glow-purple block mb-3"
              variants={itemVariants}
            >
              Experiences That
            </motion.span>
            <motion.span 
              className="neon-glow-pink block"
              variants={itemVariants}
            >
              Feel Alive.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-16 max-w-3xl mx-auto px-4 font-light tracking-wide"
            variants={itemVariants}
          >
            Creative Agency · Web Design · AI Automations · Branding
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4"
            variants={itemVariants}
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-10 py-5">
              Start a Project
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-10 py-5">
              View Portfolio
            </Button>
          </motion.div>
        </motion.div>

        {/* Cinematic glowing orb - replaces old shape */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.6,
            y: prefersReducedMotion ? 0 : parallaxOffset.y * 0.6,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlowingOrb size="lg" intensity={0.1} />
        </motion.div>

        {/* Additional depth layers */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-3xl pointer-events-none"
          style={{
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.4,
            y: prefersReducedMotion ? 0 : parallaxOffset.y * 0.4,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </Container>

      {/* Enhanced scroll indicator with glow */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-12 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm glass-premium"
          animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-2 h-2 bg-neon-blue rounded-full mt-2 shadow-neon-blue"
            animate={prefersReducedMotion ? {} : { y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
