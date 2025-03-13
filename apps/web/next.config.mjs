import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ultra-reporter/ui', '@ultra-reporter/db'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  webpack: (config, { webpack, isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    return config;
  },
};

export default nextConfig;
