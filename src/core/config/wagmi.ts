import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { base, mainnet } from '@reown/appkit/networks';
import type { Chain } from 'viem';
import { cookieStorage, createStorage } from 'wagmi';
import { env } from './env';

// Define supported networks
export const networks: [Chain, ...Chain[]] = [mainnet, base];

// Create the Wagmi adapter instance
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }), // Use cookieStorage for SSR
  ssr: true,
  projectId: env.projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
