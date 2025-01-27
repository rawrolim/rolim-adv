/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_KEY: process.env.API_KEY,
    ENV: process.env.ENV,
    NEXT_URL: process.env.NEXT_URL,
    FILESERVER: process.env.FILESERVER
  },
  crossOrigin: 'anonymous',
}

module.exports = nextConfig
