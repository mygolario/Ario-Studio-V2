'use client'

import Navbar from '@/components/layout/Navbar'
import CinematicHero from '@/components/sections/CinematicHero'
import ScrollStory from '@/components/sections/ScrollStory'
import Portfolio from '@/components/sections/Portfolio'
import FeatureCapsules from '@/components/sections/FeatureCapsules'
import About from '@/components/sections/About'
import PipelineTimeline from '@/components/sections/PipelineTimeline'
import CTABand from '@/components/sections/CTABand'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import { useGSAPScrollAnimations } from '@/lib/gsap-setup'

export default function Home() {
  useGSAPScrollAnimations()

  return (
    <main className="relative">
      <Navbar />
      <CinematicHero />
      <ScrollStory />
      <Portfolio />
      <FeatureCapsules />
      <About />
      <PipelineTimeline />
      <CTABand />
      <Contact />
      <Footer />
    </main>
  )
}
