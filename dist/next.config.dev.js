"use strict";

/** @type {import('next').NextConfig} */
var nextConfig = {
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