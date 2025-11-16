'use client'

import { useEffect, useState } from 'react'

interface MousePosition {
  x: number
  y: number
}

export function useMouseParallax(intensity: number = 0.1) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [parallaxOffset, setParallaxOffset] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      const x = (e.clientX - centerX) * intensity
      const y = (e.clientY - centerY) * intensity
      
      setMousePosition({ x: e.clientX, y: e.clientY })
      setParallaxOffset({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [intensity])

  return { mousePosition, parallaxOffset }
}

