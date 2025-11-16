'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

export default function About() {
  return (
    <section className="relative py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 neon-glow-pink">
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
            <div className="glass-strong rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
              {/* Holographic portrait effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20" />
              
              <motion.div
                className="relative z-10 text-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 relative">
                  <div className="absolute inset-0 border-4 border-neon-blue/50 rounded-full animate-pulse-slow" />
                  <div className="absolute inset-4 border-4 border-neon-purple/50 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute inset-8 border-4 border-neon-pink/50 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl md:text-8xl">✨</div>
                  </div>
                </div>
                <p className="text-white/60 text-sm">Creative Vision</p>
              </motion.div>

              {/* Neon outline effect */}
              <div className="absolute inset-0 border-2 border-neon-blue/30 rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

