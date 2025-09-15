import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // alchemy
      {
        protocol: 'https',
        hostname: 'static.alchemyapi.io',
        port: '',
        pathname: '/images/**',
      },
      // coingecko
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        port: '',
        pathname: '/coins/images/**',
      },
    ],
  },
  // This is needed for prod build due to alchemy-sdk using websocket
  serverExternalPackages: ['websocket'],
};

export default nextConfig;
