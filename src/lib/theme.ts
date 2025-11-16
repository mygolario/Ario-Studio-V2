// Design tokens and theme constants

export const theme = {
  colors: {
    dark: {
      base: '#000000',
      lighter: '#0a0a0a',
      light: '#1a1a1a',
    },
    neon: {
      blue: '#00d4ff',
      purple: '#a855f7',
      pink: '#ec4899',
      cyan: '#06b6d4',
    },
  },
  spacing: {
    section: {
      mobile: '4rem',
      tablet: '6rem',
      desktop: '8rem',
    },
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
} as const

