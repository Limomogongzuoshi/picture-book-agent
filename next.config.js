/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'cdn.example.com', 'picsum.photos'],
    unoptimized: true, // 用于静态导出
  },
  output: 'export', // 启用静态导出
}

module.exports = nextConfig
