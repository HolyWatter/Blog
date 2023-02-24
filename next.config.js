/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["holywater-blog.s3.ap-northeast-1.amazonaws.com"],
  },
}

module.exports = nextConfig