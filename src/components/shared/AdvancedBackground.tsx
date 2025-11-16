'use client'

import { motion } from 'framer-motion'
import AdvancedParticleSystem from './AdvancedParticleSystem'

export default function AdvancedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <AdvancedParticleSystem />
      
      {/* Base gradient fog with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/98 to-dark" />
      
      {/* Multi-layer nebula system */}
      {/* Layer 1 - Deep background nebula */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(ellipse 100% 60% at 15% 25%, rgba(0, 212, 255, 0.2) 0%, transparent 60%)',
            'radial-gradient(ellipse 100% 60% at 85% 75%, rgba(168, 85, 247, 0.2) 0%, transparent 60%)',
            'radial-gradient(ellipse 100% 60% at 15% 25%, rgba(0, 212, 255, 0.2) 0%, transparent 60%)',
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Layer 2 - Midground nebula */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse 70% 50% at 70% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse 70% 50% at 30% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse 70% 50% at 70% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 8,
        }}
      />

      {/* Layer 3 - Foreground accent nebula */}
      <motion.div
        className="absolute inset-0 opacity-25"
        animate={{
          background: [
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 40%)',
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 40%)',
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 40%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Volumetric glow spots with enhanced motion */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 md:w-[600px] md:h-[600px] bg-neon-blue/12 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 80, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-[700px] md:h-[700px] bg-neon-purple/12 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.6, 0.2],
          x: [0, -60, 0],
          y: [0, 70, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-48 h-48 md:w-96 md:h-96 bg-neon-pink/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 10,
        }}
      />

      {/* Additional accent glows */}
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-40 h-40 md:w-80 md:h-80 bg-neon-cyan/8 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 7,
        }}
      />

      {/* Gradient fog overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark/90" />
      
      {/* Top cinematic spotlight */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[700px] bg-gradient-to-b from-neon-blue/15 via-neon-purple/8 to-transparent blur-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soft vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-dark/30" 
           style={{
             background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
           }}
      />
    </div>
  )
}

