'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react'
import Container from '@/components/ui/Container'

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub', color: 'text-neon-blue' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'text-neon-cyan' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'text-neon-purple' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'text-neon-pink' },
]

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-display font-bold neon-glow-blue mb-2">
              Ario Studio
            </h3>
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4"
          >
            {socialLinks.map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className={`w-12 h-12 glass-premium rounded-glass-lg flex items-center justify-center ${color} hover:text-white transition-colors relative group`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={22} strokeWidth={1.5} />
                {/* Icon glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-glass-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundColor: color === 'text-neon-blue' 
                      ? 'rgba(0, 212, 255, 0.2)'
                      : color === 'text-neon-cyan'
                      ? 'rgba(6, 182, 212, 0.2)'
                      : color === 'text-neon-purple'
                      ? 'rgba(168, 85, 247, 0.2)'
                      : 'rgba(236, 72, 153, 0.2)',
                  }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Enhanced neon divider */}
        <motion.div
          className="mt-12 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </Container>
    </footer>
  )
}
