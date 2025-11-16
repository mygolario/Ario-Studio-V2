'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

export default function About() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 md:mb-8 text-white">
              About Ario Studio
            </h2>
            <div className="space-y-4 text-lg text-white/80 leading-relaxed">
              <p>
                We're a creative agency at the intersection of design, technology, and innovation. 
                Our mission is to build digital experiences that don't just look beautiful—they feel alive, 
                respond intuitively, and create lasting connections.
              </p>
              <p>
                With expertise spanning from pixel-perfect UI design to cutting-edge AI automation, 
                we help brands and businesses transform their digital presence into something extraordinary.
              </p>
              <p>
                Every project is an opportunity to push boundaries, experiment with new technologies, 
                and craft solutions that stand out in an increasingly digital world.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass-premium rounded-glass-xl p-8 md:p-12 aspect-square flex items-center justify-center relative overflow-hidden">
              {/* Subtle gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/3 to-transparent" />
              
              <motion.div
                className="relative z-10 text-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-40 h-40 md:w-52 md:h-52 mx-auto mb-5 relative">
                  <div className="absolute inset-0 border border-white/20 rounded-full" />
                  <div className="absolute inset-4 border border-white/15 rounded-full" />
                  <div className="absolute inset-8 border border-white/10 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl md:text-6xl">✨</div>
                  </div>
                </div>
                <p className="text-white/50 text-sm">Creative Vision</p>
              </motion.div>

              {/* Subtle border accent */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

