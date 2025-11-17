'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Play } from 'lucide-react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface MegaMenuContent {
  description: string
  links: {
    title: string
    href: string
  }[]
  highlight: {
    title: string
    text: string
  }
}

interface NavItem {
  label: string
  megaMenu?: MegaMenuContent
}

const navItems: NavItem[] = [
  {
    label: 'Services',
    megaMenu: {
      description: 'From concept to cinematic AI-driven websites.',
      links: [
        { title: 'AI Websites & Dashboards', href: '#' },
        { title: 'Brand & Visual Systems', href: '#' },
        { title: 'Motion & Interactions', href: '#' },
        { title: 'MVP & Product Design', href: '#' },
      ],
      highlight: {
        title: 'Cinematic experiences',
        text: 'Ultra-luxury, motion-first interfaces tailored for bold brands.',
      },
    },
  },
  {
    label: 'Work',
    megaMenu: {
      description: 'Selected projects, experiments, and case studies.',
      links: [
        { title: 'Featured Projects', href: '#portfolio' },
        { title: 'Experimental Lab', href: '#' },
        { title: 'Case Studies', href: '#' },
      ],
      highlight: {
        title: 'View the showreel',
        text: 'See how we combine AI, storytelling, and design.',
      },
    },
  },
  {
    label: 'Studio',
    megaMenu: {
      description: 'Who we are and how we build.',
      links: [
        { title: 'About Ario Studio', href: '#about' },
        { title: 'Process & Workflow', href: '#process' },
        { title: 'Tools & Stack', href: '#' },
      ],
      highlight: {
        title: 'Creative AI lab',
        text: 'A small studio obsessed with detail and motion.',
      },
    },
  },
  {
    label: 'Resources',
    megaMenu: {
      description: 'Playbooks and templates for founders.',
      links: [
        { title: 'Free Templates', href: '#' },
        { title: 'Articles & Playbooks', href: '#' },
        { title: "Ario's Notebook", href: '#' },
      ],
      highlight: {
        title: 'Build smarter',
        text: 'Insights from shipping real AI-powered products.',
      },
    },
  },
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/60 backdrop-blur-2xl border-b border-border/50 shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-2 group"
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {/* AI Orb Logo */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 w-8 h-8 rounded-full bg-primary/30 blur-md group-hover:blur-lg transition-all" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-text-primary tracking-tight">
              Ario Studio
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1" ref={menuRef}>
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <motion.button
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 relative"
                  whileHover={{ y: prefersReducedMotion ? 0 : -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {item.label}
                  {item.megaMenu && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        activeMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                  {/* Active indicator */}
                  {activeMenu === item.label && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>

                {/* Mega Menu */}
                <AnimatePresence>
                  {activeMenu === item.label && item.megaMenu && (
                    <motion.div
                      className="absolute top-full left-0 mt-4 w-[700px] rounded-2xl overflow-hidden"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="glass-premium border border-border/50 backdrop-blur-2xl p-8 shadow-strong">
                        <div className="grid grid-cols-2 gap-8">
                          {/* Left: Links */}
                          <div className="space-y-6">
                            <div>
                              <p className="text-xs uppercase tracking-wider text-text-muted mb-4">
                                {item.label}
                              </p>
                              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                                {item.megaMenu.description}
                              </p>
                            </div>
                            <div className="space-y-2">
                              {item.megaMenu.links.map((link, index) => (
                                <motion.a
                                  key={index}
                                  href={link.href}
                                  className="block group/link"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ x: 4 }}
                                >
                                  <div className="flex items-center gap-3 py-2">
                                    <div className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                    <span className="text-sm font-medium text-text-primary group-hover/link:text-primary transition-colors">
                                      {link.title}
                                    </span>
                                  </div>
                                </motion.a>
                              ))}
                            </div>
                          </div>

                          {/* Right: Highlight Card */}
                          <div className="relative">
                            <motion.div
                              className="relative h-full rounded-xl overflow-hidden p-6 border border-border/30 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              {/* Lens flare effect in background */}
                              <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary rounded-full blur-2xl" />
                              </div>
                              <div className="relative z-10">
                                <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
                                  {item.megaMenu.highlight.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                  {item.megaMenu.highlight.text}
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* CTA Button */}
            <motion.a
              href="#contact"
              className="ml-4 px-6 py-2.5 text-sm font-medium bg-primary text-background rounded-xl hover:bg-primary-light transition-colors shadow-glow-accent hover:shadow-glow-accent-lg"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a project
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-border/50 py-6 backdrop-blur-xl bg-background/80"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <div key={item.label} className="mb-6">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-text-secondary hover:text-text-primary transition-colors font-medium"
                    onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    {item.megaMenu && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeMenu === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeMenu === item.label && item.megaMenu && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-2 space-y-4"
                      >
                        <p className="text-xs text-text-muted mb-3">
                          {item.megaMenu.description}
                        </p>
                        {item.megaMenu.links.map((link, index) => (
                          <motion.a
                            key={index}
                            href={link.href}
                            className="block py-2 text-sm text-text-primary hover:text-primary transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.title}
                          </motion.a>
                        ))}
                        <div className="mt-4 p-4 rounded-xl border border-border/30 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
                          <h4 className="text-sm font-semibold text-text-primary mb-1">
                            {item.megaMenu.highlight.title}
                          </h4>
                          <p className="text-xs text-text-secondary">
                            {item.megaMenu.highlight.text}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <motion.a
                href="#contact"
                className="block w-full mt-4 px-6 py-3 text-center text-sm font-medium bg-primary text-background rounded-xl hover:bg-primary-light transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a project
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

