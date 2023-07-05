/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({});

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = withPWA({
  dest: 'public',
  disable: !isProduction,

  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
});

module.exports = nextConfig;
