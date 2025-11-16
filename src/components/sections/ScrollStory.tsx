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
    glowClass: 'neon-glow-blue',
    borderColor: 'border-neon-blue',
    gradient: 'from-neon-blue/30 to-neon-cyan/20',
    icon: Palette,
    svg: '/mockups/abstract-shape-1.svg',
  },
  {
    title: 'We Build',
    description: 'Transforming designs into high-performance, scalable applications. Clean code, modern frameworks, and attention to detail in every line.',
    glowClass: 'neon-glow-purple',
    borderColor: 'border-neon-purple',
    gradient: 'from-neon-purple/30 to-neon-pink/20',
    icon: Zap,
    svg: '/mockups/circuit-pattern.svg',
  },
  {
    title: 'We Automate',
    description: 'Leveraging AI and automation to streamline workflows, reduce manual tasks, and create intelligent systems that work for you 24/7.',
    glowClass: 'neon-glow-pink',
    borderColor: 'border-neon-pink',
    gradient: 'from-neon-pink/30 to-neon-purple/20',
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
      
      // GSAP ScrollTrigger pinning for cinematic storytelling
      ScrollTrigger.create({
        trigger: panelElement,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onEnter: () => {
          gsap.to(panelElement, {
            scale: 1.02,
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

      // Parallax for background graphics
      const graphics = panelElement.querySelector('.panel-graphics')
      if (graphics) {
        gsap.to(graphics, {
          y: -100,
          scrollTrigger: {
            trigger: panelElement,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // Text parallax
      const text = panelElement.querySelector('.panel-text')
      if (text) {
        gsap.to(text, {
          y: 50,
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
      className="relative py-32 md:py-48 lg:py-64 overflow-hidden"
      style={{ opacity: prefersReducedMotion ? 1 : containerOpacity }}
    >
      {/* Background gradient overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/60 to-dark/90 pointer-events-none" />
      
      <Container>
        <motion.div
          className="space-y-32 md:space-y-48 lg:space-y-64"
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

  // Parallax transforms
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60])
  const graphicsY = useTransform(scrollYProgress, [0, 0.5, 1], [-40, 0, 40])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <motion.div
      ref={panelRef}
      className="story-panel relative min-h-[80vh] flex items-center"
      style={{
        opacity: prefersReducedMotion ? 1 : opacity,
        scale: prefersReducedMotion ? 1 : scale,
      }}
    >
      <div className="glass-premium rounded-glass-xl p-10 md:p-16 lg:p-20 relative overflow-hidden w-full">
        {/* Background gradient with depth */}
        <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} opacity-40 pointer-events-none`} />
        
        {/* Animated background graphics with parallax */}
        <motion.div
          className="panel-graphics absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] opacity-15 pointer-events-none"
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
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-20">
            {/* Premium animated icon with lighting flare */}
            <motion.div
              className="flex-shrink-0 relative"
              animate={prefersReducedMotion ? {} : {
                rotate: [0, 5, -5, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: index * 0.6,
                ease: 'easeInOut',
              }}
            >
              {/* Icon glow flare */}
              <motion.div
                className={`absolute inset-0 blur-2xl ${panel.glowClass === 'neon-glow-blue' ? 'bg-neon-blue/40' : panel.glowClass === 'neon-glow-purple' ? 'bg-neon-purple/40' : 'bg-neon-pink/40'} rounded-full`}
                animate={prefersReducedMotion ? {} : {
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <IconComponent
                className={`w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 ${panel.glowClass === 'neon-glow-blue' ? 'text-neon-blue' : panel.glowClass === 'neon-glow-purple' ? 'text-neon-purple' : 'text-neon-pink'} relative z-10`}
                strokeWidth={1.5}
              />
            </motion.div>
            
            {/* Text content with parallax */}
            <motion.div
              className="panel-text flex-1 text-center md:text-left"
              style={{
                y: prefersReducedMotion ? 0 : textY,
              }}
            >
              <motion.h2
                className={`text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-white`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {panel.title}
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {panel.description}
              </motion.p>
            </motion.div>
          </div>

          {/* Animated border glow */}
          <motion.div
            className={`absolute inset-0 border-2 ${panel.borderColor} rounded-glass-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            animate={prefersReducedMotion ? {} : {
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 1,
            }}
          />
        </div>

        {/* Corner accent with particle effect */}
        <div className="absolute top-6 right-6 w-32 h-32 opacity-15 pointer-events-none">
          <div className={`w-full h-full border-2 ${panel.borderColor} rounded-full blur-2xl`} />
        </div>
      </div>
    </motion.div>
  )
}
