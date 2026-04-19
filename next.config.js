/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/globe', destination: '/globe/index.html' },
    ]
  },
}

module.exports = nextConfig
