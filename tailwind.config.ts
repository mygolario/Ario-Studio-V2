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
        // Dark galaxy theme
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
        surface: {
          DEFAULT: 'rgba(15, 15, 15, 0.8)',
          elevated: 'rgba(26, 26, 26, 0.9)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-blue-lg': '0 0 40px rgba(0, 212, 255, 0.4), 0 0 80px rgba(0, 212, 255, 0.2)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'neon-purple-lg': '0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'neon-pink-lg': '0 0 40px rgba(236, 72, 153, 0.4), 0 0 80px rgba(236, 72, 153, 0.2)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.3)',
        'glow-xl': '0 0 60px rgba(0, 212, 255, 0.4), 0 0 100px rgba(0, 212, 255, 0.2)',
        'depth-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'depth-md': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'depth-lg': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        'glass': '12px',
        'glass-lg': '16px',
        'glass-xl': '24px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config

