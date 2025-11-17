'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground'
import { gsap } from '@/lib/gsap-setup'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function CinematicHero() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // 3D card mouse tilt
  const x = useMotionValue(0)
  const yMouse = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(yMouse, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const mouseX = (e.clientX - centerX) / (rect.width / 2)
      const mouseY = (e.clientY - centerY) / (rect.height / 2)
      
      x.set(mouseX)
      yMouse.set(mouseY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      yMouse.set(0)
      setIsHovered(false)
    }

    const card = cardRef.current
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    card.addEventListener('mouseenter', () => setIsHovered(true))

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [x, yMouse, prefersReducedMotion])

  // GSAP cinematic reveal
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const tl = gsap.timeline({ delay: 0.3 })
    
    tl.fromTo(
      sectionRef.current.querySelector('.hero-title'),
      {
        opacity: 0,
        y: 60,
        filter: 'blur(20px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power4.out',
      }
    )
    .fromTo(
      sectionRef.current.querySelector('.hero-subtitle'),
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
      },
      '-=0.6'
    )
    .fromTo(
      sectionRef.current.querySelector('.hero-card'),
      {
        opacity: 0,
        scale: 0.8,
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
      },
      '-=0.4'
    )
    .fromTo(
      sectionRef.current.querySelector('.hero-ctas'),
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power4.out',
      },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [prefersReducedMotion])

  return (
    <>
      <AnimatedGradientBackground />
      <motion.section 
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24"
        style={{
          opacity: prefersReducedMotion ? 1 : opacity,
          y: prefersReducedMotion ? 0 : y,
        }}
      >
        {/* Parallax layers */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
            }}
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <Container size="xl" className="relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Title - Apple style */}
            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-text-primary leading-[1.1] tracking-[-0.02em] mb-6">
              <span className="block bg-gradient-to-b from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI Studio
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-12 font-light">
              Build teams of AI agents that work together seamlessly.
            </p>

            {/* 3D Floating Card */}
            <motion.div
              ref={cardRef}
              className="hero-card relative mb-12 inline-block"
              style={{
                rotateX: prefersReducedMotion ? 0 : rotateX,
                rotateY: prefersReducedMotion ? 0 : rotateY,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                className="relative rounded-2xl p-8 md:p-12 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 backdrop-blur-xl border border-primary/30"
                animate={isHovered ? {
                  scale: 1.05,
                } : {
                  scale: 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 20px 60px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(0, 212, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-2">
                    AI Creative Lab
                  </div>
                  <p className="text-base md:text-lg text-text-secondary">
                    Motion-first, AI-focused experiences
                  </p>
                </div>

                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl -z-10"
                  animate={isHovered ? {
                    opacity: 0.6,
                    scale: 1.1,
                  } : {
                    opacity: 0.3,
                    scale: 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* CTAs - Ultra Gradient style */}
            <motion.div
              className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="primary" size="lg" className="text-base md:text-lg px-8 py-4 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Start a project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Glow border */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                <Button variant="secondary" size="lg" className="text-base md:text-lg px-8 py-4 backdrop-blur-sm border border-border/50 group">
                  <span className="flex items-center gap-2">
                    Watch showreel
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Container>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-text-muted text-sm"
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  )
}
