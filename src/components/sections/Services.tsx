'use client'

import { motion } from 'framer-motion'
import { Palette, Zap, Bot } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const services = [
  {
    title: 'Web Design & Branding',
    description: 'Creating visually stunning, user-centered designs that tell your story and connect with your audience.',
    features: ['UI/UX Design', 'Design Systems', 'Brand Identity', 'Visual Strategy'],
    icon: Palette,
    glow: 'blue' as const,
    gradient: 'from-neon-blue/20 via-neon-cyan/10 to-transparent',
  },
  {
    title: 'Web Development',
    description: 'Building high-performance, scalable web applications with modern technologies and best practices.',
    features: ['Frontend Development', 'Backend Systems', 'Performance Optimization', 'API Integration'],
    icon: Zap,
    glow: 'purple' as const,
    gradient: 'from-neon-purple/20 via-neon-pink/10 to-transparent',
  },
  {
    title: 'AI Automation & Agents',
    description: 'Leveraging AI to automate workflows, create intelligent systems, and enhance productivity.',
    features: ['Workflow Automation', 'AI Agents', 'Custom Integrations', 'Process Optimization'],
    icon: Bot,
    glow: 'pink' as const,
    gradient: 'from-neon-pink/20 via-neon-purple/10 to-transparent',
  },
]

export default function Services() {
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
            What We Do
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card hover glow={service.glow} className="h-full group relative overflow-hidden">
                  {/* Subtle ambient light behind card */}
                  <div className={`absolute -inset-2 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 pointer-events-none`} />
                  
                  {/* Premium animated icon */}
                  <motion.div
                    className="relative z-10 mb-5 inline-flex"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      {/* Subtle icon glow */}
                      <div className={`absolute inset-0 blur-lg ${service.glow === 'blue' ? 'bg-neon-blue/20' : service.glow === 'purple' ? 'bg-neon-purple/20' : 'bg-neon-pink/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <IconComponent 
                        className={`w-16 h-16 md:w-20 md:h-20 ${service.glow === 'blue' ? 'text-neon-blue' : service.glow === 'purple' ? 'text-neon-purple' : 'text-neon-pink'} transition-colors duration-300`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>

                  <h3 className="text-xl md:text-2xl lg:text-2xl font-display font-bold mb-3 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-white/75 mb-6 leading-relaxed relative z-10 text-sm md:text-base">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 relative z-10">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={feature}
                        className="flex items-center text-white/90"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + idx * 0.05 }}
                      >
                        <motion.span
                          className={`w-2 h-2 ${service.glow === 'blue' ? 'bg-neon-blue' : service.glow === 'purple' ? 'bg-neon-purple' : 'bg-neon-pink'} rounded-full mr-3`}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.2,
                          }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
