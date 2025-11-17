import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import FullScreenGradientBackground from '@/components/shared/FullScreenGradientBackground'

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
        {/* Full-screen animated gradient background */}
        <FullScreenGradientBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}

