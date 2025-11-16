'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const services = [
  {
    title: 'Web Design & Branding',
    description: 'Creating visually stunning, user-centered designs that tell your story and connect with your audience.',
    features: ['UI/UX Design', 'Design Systems', 'Brand Identity', 'Visual Strategy'],
    icon: '🎨',
    glow: 'blue' as const,
  },
  {
    title: 'Web Development',
    description: 'Building high-performance, scalable web applications with modern technologies and best practices.',
    features: ['Frontend Development', 'Backend Systems', 'Performance Optimization', 'API Integration'],
    icon: '⚡',
    glow: 'purple' as const,
  },
  {
    title: 'AI Automation & Agents',
    description: 'Leveraging AI to automate workflows, create intelligent systems, and enhance productivity.',
    features: ['Workflow Automation', 'AI Agents', 'Custom Integrations', 'Process Optimization'],
    icon: '🤖',
    glow: 'pink' as const,
  },
]

export default function Services() {
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
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 neon-glow-purple">
            What We Do
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover glow={service.glow} className="h-full">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-white/80">
                      <span className="w-2 h-2 bg-neon-blue rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

