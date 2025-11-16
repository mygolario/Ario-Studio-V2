'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import ParticleBackground from '@/components/shared/ParticleBackground'
import AdvancedGlowingOrb from '@/components/shared/AdvancedGlowingOrb'
import { useMouseParallax } from '@/lib/hooks/useMouseParallax'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const { parallaxOffset } = useMouseParallax(0.1)
  const prefersReducedMotion = useReducedMotion()

  // 7-layer parallax system
  const layer1 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']) // Deepest background
  const layer2 = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const layer3 = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const layer4 = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const layer5 = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const layer6 = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const layer7 = useTransform(scrollYProgress, [0, 1], ['0%', '3%']) // Foreground
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.95, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98])

  // Character-level text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />
      
      {/* 7-layer parallax depth system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1 - Deepest background */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neon-blue/5 via-transparent to-transparent"
          style={{ y: prefersReducedMotion ? 0 : layer1 }}
        />
        
        {/* Layer 2 */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 md:w-[800px] md:h-[800px] bg-neon-blue/8 rounded-full blur-3xl"
          style={{
            y: prefersReducedMotion ? 0 : layer2,
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.2,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.5, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Layer 3 */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 md:w-[700px] md:h-[700px] bg-neon-purple/8 rounded-full blur-3xl"
          style={{
            y: prefersReducedMotion ? 0 : layer3,
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.3,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />

        {/* Layer 4 */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 md:w-96 md:h-96 bg-neon-pink/6 rounded-full blur-3xl"
          style={{
            y: prefersReducedMotion ? 0 : layer4,
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.4,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.6, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        />

        {/* Layer 5 - Midground */}
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-48 h-48 md:w-80 md:h-80 bg-neon-cyan/5 rounded-full blur-3xl"
          style={{
            y: prefersReducedMotion ? 0 : layer5,
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.5,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        />

        {/* Layer 6 - Near foreground */}
        <motion.div
          className="absolute top-1/3 left-1/2 w-32 h-32 md:w-64 md:h-64 bg-neon-blue/4 rounded-full blur-2xl"
          style={{
            y: prefersReducedMotion ? 0 : layer6,
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.6,
          }}
        />

        {/* Layer 7 - Foreground accent */}
        <motion.div
          className="absolute bottom-1/2 right-1/2 w-24 h-24 md:w-48 md:h-48 bg-neon-purple/3 rounded-full blur-xl"
          style={{
            y: prefersReducedMotion ? 0 : layer7,
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.7,
          }}
        />
      </div>

      {/* Cinematic spotlight with volumetric lighting */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[800px] bg-gradient-to-b from-neon-blue/25 via-neon-purple/15 to-transparent blur-3xl pointer-events-none"
        style={{
          y: prefersReducedMotion ? 0 : layer2,
        }}
        animate={prefersReducedMotion ? {} : {
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ambient rim lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent"
          style={{ y: prefersReducedMotion ? 0 : layer4 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-neon-purple/60 to-transparent"
          style={{ y: prefersReducedMotion ? 0 : layer5 }}
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
          {/* Staggered headline with character-level animation */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-display font-bold mb-10 px-4 leading-tight"
          >
            <motion.span 
              className="neon-glow-blue block mb-4"
              variants={wordVariants}
            >
              We Build Digital
            </motion.span>
            <motion.span 
              className="neon-glow-purple block mb-4"
              variants={wordVariants}
            >
              Experiences That
            </motion.span>
            <motion.span 
              className="neon-glow-pink block"
              variants={wordVariants}
            >
              Feel Alive.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/85 mb-16 max-w-4xl mx-auto px-4 font-light tracking-wide"
            variants={wordVariants}
          >
            Creative Agency · Web Design · AI Automations · Branding
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4"
            variants={wordVariants}
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-12 py-6">
              Start a Project
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-12 py-6">
              View Portfolio
            </Button>
          </motion.div>
        </motion.div>

        {/* Advanced glowing orb with 7-layer parallax */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.5,
            y: prefersReducedMotion ? 0 : useTransform(scrollYProgress, [0, 1], [parallaxOffset.y * 0.5, parallaxOffset.y * 0.5 - 100]),
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <AdvancedGlowingOrb size="lg" intensity={0.08} />
        </motion.div>

        {/* Additional depth layers around orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-neon-blue/4 rounded-full blur-3xl pointer-events-none"
          style={{
            x: prefersReducedMotion ? 0 : parallaxOffset.x * 0.3,
            y: prefersReducedMotion ? 0 : parallaxOffset.y * 0.3,
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </Container>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-12 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm glass-premium shadow-neon-blue"
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
