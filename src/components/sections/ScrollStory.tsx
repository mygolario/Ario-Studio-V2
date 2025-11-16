'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
    icon: '🎨',
    svg: '/mockups/abstract-shape-1.svg',
  },
  {
    title: 'We Build',
    description: 'Transforming designs into high-performance, scalable applications. Clean code, modern frameworks, and attention to detail in every line.',
    glowClass: 'neon-glow-purple',
    borderColor: 'border-neon-purple',
    gradient: 'from-neon-purple/30 to-neon-pink/20',
    icon: '⚡',
    svg: '/mockups/circuit-pattern.svg',
  },
  {
    title: 'We Automate',
    description: 'Leveraging AI and automation to streamline workflows, reduce manual tasks, and create intelligent systems that work for you 24/7.',
    glowClass: 'neon-glow-pink',
    borderColor: 'border-neon-pink',
    gradient: 'from-neon-pink/30 to-neon-purple/20',
    icon: '🤖',
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
      
      // Create scroll-triggered animations for each panel
      gsap.fromTo(
        panelElement,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panelElement,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Parallax effect for background graphics
      const graphics = panelElement.querySelector('.panel-graphics')
      if (graphics) {
        gsap.to(graphics, {
          y: -50,
          scrollTrigger: {
            trigger: panelElement,
            start: 'top bottom',
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
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-transparent pointer-events-none" />
      
      <Container>
        <motion.div
          className="space-y-32 md:space-y-48 lg:space-y-64"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {storyPanels.map((panel, index) => (
            <StoryPanel
              key={panel.title}
              panel={panel}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </Container>
    </motion.section>
  )
}

function StoryPanel({
  panel,
  index,
  prefersReducedMotion,
}: {
  panel: typeof storyPanels[0]
  index: number
  prefersReducedMotion: boolean
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  })

  // Parallax transforms
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])
  const graphicsY = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <motion.div
      ref={panelRef}
      className="story-panel relative"
      style={{
        opacity: prefersReducedMotion ? 1 : opacity,
        scale: prefersReducedMotion ? 1 : scale,
      }}
    >
      <div className="glass-premium rounded-glass-xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} opacity-30 pointer-events-none`} />
        
        {/* Animated background graphics */}
        <motion.div
          className="panel-graphics absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 opacity-20 pointer-events-none"
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
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            {/* Icon with enhanced animation */}
            <motion.div
              className="text-6xl md:text-8xl lg:text-9xl flex-shrink-0"
              animate={prefersReducedMotion ? {} : {
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5,
                ease: 'easeInOut',
              }}
            >
              {panel.icon}
            </motion.div>
            
            {/* Text content with parallax */}
            <motion.div
              className="flex-1 text-center md:text-left"
              style={{
                y: prefersReducedMotion ? 0 : textY,
              }}
            >
              <motion.h2
                className={`text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 ${panel.glowClass}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {panel.title}
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {panel.description}
              </motion.p>
            </motion.div>
          </div>

          {/* Decorative border glow */}
          <motion.div
            className={`absolute inset-0 border-2 ${panel.borderColor} rounded-glass-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            animate={prefersReducedMotion ? {} : {
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.8,
            }}
          />
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-24 h-24 opacity-10 pointer-events-none">
          <div className={`w-full h-full border-2 ${panel.borderColor} rounded-full blur-2xl`} />
        </div>
      </div>
    </motion.div>
  )
}
