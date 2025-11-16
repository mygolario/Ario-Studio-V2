'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const projects = [
  {
    title: 'Nexus Platform',
    subtitle: 'AI-Powered Analytics Dashboard',
    tags: ['Web Design', 'Development', 'AI Integration'],
    glow: 'blue' as const,
  },
  {
    title: 'Aurora Branding',
    subtitle: 'Complete Brand Identity System',
    tags: ['Branding', 'Web Design'],
    glow: 'purple' as const,
  },
  {
    title: 'Quantum Workspace',
    subtitle: 'Collaborative Productivity Suite',
    tags: ['Web Design', 'Development'],
    glow: 'pink' as const,
  },
  {
    title: 'Stellar E-Commerce',
    subtitle: 'Modern Shopping Experience',
    tags: ['E-Commerce', 'Web Design'],
    glow: 'blue' as const,
  },
  {
    title: 'Neon Agency Site',
    subtitle: 'Creative Portfolio Platform',
    tags: ['Web Design', 'Branding'],
    glow: 'purple' as const,
  },
  {
    title: 'Automation Hub',
    subtitle: 'AI Workflow Management',
    tags: ['AI Automation', 'Development'],
    glow: 'pink' as const,
  },
]

export default function Portfolio() {
  return (
    <section className="relative py-20 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 neon-glow-blue">
            Our Work
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Showcasing digital experiences that push boundaries and inspire
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover glow={project.glow} className="h-full">
                <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                  <img 
                    src="/mockups/device-frame.svg" 
                    alt={project.title}
                    className="w-full h-full object-contain opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4">{project.subtitle}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs glass rounded-full text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

