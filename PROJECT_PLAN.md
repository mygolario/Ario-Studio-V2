# Ario Studio - Project Plan

## Tech Stack

- **Framework**: Next.js 14 (App Router) - SSR/SSG ready, production-optimized
- **Language**: TypeScript - Type safety and maintainability
- **Styling**: Tailwind CSS - Utility-first, responsive design
- **Animations**: 
  - Framer Motion - Component animations, transitions
  - GSAP + ScrollTrigger - Advanced scroll-based storytelling
- **Icons**: React Icons / Custom SVG
- **Deployment**: Vercel-ready (static export option)

## Project Structure

```
Ario-Studio-V2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Main landing page
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # Design system components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Container.tsx
│   │   ├── sections/           # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── ScrollStory.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   └── shared/             # Shared components
│   │       ├── ParticleBackground.tsx
│   │       └── ParallaxLayer.tsx
│   ├── lib/
│   │   ├── theme.ts            # Design tokens
│   │   └── utils.ts
│   └── styles/
│       └── animations.css      # Custom animation utilities
├── public/
│   ├── mockups/                # SVG assets
│   └── images/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Implementation Phases

### Phase 1: Project Setup & Foundation
- Initialize Next.js with TypeScript
- Configure Tailwind CSS with custom theme
- Set up design tokens (colors, typography, spacing)
- Create base layout structure

### Phase 2: Design System
- Build UI components (Button, Card, Input, Container)
- Define typography scale
- Create spacing system
- Set up color tokens with neon/galaxy theme

### Phase 3: Layout & Sections (Static)
- Implement all 7 sections with placeholder content
- Basic responsive layout
- Section structure and spacing

### Phase 4: Animations & Motion
- GSAP ScrollTrigger setup
- Scroll-based storytelling in ScrollStory section
- Parallax effects
- Section entrance animations

### Phase 5: Micro-interactions
- Button hover states (glow, scale)
- Card hover effects (tilt, glow, border-light)
- Input focus states
- Smooth transitions

### Phase 6: SVG Assets & Visuals
- Create SVG mockups for hero, portfolio, services
- Integrate into components
- Abstract shapes and decorative elements

### Phase 7: Responsive Polish
- Mobile breakpoints
- Tablet adjustments
- Touch-friendly interactions
- Typography scaling

### Phase 8: Production Ready
- Build optimization
- Performance checks
- Deployment configuration
- Final polish

## Design Tokens Preview

### Colors
- Background: Deep black (#000000, #0a0a0a)
- Neon Blue: #00d4ff
- Neon Purple: #a855f7
- Neon Pink: #ec4899
- Text: White/light gray
- Glass: rgba(255, 255, 255, 0.05-0.1)

### Typography
- Headings: Futuristic grotesk (Inter, Space Grotesk, or custom)
- Body: Clean sans-serif (Inter, system-ui)

### Spacing
- Consistent scale: 4px base unit
- Section padding: responsive (mobile: 4rem, desktop: 8rem)

---

**Starting implementation now...**

