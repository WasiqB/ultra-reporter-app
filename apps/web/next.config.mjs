/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ultra-reporter/ui', '@ultra-reporter/db'],
  turbopack: {},
  reactStrictMode: true,
};

export default nextConfig;
