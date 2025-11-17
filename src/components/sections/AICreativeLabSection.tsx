'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import { gsap } from '@/lib/gsap-setup'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function AICreativeLabSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const centralCardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Central card scale on scroll
  const centralScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

  // Mouse parallax
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), {
    stiffness: 200,
    damping: 25,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), {
    stiffness: 200,
    damping: 25,
  })

  // Side card rotations (created outside map)
  const sideCard0RotateX = useTransform(rotateX, (val) => val * 0.5)
  const sideCard0RotateY = useTransform(rotateY, (val) => val * 0.5)
  const sideCard1RotateX = useTransform(rotateX, (val) => val * -0.5)
  const sideCard1RotateY = useTransform(rotateY, (val) => val * -0.5)
  const sideCard2RotateX = useTransform(rotateX, (val) => val * 0.5)
  const sideCard2RotateY = useTransform(rotateY, (val) => val * 0.5)

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const mouseX = (e.clientX - centerX) / (rect.width / 2)
      const mouseY = (e.clientY - centerY) / (rect.height / 2)
      
      x.set(mouseX)
      y.set(mouseY)
      setMousePosition({ x: mouseX, y: mouseY })
    }

    const section = sectionRef.current
    section.addEventListener('mousemove', handleMouseMove)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
    }
  }, [x, y, prefersReducedMotion])

  // Side cards rotation and drift
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const sideCards = sectionRef.current.querySelectorAll('.side-card')
    
    sideCards.forEach((card, index) => {
      gsap.to(card, {
        rotate: index % 2 === 0 ? 2 : -3,
        x: index % 2 === 0 ? 20 : -20,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5,
      })
    })
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold text-text-primary leading-tight tracking-tight mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Creative Lab
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
            Motion-first, AI-focused experiences
          </p>
        </motion.div>

        {/* Dynamic composition with overlapping cards */}
        <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center">
          {/* Central Panel */}
          <motion.div
            ref={centralCardRef}
            className="relative z-20"
            style={{
              scale: prefersReducedMotion ? 1 : centralScale,
              rotateX: prefersReducedMotion ? 0 : rotateX,
              rotateY: prefersReducedMotion ? 0 : rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div
              className="relative rounded-3xl p-10 md:p-14 bg-gradient-to-br from-primary/25 via-secondary/20 to-accent/25 backdrop-blur-2xl border border-primary/40 w-full max-w-2xl"
              whileHover={prefersReducedMotion ? {} : {
                scale: 1.05,
              }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: '0 25px 70px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(0, 212, 255, 0.3)',
              }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/15 via-transparent to-black/25 pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-6" strokeWidth={1.5} />
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-4">
                  Cinematic Experiences
                </h3>
                <p className="text-base md:text-lg text-text-secondary">
                  Motion-first interfaces that tell your brand story
                </p>
              </div>

              {/* Gradient shift on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-secondary/20 via-accent/20 to-primary/20 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </motion.div>

          {/* Secondary floating cards */}
          {[
            { index: 0, rotateX: sideCard0RotateX, rotateY: sideCard0RotateY, left: '10%', top: '20%' },
            { index: 1, rotateX: sideCard1RotateX, rotateY: sideCard1RotateY, right: '10%', top: '60%' },
            { index: 2, rotateX: sideCard2RotateX, rotateY: sideCard2RotateY, right: '15%', top: '10%' },
          ].map((card) => (
              <motion.div
                key={card.index}
                className="side-card absolute z-10"
                style={{
                  ...(card.left ? { left: card.left } : {}),
                  ...(card.right ? { right: card.right } : {}),
                  top: card.top,
                  rotateX: prefersReducedMotion ? 0 : card.rotateX,
                  rotateY: prefersReducedMotion ? 0 : card.rotateY,
                  transformStyle: 'preserve-3d',
                }}
                whileHover={prefersReducedMotion ? {} : {
                  scale: 1.1,
                  z: 50,
                }}
                transition={{ duration: 0.3 }}
              >
              <div className={`
                relative rounded-2xl p-6 md:p-8 
                bg-gradient-to-br ${
                  card.index === 0 ? 'from-primary/20 via-primary/10 to-transparent' :
                  card.index === 1 ? 'from-secondary/20 via-secondary/10 to-transparent' :
                  'from-accent/20 via-accent/10 to-transparent'
                }
                backdrop-blur-xl border ${
                  card.index === 0 ? 'border-primary/30' :
                  card.index === 1 ? 'border-secondary/30' :
                  'border-accent/30'
                }
                w-48 md:w-56
              `}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
                <div className="relative z-10">
                  <div className="text-lg font-display font-semibold text-text-primary mb-2">
                    {card.index === 0 ? 'Design' : card.index === 1 ? 'Build' : 'Automate'}
                  </div>
                  <p className="text-sm text-text-secondary">
                    {card.index === 0 ? 'Intelligent UX' : card.index === 1 ? 'Web Systems' : 'AI Agents'}
                  </p>
                </div>
              </div>
              </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

