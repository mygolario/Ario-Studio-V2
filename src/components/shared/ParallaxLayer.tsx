'use client'

import { ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
}

export default function ParallaxLayer({ 
  children, 
  speed = 0.5,
  className = '' 
}: ParallaxLayerProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed])

  return (
    <motion.div
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

