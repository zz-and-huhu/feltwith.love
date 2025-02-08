/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['your-cloud-storage-domain.com'],
  },
};

module.exports = nextConfig;
