import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import BackgroundGradientAnimation from '@/components/ui/background-gradient-animation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ario Studio | Creative Agency',
  description: 'We Build Digital Experiences That Feel Alive. Creative Agency · Web Design · AI Automations · Branding',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased relative`}>
        {/* Full-screen animated gradient background - baunov/gradients-bg */}
        <div className="fixed inset-0 -z-10">
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(10, 10, 15)"
            gradientBackgroundEnd="rgb(5, 10, 25)"
            firstColor="168, 85, 247"
            secondColor="0, 212, 255"
            thirdColor="236, 72, 153"
            fourthColor="14, 165, 233"
            fifthColor="168, 85, 247"
            pointerColor="140, 100, 255"
            size="80%"
            blendingValue="normal"
            interactive={true}
            containerClassName="w-full h-full"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}

