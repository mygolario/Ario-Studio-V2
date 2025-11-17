'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
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
  
  const rotateX = useSpring(useTransform(yMouse, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
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

  // Heavy cinematic intro animation
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const tl = gsap.timeline({ delay: 0.2 })
    
    // Line 1: "Cinematic AI websites"
    tl.fromTo(
      sectionRef.current.querySelector('.hero-line-1'),
      {
        opacity: 0,
        y: 40,
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
    // Line 2: "that feel alive."
    .fromTo(
      sectionRef.current.querySelector('.hero-line-2'),
      {
        opacity: 0,
        y: 40,
        filter: 'blur(20px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power4.out',
      },
      '-=0.6'
    )
    // Subtitle
    .fromTo(
      sectionRef.current.querySelector('.hero-subtitle'),
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
      },
      '-=0.4'
    )
    // 3D Card
    .fromTo(
      sectionRef.current.querySelector('.hero-card'),
      {
        opacity: 0,
        scale: 0.9,
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
      },
      '-=0.3'
    )
    // CTAs
    .fromTo(
      sectionRef.current.querySelector('.hero-ctas'),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power4.out',
      },
      '-=0.2'
    )

    return () => {
      tl.kill()
    }
  }, [prefersReducedMotion])

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24"
      style={{
        opacity: prefersReducedMotion ? 1 : opacity,
        y: prefersReducedMotion ? 0 : y,
      }}
    >
        <Container size="xl" className="relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Title - Two lines with stagger */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-semibold text-text-primary leading-[1.1] tracking-[-0.02em] mb-6">
              <span className="hero-line-1 block">Cinematic AI websites</span>
              <span className="hero-line-2 block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                that feel alive.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-12 font-light">
              Motion-first, AI-focused websites for founders, SaaS, and creative brands.
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
              animate={prefersReducedMotion ? {} : {
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              <motion.div
                className="relative rounded-3xl p-10 md:p-14 bg-gradient-to-br from-primary/25 via-secondary/20 to-accent/25 backdrop-blur-2xl border border-primary/40"
                animate={isHovered ? {
                  scale: 1.05,
                } : {
                  scale: 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 25px 70px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(0, 212, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                }}
              >
                {/* Inner glow layers */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/15 via-transparent to-black/25 pointer-events-none" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-3">
                    AI Creative Lab
                  </div>
                  <p className="text-base md:text-lg text-text-secondary">
                    Motion-first, AI-focused experiences
                  </p>
                </div>

                {/* Edge glow */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 blur-2xl -z-10"
                  animate={isHovered ? {
                    opacity: 0.7,
                    scale: 1.15,
                  } : {
                    opacity: 0.4,
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
                <Button variant="primary" size="lg" className="text-base md:text-lg px-8 py-4 relative overflow-hidden group rounded-full backdrop-blur-sm border border-primary/30">
                  <span className="relative z-10">Start a project</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
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
                <Button variant="secondary" size="lg" className="text-base md:text-lg px-8 py-4 backdrop-blur-sm border border-border/50 rounded-full group">
                  Watch showreel
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
          transition={{ delay: 2.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-text-muted text-sm"
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.section>
  )
}
