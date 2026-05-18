/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Static export for Netlify
  reactStrictMode: true,
  images: {
    unoptimized: true         // Required for static export (no Next.js image server)
  },
  transpilePackages: ['framer-motion'],
  experimental: {
    esmExternals: 'loose'
  },
  trailingSlash: true,        // Ensures proper routing on Netlify
};

module.exports = nextConfig;
