/** @type {import('next').NextConfig} */
const nextConfig = {
  // For static export (uncomment if deploying to static hosting)
  // output: 'export',
  // images: {
  //   unoptimized: true,
  // },
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Build optimizations
  swcMinify: true,
  
  // SVG support
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    
    // Optimize GSAP for server-side builds
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('gsap')
    }
    
    return config
  },
}

module.exports = nextConfig
