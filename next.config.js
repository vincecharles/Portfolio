/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  transpilePackages: ['framer-motion'],
  experimental: {
    esmExternals: 'loose'
  }
};

module.exports = nextConfig;
