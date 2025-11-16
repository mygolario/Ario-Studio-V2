'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CinematicBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient fog */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      
      {/* Animated nebula layers */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse 80% 50% at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(236, 72, 153, 0.12) 0%, transparent 50%)',
            'radial-gradient(ellipse 60% 40% at 30% 80%, rgba(168, 85, 247, 0.12) 0%, transparent 50%)',
            'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(236, 72, 153, 0.12) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      {/* Glow spots - responsive sizes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-neon-blue/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-[500px] md:h-[500px] bg-neon-purple/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-48 h-48 md:w-80 md:h-80 bg-neon-pink/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6,
        }}
      />

      {/* Gradient fog overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/40 to-dark/80" />
      
      {/* Top spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/3 bg-gradient-to-b from-neon-blue/5 via-transparent to-transparent" />
    </div>
  )
}

