'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import ParticleBackground from '@/components/shared/ParticleBackground'
import MinimalHeroVisual from '@/components/shared/MinimalHeroVisual'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const prefersReducedMotion = useReducedMotion()

  // Subtle parallax for background layers only
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0])

  // Refined text animation variants
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
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32"
    >
      <ParticleBackground />
      
      {/* Minimal background layers - toned down */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle background gradient */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/2 via-transparent to-transparent"
          style={{ y: prefersReducedMotion ? 0 : backgroundY }}
        />
        
        {/* Very subtle glow spots - minimal */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 md:w-[600px] md:h-[600px] bg-neon-blue/3 rounded-full blur-3xl"
          style={{
            y: prefersReducedMotion ? 0 : backgroundY,
          }}
          animate={prefersReducedMotion ? {} : {
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 md:w-[500px] md:h-[500px] bg-neon-purple/3 rounded-full blur-3xl"
          style={{
            y: prefersReducedMotion ? 0 : backgroundY,
          }}
          animate={prefersReducedMotion ? {} : {
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              opacity: prefersReducedMotion ? 1 : opacity,
            }}
            className="text-left lg:text-left text-center lg:text-left"
          >
            {/* Refined headline - luxury minimal */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight tracking-tight"
              variants={itemVariants}
            >
              <span className="text-white">We Build Digital</span>
              <br />
              <span className="text-white">Experiences That</span>
              <br />
              <span className="text-white">Feel Alive.</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/70 mb-10 max-w-xl leading-relaxed font-light"
              variants={itemVariants}
            >
              Creative Agency · Web Design · AI Automations · Branding
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Start a Project
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View Portfolio
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Minimal visual - pushed to side, doesn't overlap */}
          <div className="hidden lg:block relative">
            <MinimalHeroVisual intensity={0.03} />
          </div>
        </div>
      </Container>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-12 border border-white/30 rounded-full flex justify-center backdrop-blur-sm glass"
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2"
            animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
