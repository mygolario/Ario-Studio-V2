'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  Sparkles, 
  Globe, 
  Layout, 
  ShoppingCart,
  Users,
  Building2,
  Briefcase,
  FileText,
  BookOpen,
  HelpCircle,
  Mail,
  Calendar,
  Menu,
  X
} from 'lucide-react'
import Container from '@/components/ui/Container'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface MegaMenuContent {
  title: string
  description: string
  icon: React.ComponentType<any>
  link: string
}

interface NavItem {
  label: string
  megaMenu?: MegaMenuContent[]
}

const navItems: NavItem[] = [
  {
    label: 'Services',
    megaMenu: [
      {
        title: 'AI Agents & Automation',
        description: 'Custom AI-powered workflows and intelligent systems',
        icon: Sparkles,
        link: '#',
      },
      {
        title: 'Cinematic Websites',
        description: 'Scroll-based storytelling and interactive experiences',
        icon: Globe,
        link: '#',
      },
      {
        title: 'SaaS Dashboards & Tools',
        description: 'Modern, scalable web applications and platforms',
        icon: Layout,
        link: '#',
      },
      {
        title: 'E-commerce & Platforms',
        description: 'High-performance online stores and marketplaces',
        icon: ShoppingCart,
        link: '#',
      },
    ],
  },
  {
    label: 'Solutions',
    megaMenu: [
      {
        title: 'For Founders & Startups',
        description: 'Launch your product with cinematic web presence',
        icon: Users,
        link: '#',
      },
      {
        title: 'For Agencies',
        description: 'White-label solutions and partnership opportunities',
        icon: Building2,
        link: '#',
      },
      {
        title: 'For SaaS & Product Teams',
        description: 'Scalable platforms and automation systems',
        icon: Briefcase,
        link: '#',
      },
      {
        title: 'For Enterprise Teams',
        description: 'Custom solutions for large-scale operations',
        icon: Building2,
        link: '#',
      },
    ],
  },
  {
    label: 'Studio',
    megaMenu: [
      {
        title: 'About Ario Studio',
        description: 'Our story, mission, and approach',
        icon: Users,
        link: '#about',
      },
      {
        title: 'Process',
        description: 'How we design, build, and deliver',
        icon: FileText,
        link: '#process',
      },
      {
        title: 'Team',
        description: 'Meet the creators behind Ario Studio',
        icon: Users,
        link: '#',
      },
      {
        title: 'Principles',
        description: 'Our philosophy and design principles',
        icon: Sparkles,
        link: '#',
      },
    ],
  },
  {
    label: 'Resources',
    megaMenu: [
      {
        title: 'Case Studies',
        description: 'Explore our selected work and projects',
        icon: FileText,
        link: '#portfolio',
      },
      {
        title: 'Playbook & Guides',
        description: 'Resources for building cinematic experiences',
        icon: BookOpen,
        link: '#',
      },
      {
        title: 'Blog',
        description: 'Insights on design, development, and AI',
        icon: FileText,
        link: '#',
      },
      {
        title: 'FAQs',
        description: 'Common questions and answers',
        icon: HelpCircle,
        link: '#',
      },
    ],
  },
  {
    label: 'Contact',
    megaMenu: [
      {
        title: 'Book a cinematic build',
        description: 'Schedule a consultation for your project',
        icon: Calendar,
        link: '#contact',
      },
      {
        title: 'Email us',
        description: 'Get in touch via email',
        icon: Mail,
        link: 'mailto:hello@ariostudio.com',
      },
    ],
  },
]

export default function Header() {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container size="xl">
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <motion.a
            href="/"
            className="text-2xl md:text-3xl font-display font-bold text-text-primary"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Ario Studio
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
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {item.label}
                  {item.megaMenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </motion.button>

                {/* Mega Menu */}
                <AnimatePresence>
                  {activeMenu === item.label && item.megaMenu && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-[600px] glass-premium rounded-glass-xl p-6 shadow-strong"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {item.megaMenu.map((menuItem, index) => {
                          const IconComponent = menuItem.icon
                          return (
                            <motion.a
                              key={index}
                              href={menuItem.link}
                              className="group p-4 rounded-lg hover:bg-surface-glass transition-all"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ y: -2 }}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <IconComponent className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                                    {menuItem.title}
                                  </h3>
                                  <p className="text-xs text-text-muted leading-relaxed">
                                    {menuItem.description}
                                  </p>
                                </div>
                              </div>
                            </motion.a>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
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
              className="lg:hidden border-t border-border py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map((item) => (
                <div key={item.label} className="mb-4">
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                    onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                  >
                    <span className="font-medium">{item.label}</span>
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
                        className="pl-4 mt-2 space-y-2"
                      >
                        {item.megaMenu.map((menuItem, index) => {
                          const IconComponent = menuItem.icon
                          return (
                            <motion.a
                              key={index}
                              href={menuItem.link}
                              className="block p-3 rounded-lg hover:bg-surface-glass transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <div className="flex items-start gap-3">
                                <IconComponent className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                <div>
                                  <h3 className="text-sm font-semibold text-text-primary mb-1">
                                    {menuItem.title}
                                  </h3>
                                  <p className="text-xs text-text-muted">
                                    {menuItem.description}
                                  </p>
                                </div>
                              </div>
                            </motion.a>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  )
}

