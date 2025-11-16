'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function CTABand() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background pointer-events-none" />

      <Container size="xl">
        <motion.div
          className="glass-premium rounded-glass-xl p-12 md:p-16 lg:p-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="space-y-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight tracking-tight">
              Ready for your cinematic build?
            </h2>
            <p className="text-xl md:text-2xl text-text-muted leading-relaxed font-light">
              Let's transform your vision into an interactive, AI-powered experience that captivates your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="primary" size="lg" className="text-lg px-8 py-4 group">
                Book a consultation
                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                View case studies
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

