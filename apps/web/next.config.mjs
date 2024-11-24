/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ultra-reporter/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
