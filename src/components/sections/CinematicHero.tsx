'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
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

            {/* Premium 3D Holographic Card */}
            <motion.div
              ref={cardRef}
              className="hero-card relative mb-12 inline-block"
              style={{
                rotateX: prefersReducedMotion ? 0 : rotateX,
                rotateY: prefersReducedMotion ? 0 : rotateY,
                transformStyle: 'preserve-3d',
                willChange: prefersReducedMotion ? 'auto' : 'transform',
                perspective: '1200px',
              }}
              animate={prefersReducedMotion ? {} : {
                y: [0, -8, 0],
              }}
              transition={{
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              {/* Main Premium Card */}
              <motion.div
                className="relative rounded-3xl p-12 md:p-16 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 15, 20, 0.9), rgba(10, 10, 25, 0.95))',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: `
                    0 0 0 1px rgba(168, 85, 247, 0.2),
                    0 8px 32px rgba(0, 0, 0, 0.4),
                    0 0 80px rgba(168, 85, 247, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                  transform: 'translateZ(0)',
                }}
                animate={isHovered ? {
                  scale: 1.03,
                } : {
                  scale: 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated holographic shine */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                  }}
                  animate={prefersReducedMotion ? {} : {
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 2,
                  }}
                />

                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    padding: '1px',
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.6), rgba(0, 212, 255, 0.5), rgba(236, 72, 153, 0.6))',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                  animate={prefersReducedMotion ? {} : {
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Inner content glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-3xl" />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Premium Icon/Logo area */}
                  <motion.div
                    className="mb-6 flex justify-center"
                    animate={prefersReducedMotion ? {} : {
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div className="relative">
                      {/* Outer glowing ring - multiple layers */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          width: '100px',
                          height: '100px',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={prefersReducedMotion ? {} : {
                          scale: [1, 1.3, 1],
                          opacity: [0.4, 0.7, 0.4],
                          rotate: [0, 360],
                        }}
                        transition={{
                          scale: {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                          opacity: {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                          rotate: {
                            duration: 15,
                            repeat: Infinity,
                            ease: 'linear',
                          },
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-full border-2"
                          style={{
                            borderImage: 'linear-gradient(135deg, rgba(0, 212, 255, 0.6), rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.6)) 1',
                            borderImageSlice: 1,
                            boxShadow: '0 0 40px rgba(0, 212, 255, 0.4), 0 0 60px rgba(168, 85, 247, 0.3)',
                          }}
                        />
                      </motion.div>

                      {/* Middle ring with glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          width: '85px',
                          height: '85px',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={prefersReducedMotion ? {} : {
                          rotate: [0, -360],
                        }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-full border border-primary/50"
                          style={{
                            boxShadow: '0 0 30px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(168, 85, 247, 0.2)',
                          }}
                        />
                      </motion.div>

                      {/* Inner core with icon */}
                      <motion.div
                        className="relative w-20 h-20 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.25))',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: `
                            0 0 50px rgba(0, 212, 255, 0.5),
                            0 0 80px rgba(168, 85, 247, 0.4),
                            inset 0 2px 4px rgba(255, 255, 255, 0.3),
                            inset 0 -2px 4px rgba(0, 0, 0, 0.3)
                          `,
                        }}
                        animate={prefersReducedMotion ? {} : {
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {/* Icon */}
                        <motion.div
                          animate={prefersReducedMotion ? {} : {
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: {
                              duration: 8,
                              repeat: Infinity,
                              ease: 'linear',
                            },
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                          }}
                        >
                          <Sparkles
                            className="w-10 h-10 text-primary"
                            style={{
                              filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.8))',
                            }}
                            strokeWidth={1.5}
                          />
                        </motion.div>

                        {/* Inner glow pulse */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4), transparent 70%)',
                          }}
                          animate={prefersReducedMotion ? {} : {
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </motion.div>

                      {/* Outer energy trails */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full"
                          style={{
                            width: `${100 + i * 20}px`,
                            height: `${100 + i * 20}px`,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            border: `1px solid rgba(0, 212, 255, ${0.2 - i * 0.05})`,
                            opacity: 0.3,
                          }}
                          animate={prefersReducedMotion ? {} : {
                            scale: [1, 1.4, 1],
                            opacity: [0.2, 0.5, 0.2],
                            rotate: [0, i % 2 === 0 ? 360 : -360],
                          }}
                          transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Title with premium gradient */}
                  <motion.h3
                    className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4"
                    animate={prefersReducedMotion ? {} : {
                      backgroundPosition: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      background: 'linear-gradient(90deg, #00d4ff, #a855f7, #ec4899, #14a5e9, #00d4ff)',
                      backgroundSize: '300% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 0 40px rgba(168, 85, 247, 0.3)',
                    }}
                  >
                    AI Creative Lab
                  </motion.h3>

                  {/* Subtitle */}
                  <p className="text-base md:text-lg lg:text-xl text-text-secondary/90 font-light">
                    Motion-first, AI-focused experiences
                  </p>
                </div>

                {/* Corner accents */}
                {[
                  { top: 0, left: 0, borderRight: '1px solid rgba(168, 85, 247, 0.3)', borderBottom: '1px solid rgba(168, 85, 247, 0.3)' },
                  { top: 0, right: 0, borderLeft: '1px solid rgba(0, 212, 255, 0.3)', borderBottom: '1px solid rgba(0, 212, 255, 0.3)' },
                  { bottom: 0, left: 0, borderRight: '1px solid rgba(236, 72, 153, 0.3)', borderTop: '1px solid rgba(236, 72, 153, 0.3)' },
                  { bottom: 0, right: 0, borderLeft: '1px solid rgba(14, 165, 233, 0.3)', borderTop: '1px solid rgba(14, 165, 233, 0.3)' },
                ].map((corner, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8"
                    style={{
                      ...corner,
                      opacity: 0.6,
                    }}
                    animate={prefersReducedMotion ? {} : {
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>

              {/* Outer glow effect */}
              <motion.div
                className="absolute -inset-8 -z-10 rounded-3xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3), rgba(0, 212, 255, 0.2), transparent)',
                  filter: 'blur(60px)',
                }}
                animate={isHovered ? {
                  opacity: 0.8,
                  scale: 1.3,
                } : {
                  opacity: 0.5,
                  scale: 1,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Secondary glow ring */}
              <motion.div
                className="absolute -inset-12 -z-20 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent)',
                  filter: 'blur(80px)',
                }}
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
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
