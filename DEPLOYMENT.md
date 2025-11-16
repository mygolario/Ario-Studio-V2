# Deployment Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure everything
4. Deploy!

**No additional configuration needed** - Vercel handles Next.js perfectly.

### Netlify

1. Push your code to a Git repository
2. Import on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next` (or configure for static export)

### Static Export (Alternative)

If you need a fully static site:

1. Update `next.config.js`:
   ```js
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Deploy the `out` folder to any static hosting (GitHub Pages, AWS S3, etc.)

## Environment Variables

This project doesn't require environment variables for basic functionality. If you add features like:
- Contact form backend
- Analytics
- API integrations

Add them to `.env.local` (not committed to git).

## Performance Tips

- Images are optimized by Next.js automatically
- Animations use GPU acceleration (transform, opacity)
- Code is automatically split and optimized
- Consider adding a CDN for static assets in production

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## Troubleshooting

### Build Errors
- Ensure Node.js version is 18+ 
- Clear `.next` folder and `node_modules`, then reinstall
- Check TypeScript errors: `npm run lint`

### Animation Issues
- Ensure GSAP and Framer Motion are installed
- Check browser console for errors
- Verify viewport meta tag is present (Next.js handles this)

### Styling Issues
- Clear browser cache
- Verify Tailwind CSS is compiling correctly
- Check `tailwind.config.ts` for custom classes

