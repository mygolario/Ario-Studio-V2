'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGSAPScrollAnimations() {
  useEffect(() => {
    // Set up smooth scrolling
    gsap.to('html', {
      scrollBehavior: 'smooth',
      duration: 0,
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
}

export { gsap, ScrollTrigger }

