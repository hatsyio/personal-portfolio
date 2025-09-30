/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove basePath and assetPrefix for custom domain
  // basePath: process.env.NODE_ENV === 'production' ? '/personal-portfolio' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-portfolio' : '',
  trailingSlash: true,
}

export default nextConfig
