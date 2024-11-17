/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ultra-reporter/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
