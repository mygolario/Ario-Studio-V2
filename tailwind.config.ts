import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic Figma Theme - Primary Colors
        primary: {
          DEFAULT: '#00d4ff',
          light: '#33ddff',
          dark: '#00a8cc',
        },
        secondary: {
          DEFAULT: '#a855f7',
          light: '#c084fc',
          dark: '#7c3aed',
        },
        accent: {
          DEFAULT: '#ec4899',
          light: '#f472b6',
          dark: '#db2777',
        },
        // Background & Surface
        background: {
          DEFAULT: '#000000',
          secondary: '#0a0a0a',
          tertiary: '#0f0f0f',
        },
        surface: {
          DEFAULT: 'rgba(15, 15, 15, 0.8)',
          elevated: 'rgba(26, 26, 26, 0.9)',
          glass: 'rgba(255, 255, 255, 0.05)',
          'glass-medium': 'rgba(255, 255, 255, 0.1)',
          'glass-strong': 'rgba(255, 255, 255, 0.15)',
        },
        // Text Colors
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.8)',
          muted: 'rgba(255, 255, 255, 0.6)',
          subtle: 'rgba(255, 255, 255, 0.4)',
        },
        // Border Colors
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.2)',
          strong: 'rgba(255, 255, 255, 0.3)',
        },
        // Status Colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        // Legacy support
        dark: {
          DEFAULT: '#000000',
          lighter: '#0a0a0a',
          light: '#1a1a1a',
          surface: '#0f0f0f',
          elevated: '#1a1a1a',
        },
        neon: {
          blue: '#00d4ff',
          'blue-light': '#33ddff',
          'blue-dark': '#00a8cc',
          purple: '#a855f7',
          'purple-light': '#c084fc',
          'purple-dark': '#7c3aed',
          pink: '#ec4899',
          'pink-light': '#f472b6',
          'pink-dark': '#db2777',
          cyan: '#06b6d4',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          medium: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Figma-based typography scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.1' }],
        '9xl': ['8rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        // Figma-based radiuses
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'glass': '12px',
        'glass-lg': '16px',
        'glass-xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        // Figma-based shadows
        'soft': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'strong': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glow-accent': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-accent-lg': '0 0 40px rgba(0, 212, 255, 0.4), 0 0 80px rgba(0, 212, 255, 0.2)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-blue-lg': '0 0 40px rgba(0, 212, 255, 0.4), 0 0 80px rgba(0, 212, 255, 0.2)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'neon-purple-lg': '0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'neon-pink-lg': '0 0 40px rgba(236, 72, 153, 0.4), 0 0 80px rgba(236, 72, 153, 0.2)',
        'depth-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'depth-md': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'depth-lg': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
