'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'

const storyPanels = [
  {
    title: 'We Design',
    description: 'Crafting beautiful, intuitive interfaces and design systems that resonate with users. From wireframes to pixel-perfect designs, we bring ideas to visual life.',
    glowClass: 'neon-glow-blue',
    borderColor: 'border-neon-blue',
    icon: '🎨',
  },
  {
    title: 'We Build',
    description: 'Transforming designs into high-performance, scalable applications. Clean code, modern frameworks, and attention to detail in every line.',
    glowClass: 'neon-glow-purple',
    borderColor: 'border-neon-purple',
    icon: '⚡',
  },
  {
    title: 'We Automate',
    description: 'Leveraging AI and automation to streamline workflows, reduce manual tasks, and create intelligent systems that work for you 24/7.',
    glowClass: 'neon-glow-pink',
    borderColor: 'border-neon-pink',
    icon: '🤖',
  },
]

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      <Container>
        <motion.div
          style={{ opacity, y }}
          className="space-y-32 md:space-y-48"
        >
          {storyPanels.map((panel, index) => (
            <StoryPanel
              key={panel.title}
              panel={panel}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

function StoryPanel({
  panel,
  index,
  scrollProgress,
}: {
  panel: typeof storyPanels[0]
  index: number
  scrollProgress: any
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: panelProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(
    panelProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  )
  const scale = useTransform(panelProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const x = useTransform(
    panelProgress,
    [0, 0.5, 1],
    index % 2 === 0 ? [-100, 0, 100] : [100, 0, -100]
  )

  return (
    <motion.div
      ref={panelRef}
      style={{ opacity, scale, x }}
      className="relative"
    >
      <div className="glass-strong rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <motion.div
            className="text-6xl md:text-8xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
          >
            {panel.icon}
          </motion.div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className={`text-4xl md:text-6xl font-display font-bold mb-4 ${panel.glowClass}`}>
              {panel.title}
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              {panel.description}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
          <div className={`w-full h-full border-2 ${panel.borderColor} rounded-full blur-xl`} />
        </div>
      </div>
    </motion.div>
  )
}

