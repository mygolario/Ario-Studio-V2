'use client'

import { motion } from 'framer-motion'
import ServiceSection from './ServiceSection'

const serviceSections = [
  {
    headline: 'We Design Intelligent Experiences',
    subhead: 'High-end UX, motion design, and branded digital journeys crafted for precision.',
    bullets: [
      { text: 'Modern, expressive UI systems', icon: 'check' as const },
      { text: 'Cinematic scroll storytelling', icon: 'spark' as const },
      { text: 'High-performance, responsive layouts', icon: 'check' as const },
      { text: 'Brand-aligned visual language', icon: 'spark' as const },
    ],
    gradientColor: 'blue' as const,
  },
  {
    headline: 'We Build Advanced Web Systems',
    subhead: 'Next.js, AI-driven automation, and production-ready platforms engineered for scale.',
    bullets: [
      { text: 'Full-stack Next.js architecture', icon: 'zap' as const },
      { text: 'Secure database & auth layers', icon: 'check' as const },
      { text: 'Optimized performance & SEO', icon: 'zap' as const },
      { text: 'Pixel-perfect component engineering', icon: 'check' as const },
    ],
    gradientColor: 'purple' as const,
  },
  {
    headline: 'We Automate Your Operations',
    subhead: 'Custom AI agents, workflow integration, and automated systems that save time.',
    bullets: [
      { text: 'AI-powered assistants & agents', icon: 'spark' as const },
      { text: 'Data-driven decision pipelines', icon: 'zap' as const },
      { text: 'Automated business workflows', icon: 'check' as const },
      { text: 'Integrations with any tool or API', icon: 'spark' as const },
    ],
    gradientColor: 'pink' as const,
  },
]

export default function ScrollStory() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/30 to-dark/70 pointer-events-none" />
      
      <div className="relative">
        {serviceSections.map((section, index) => (
          <ServiceSection
            key={index}
            headline={section.headline}
            subhead={section.subhead}
            bullets={section.bullets}
            gradientColor={section.gradientColor}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
