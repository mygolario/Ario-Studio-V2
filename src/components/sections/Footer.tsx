'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

const socialLinks = [
  { icon: FaGithub, href: '#', label: 'GitHub' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-display font-bold neon-glow-blue">
              Ario Studio
            </h3>
            <p className="text-white/60 text-sm mt-1">
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
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white/70 hover:text-neon-blue transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Subtle neon divider */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
      </Container>
    </footer>
  )
}

