'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, Zap, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const storyPanels = [
  {
    title: 'We Design',
    description: 'Crafting beautiful, intuitive interfaces and design systems that resonate with users. From wireframes to pixel-perfect designs, we bring ideas to visual life.',
    borderColor: 'border-neon-blue/20',
    gradient: 'from-neon-blue/10 to-neon-cyan/5',
    icon: Palette,
    svg: '/mockups/abstract-shape-1.svg',
  },
  {
    title: 'We Build',
    description: 'Transforming designs into high-performance, scalable applications. Clean code, modern frameworks, and attention to detail in every line.',
    borderColor: 'border-neon-purple/20',
    gradient: 'from-neon-purple/10 to-neon-pink/5',
    icon: Zap,
    svg: '/mockups/circuit-pattern.svg',
  },
  {
    title: 'We Automate',
    description: 'Leveraging AI and automation to streamline workflows, reduce manual tasks, and create intelligent systems that work for you 24/7.',
    borderColor: 'border-neon-pink/20',
    gradient: 'from-neon-pink/10 to-neon-purple/5',
    icon: Sparkles,
    svg: '/mockups/holographic-orb.svg',
  },
]

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    if (prefersReducedMotion) return

    const panels = containerRef.current?.querySelectorAll('.story-panel')
    if (!panels) return

    panels.forEach((panel, index) => {
      const panelElement = panel as HTMLElement
      
      // GSAP ScrollTrigger pinning - reduced pin duration
      ScrollTrigger.create({
        trigger: panelElement,
        start: 'top top',
        end: '+=60%',
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onEnter: () => {
          gsap.to(panelElement, {
            scale: 1.01,
            duration: 0.5,
            ease: 'power2.out',
          })
        },
        onLeave: () => {
          gsap.to(panelElement, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          })
        },
      })

      // Subtle parallax for background graphics
      const graphics = panelElement.querySelector('.panel-graphics')
      if (graphics) {
        gsap.to(graphics, {
          y: -50,
          scrollTrigger: {
            trigger: panelElement,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // Subtle text parallax
      const text = panelElement.querySelector('.panel-text')
      if (text) {
        gsap.to(text, {
          y: 30,
          scrollTrigger: {
            trigger: panelElement,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.vars.trigger
        if (triggerElement && typeof triggerElement !== 'string' && 'classList' in triggerElement) {
          const element = triggerElement as HTMLElement
          if (element.classList?.contains('story-panel')) {
            trigger.kill()
          }
        }
      })
    }
  }, [prefersReducedMotion])

  const containerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.section
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ opacity: prefersReducedMotion ? 1 : containerOpacity }}
    >
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/40 to-dark/80 pointer-events-none" />
      
      <Container>
        <motion.div
          className="space-y-16 md:space-y-20 lg:space-y-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {storyPanels.map((panel, index) => {
            const IconComponent = panel.icon
            return (
              <StoryPanel
                key={panel.title}
                panel={panel}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
                IconComponent={IconComponent}
              />
            )
          })}
        </motion.div>
      </Container>
    </motion.section>
  )
}

function StoryPanel({
  panel,
  index,
  prefersReducedMotion,
  IconComponent,
}: {
  panel: typeof storyPanels[0]
  index: number
  prefersReducedMotion: boolean
  IconComponent: React.ComponentType<any>
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax transforms
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30])
  const graphicsY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97])

  return (
    <motion.div
      ref={panelRef}
      className="story-panel relative min-h-[60vh] flex items-center justify-center"
      style={{
        opacity: prefersReducedMotion ? 1 : opacity,
        scale: prefersReducedMotion ? 1 : scale,
      }}
    >
      <div className="glass-premium rounded-glass-xl p-6 md:p-8 lg:p-10 relative overflow-hidden w-full max-w-5xl">
        {/* Subtle background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} opacity-20 pointer-events-none`} />
        
        {/* Minimal background graphics */}
        <motion.div
          className="panel-graphics absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 opacity-10 pointer-events-none"
          style={{
            y: prefersReducedMotion ? 0 : graphicsY,
          }}
        >
          <img 
            src={panel.svg} 
            alt="" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-10">
            {/* Minimal icon */}
            <motion.div
              className="flex-shrink-0 relative"
              animate={prefersReducedMotion ? {} : {
                rotate: [0, 3, -3, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: index * 0.8,
                ease: 'easeInOut',
              }}
            >
              {/* Subtle icon glow */}
              <motion.div
                className={`absolute inset-0 blur-xl ${panel.borderColor === 'border-neon-blue/20' ? 'bg-neon-blue/10' : panel.borderColor === 'border-neon-purple/20' ? 'bg-neon-purple/10' : 'bg-neon-pink/10'} rounded-full`}
                animate={prefersReducedMotion ? {} : {
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <IconComponent
                className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 ${panel.borderColor === 'border-neon-blue/20' ? 'text-neon-blue' : panel.borderColor === 'border-neon-purple/20' ? 'text-neon-purple' : 'text-neon-pink'} relative z-10`}
                strokeWidth={1.5}
              />
            </motion.div>
            
            {/* Text content */}
            <motion.div
              className="panel-text flex-1 text-center md:text-left"
              style={{
                y: prefersReducedMotion ? 0 : textY,
              }}
            >
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-white"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {panel.title}
              </motion.h2>
              <motion.p
                className="text-base md:text-lg lg:text-xl text-white/75 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {panel.description}
              </motion.p>
            </motion.div>
          </div>

          {/* Subtle border accent */}
          <motion.div
            className={`absolute inset-0 border ${panel.borderColor} rounded-glass-xl pointer-events-none`}
            animate={prefersReducedMotion ? {} : {
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: index * 1.2,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
