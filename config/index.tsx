import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { base, mainnet } from '@reown/appkit/networks';
import type { Chain } from 'viem';
import { cookieStorage, createStorage } from 'wagmi';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error(
    'NEXT_PUBLIC_PROJECT_ID is not defined. Please set it in .env.local'
  );
}

// Define supported networks
export const networks: [Chain, ...Chain[]] = [mainnet, base];

// Create the Wagmi adapter instance
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }), // Use cookieStorage for SSR
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
