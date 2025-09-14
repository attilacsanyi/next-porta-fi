import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.alchemyapi.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  // This is needed for prod build due to alchemy-sdk using websocket
  serverExternalPackages: ['websocket'],
};

export default nextConfig;
