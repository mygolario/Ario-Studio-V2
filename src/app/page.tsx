'use client'

import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import ScrollStory from '@/components/sections/ScrollStory'
import Portfolio from '@/components/sections/Portfolio'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import CTABand from '@/components/sections/CTABand'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import AdvancedBackground from '@/components/shared/AdvancedBackground'
import { useGSAPScrollAnimations } from '@/lib/gsap-setup'

export default function Home() {
  useGSAPScrollAnimations()

  return (
    <main className="relative">
      <Header />
      <AdvancedBackground />
      <Hero />
      <ScrollStory />
      <Portfolio />
      <Services />
      <About />
      <Process />
      <CTABand />
      <Contact />
      <Footer />
    </main>
  )
}
