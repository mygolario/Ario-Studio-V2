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
      const cardElement = panelElement.querySelector('.story-card') as HTMLElement
      
      // Create smooth accordion effect with ScrollTrigger
      ScrollTrigger.create({
        trigger: panelElement,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Active card (progress near 0.5 = center)
          const distanceFromCenter = Math.abs(progress - 0.5)
          const isActive = distanceFromCenter < 0.3
          
          if (isActive) {
            const activeProgress = 1 - (distanceFromCenter / 0.3)
            gsap.to(cardElement, {
              scale: 0.95 + (activeProgress * 0.05), // 0.95 to 1.0
              opacity: 0.6 + (activeProgress * 0.4), // 0.6 to 1.0
              padding: `calc(1rem + ${activeProgress * 0.5}rem) calc(1.25rem + ${activeProgress * 0.75}rem)`,
              duration: 0.3,
              ease: 'power2.out',
            })
          } else {
            // Inactive card
            gsap.to(cardElement, {
              scale: 0.95,
              opacity: 0.6,
              padding: '1rem 1.25rem',
              duration: 0.3,
              ease: 'power2.out',
            })
          }
        },
      })
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
          className="space-y-4 md:space-y-5 lg:space-y-6"
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
    offset: ['start center', 'end center'],
  })

  // Smooth scale and opacity based on scroll position
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6])
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15])
  const graphicsY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10])

  return (
    <motion.div
      ref={panelRef}
      className="story-panel relative flex items-center justify-center"
    >
      <motion.div
        className="story-card glass-premium rounded-glass-xl relative overflow-hidden w-full max-w-5xl"
        style={{
          scale: prefersReducedMotion ? 1 : scale,
          opacity: prefersReducedMotion ? 1 : opacity,
        }}
        initial={{ scale: 0.95, opacity: 0.6 }}
      >
        {/* Subtle background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} pointer-events-none`}
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.25, 0.25, 0.15]),
          }}
        />
        
        {/* Minimal background graphics */}
        <motion.div
          className="panel-graphics absolute top-0 right-0 w-36 h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 opacity-8 pointer-events-none"
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

        <div className="relative z-10 p-4 md:p-5 lg:p-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5 lg:gap-6">
            {/* Minimal icon */}
            <motion.div
              className="flex-shrink-0 relative"
              animate={prefersReducedMotion ? {} : {
                rotate: [0, 2, -2, 0],
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
                className={`absolute inset-0 blur-lg ${panel.borderColor === 'border-neon-blue/20' ? 'bg-neon-blue/10' : panel.borderColor === 'border-neon-purple/20' ? 'bg-neon-purple/10' : 'bg-neon-pink/10'} rounded-full`}
                style={{
                  opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.4, 0.4, 0.2]),
                  scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1.1, 1.1, 1]),
                }}
              />
              <IconComponent
                className={`w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 ${panel.borderColor === 'border-neon-blue/20' ? 'text-neon-blue' : panel.borderColor === 'border-neon-purple/20' ? 'text-neon-purple' : 'text-neon-pink'} relative z-10 transition-all duration-500`}
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
                className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 text-white"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {panel.title}
              </motion.h2>
              <motion.p
                className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {panel.description}
              </motion.p>
            </motion.div>
          </div>

          {/* Subtle border accent */}
          <motion.div
            className={`absolute inset-0 border ${panel.borderColor} rounded-glass-xl pointer-events-none`}
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.25, 0.25, 0.1]),
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
