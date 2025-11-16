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
  
  // SVG support
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
