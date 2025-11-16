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

      {/* Minimal glow spots - toned down */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 md:w-[600px] md:h-[600px] bg-neon-blue/4 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-[500px] md:h-[500px] bg-neon-purple/4 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 8,
        }}
      />

      {/* Gradient fog overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark/90" />
      
      {/* Minimal top spotlight */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-b from-white/3 via-transparent to-transparent blur-3xl"
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
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

