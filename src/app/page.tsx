'use client'

import Navbar from '@/components/layout/Navbar'
import CinematicHero from '@/components/sections/CinematicHero'
import ScrollStorySection from '@/components/sections/ScrollStorySection'
import AICreativeLabSection from '@/components/sections/AICreativeLabSection'
import Portfolio from '@/components/sections/Portfolio'
import FeatureCapsules from '@/components/sections/FeatureCapsules'
import PipelineTimeline from '@/components/sections/PipelineTimeline'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import { useGSAPScrollAnimations } from '@/lib/gsap-setup'

export default function Home() {
  useGSAPScrollAnimations()

  return (
    <main className="relative z-10">
      <Navbar />
      <CinematicHero />
      <ScrollStorySection />
      <AICreativeLabSection />
      <Portfolio />
      <FeatureCapsules />
      <PipelineTimeline />
      <Contact />
      <Footer />
    </main>
  )
}
