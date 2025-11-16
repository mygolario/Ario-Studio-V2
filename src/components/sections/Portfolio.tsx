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
    <section className="relative py-24 md:py-32 lg:py-40">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 text-white">
            Our Work
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto">
            Showcasing digital experiences that push boundaries and inspire
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover glow={project.glow} className="h-full group">
                {/* Project preview with depth */}
                <div className="aspect-video bg-gradient-to-br from-white/5 via-white/3 to-transparent rounded-glass-lg mb-5 flex items-center justify-center overflow-hidden relative">
                  <img 
                    src="/mockups/device-frame.svg" 
                    alt={project.title}
                    className="w-full h-full object-contain opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                  
                  {/* Subtle hover overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.glow === 'blue' ? 'from-neon-blue/10' : project.glow === 'purple' ? 'from-neon-purple/10' : 'from-neon-pink/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
                  {project.title}
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">{project.subtitle}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="px-4 py-1.5 text-xs glass-premium rounded-full text-white/90"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {tag}
                    </motion.span>
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

