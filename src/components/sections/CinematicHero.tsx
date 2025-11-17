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

            {/* Advanced 3D Morphing Shape */}
            <motion.div
              ref={cardRef}
              className="hero-card relative mb-12 inline-block perspective-1000"
              style={{
                rotateX: prefersReducedMotion ? 0 : rotateX,
                rotateY: prefersReducedMotion ? 0 : rotateY,
                transformStyle: 'preserve-3d',
                willChange: prefersReducedMotion ? 'auto' : 'transform',
                perspective: '1000px',
              }}
              animate={prefersReducedMotion ? {} : {
                y: [0, -6, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              {/* 3D Hexagon Container */}
              <motion.div
                className="relative"
                style={{
                  transformStyle: 'preserve-3d',
                }}
                animate={prefersReducedMotion ? {} : {
                  rotateY: [0, 360],
                  rotateX: [0, 15, 0],
                }}
                transition={{
                  rotateY: {
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  rotateX: {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                {/* Outer rotating hexagon frame */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  animate={prefersReducedMotion ? {} : {
                    rotateZ: [0, -360],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <svg
                    width="400"
                    height="400"
                    viewBox="0 0 400 400"
                    className="absolute -inset-20 md:-inset-24"
                    style={{ filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.5))' }}
                  >
                    <defs>
                      <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
                        <stop offset="50%" stopColor="rgba(0, 212, 255, 0.6)" />
                        <stop offset="100%" stopColor="rgba(236, 72, 153, 0.8)" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="200,50 350,125 350,275 200,350 50,275 50,125"
                      fill="none"
                      stroke="url(#hexGradient)"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  </svg>
                </motion.div>

                {/* Main 3D Card with hexagon shape */}
                <motion.div
                  className="relative p-10 md:p-14"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(0, 212, 255, 0.25), rgba(236, 72, 153, 0.3))',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(168, 85, 247, 0.4)',
                    boxShadow: '0 30px 80px rgba(168, 85, 247, 0.5), 0 0 0 1px rgba(0, 212, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    transform: 'translateZ(50px)',
                  }}
                  animate={isHovered ? {
                    scale: 1.08,
                    rotateZ: [0, 5, -5, 0],
                  } : {
                    scale: 1,
                    rotateZ: 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(0, 212, 255, 0.15), rgba(236, 72, 153, 0.2))',
                    }}
                    animate={prefersReducedMotion ? {} : {
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Inner glow layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30 pointer-events-none" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-secondary/15 pointer-events-none" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-3"
                      animate={prefersReducedMotion ? {} : {
                        backgroundPosition: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      style={{
                        background: 'linear-gradient(90deg, #00d4ff, #a855f7, #ec4899, #00d4ff)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      AI Creative Lab
                    </motion.div>
                    <p className="text-base md:text-lg text-text-secondary">
                      Motion-first, AI-focused experiences
                    </p>
                  </div>

                  {/* Floating particles inside */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-primary/60"
                      style={{
                        top: `${20 + i * 15}%`,
                        left: `${15 + i * 12}%`,
                      }}
                      animate={prefersReducedMotion ? {} : {
                        y: [0, -20, 0],
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Outer glow rings */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4), rgba(0, 212, 255, 0.3), transparent)',
                      filter: 'blur(40px)',
                      transform: 'translateZ(-50px)',
                    }}
                  />
                </motion.div>

                {/* Edge glow */}
                <motion.div
                  className="absolute -inset-4 -z-10"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(0, 212, 255, 0.3), rgba(236, 72, 153, 0.4))',
                    filter: 'blur(20px)',
                  }}
                  animate={isHovered ? {
                    opacity: 0.8,
                    scale: 1.2,
                  } : {
                    opacity: 0.5,
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
