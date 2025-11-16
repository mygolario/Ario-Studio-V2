'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import ParticleBackground from '@/components/shared/ParticleBackground'
import { useMouseParallax } from '@/lib/hooks/useMouseParallax'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const { parallaxOffset } = useMouseParallax(0.15)
  const prefersReducedMotion = useReducedMotion()

  // Parallax transforms for scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  // Direct parallax values (will be smoothed by motion)

  // Staggered text animation
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />
      
      {/* Multi-layer parallax background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background layer - slowest parallax */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 md:w-[600px] md:h-[600px] bg-neon-blue/20 rounded-full blur-3xl"
          style={{
            y: prefersReducedMotion ? 0 : backgroundY,
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.3,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Midground layer */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 md:w-[500px] md:h-[500px] bg-neon-purple/20 rounded-full blur-3xl"
          style={{
            y: prefersReducedMotion ? 0 : midgroundY,
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.5,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Additional accent orb */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 md:w-96 md:h-96 bg-neon-pink/15 rounded-full blur-3xl"
          style={{
            y: prefersReducedMotion ? 0 : foregroundY,
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.7,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          style={{ opacity: prefersReducedMotion ? 1 : opacity }}
          className="relative"
        >
          {/* Staggered headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 px-4"
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              className="neon-glow-blue block mb-2"
              variants={textVariants}
              custom={0}
            >
              We Build Digital
            </motion.span>
            <motion.span 
              className="neon-glow-purple block mb-2"
              variants={textVariants}
              custom={1}
            >
              Experiences That
            </motion.span>
            <motion.span 
              className="neon-glow-pink block"
              variants={textVariants}
              custom={2}
            >
              Feel Alive.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Creative Agency · Web Design · AI Automations · Branding
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Start a Project
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              View Portfolio
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced 3D central shape with parallax */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 pointer-events-none opacity-40"
          style={{
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.8,
            y: prefersReducedMotion ? 0 : parallaxOffset.y * 0.8,
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          animate={prefersReducedMotion ? { opacity: 0.4 } : {
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          }}
        >
          <div className="w-full h-full relative">
            {/* Outer rings with glow */}
            <motion.div 
              className="absolute inset-0 border-2 border-neon-blue/60 rounded-full"
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute inset-4 border-2 border-neon-purple/60 rounded-full"
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="absolute inset-8 border-2 border-neon-pink/60 rounded-full"
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
            
            {/* Central glowing orb */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink rounded-full blur-xl"
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </Container>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm glass"
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-neon-blue rounded-full mt-2"
            animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
