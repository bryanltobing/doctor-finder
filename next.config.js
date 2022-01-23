/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cms-bucket-alteacare.s3.ap-southeast-1.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
