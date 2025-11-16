'use client'

import Hero from '@/components/sections/Hero'
import ScrollStory from '@/components/sections/ScrollStory'
import Portfolio from '@/components/sections/Portfolio'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import { useGSAPScrollAnimations } from '@/lib/gsap-setup'

export default function Home() {
  useGSAPScrollAnimations()

  return (
    <main className="relative">
      <Hero />
      <ScrollStory />
      <Portfolio />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}

