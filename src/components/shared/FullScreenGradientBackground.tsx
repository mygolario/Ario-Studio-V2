'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export default function FullScreenGradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return

    const container = containerRef.current
    const blobs = container.querySelectorAll('.gradient-blob') as NodeListOf<HTMLElement>

    // Animate each blob with different speeds and directions
    blobs.forEach((blob, index) => {
      const duration = 20 + index * 5 // 20s, 25s, 30s
      const delay = index * 2
      
      blob.style.animation = `gradientFloat${index} ${duration}s ease-in-out infinite`
      blob.style.animationDelay = `${delay}s`
    })

    // Add keyframes dynamically
    const style = document.createElement('style')
    style.textContent = `
      @keyframes gradientFloat0 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -30px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      @keyframes gradientFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-40px, 40px) scale(1.15); }
        66% { transform: translate(25px, -25px) scale(0.85); }
      }
      @keyframes gradientFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(20px, 30px) scale(1.05); }
        66% { transform: translate(-30px, -20px) scale(0.95); }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <div 
        ref={containerRef}
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />
    )
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Blob 1: Purple/Blue */}
      <div 
        className="gradient-blob absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(0, 212, 255, 0.3) 50%, transparent 100%)',
          top: '10%',
          left: '10%',
        }}
      />
      
      {/* Blob 2: Cyan/Magenta */}
      <div 
        className="gradient-blob absolute w-[700px] h-[700px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 100%)',
          top: '60%',
          right: '15%',
        }}
      />
      
      {/* Blob 3: Purple/Magenta */}
      <div 
        className="gradient-blob absolute w-[900px] h-[900px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.25) 50%, transparent 100%)',
          bottom: '10%',
          left: '50%',
        }}
      />

      {/* Grain/Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  )
}

