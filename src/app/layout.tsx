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
            gradientBackgroundStart="rgb(15, 15, 20)"
            gradientBackgroundEnd="rgb(0, 17, 82)"
            firstColor="168, 85, 247"
            secondColor="0, 212, 255"
            thirdColor="236, 72, 153"
            fourthColor="14, 165, 233"
            fifthColor="168, 85, 247"
            pointerColor="140, 100, 255"
            size="80%"
            blendingValue="hard-light"
            interactive={true}
            containerClassName="w-full h-full"
          />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}

