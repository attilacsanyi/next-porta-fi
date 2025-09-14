'use client';

import { config, env, networks, wagmiAdapter } from '@/core/config';
import { useIsMounted } from '@/shared/hooks';
import { mainnet } from '@reown/appkit/networks';
import { createAppKit, type AppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect } from 'react';
import { WagmiProvider, cookieToInitialState, type Config } from 'wagmi';

const queryClient = new QueryClient();

const metadata = {
  name: 'PortaFi',
  description: 'PortaFi — a blockchain portfolio viewer.',
  url:
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://next-porta-fi.netlify.app',
  icons: ['https://next-porta-fi.netlify.app/favicon.ico'],
};

let appKit: AppKit | null = null;

const AppKitThemeSync = () => {
  const { theme, resolvedTheme } = useTheme();
  const isMounted = useIsMounted();

  useEffect(() => {
    // Initialize AppKit only on client side to prevent hydration issues
    if (!appKit && env.projectId && isMounted) {
      appKit = createAppKit({
        adapters: [wagmiAdapter],
        projectId: env.projectId,
        networks,
        defaultNetwork: mainnet,
        metadata,
        // Disable external features to reduce dependencies
        features: {
          analytics: false,
          swaps: false,
          onramp: false,
          receive: false,
          send: false,
          socials: false,
          email: false,
          reownAuthentication: false,
        },
        // Start with light theme to prevent hydration mismatch
        themeMode: 'light',
        // Theme variables override
        themeVariables: {
          // Font family
          '--w3m-font-family':
            'var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          // Size and spacing
          '--w3m-font-size-master': '10px',
          '--w3m-border-radius-master': '8px',
          // Use CSS custom properties that sync with Tailwind theme
          '--w3m-accent': 'hsl(var(--primary))',
          '--w3m-color-mix': 'hsl(var(--primary))',
          '--w3m-color-mix-strength': 20,
        },
      });
    }
  }, [isMounted]); // Initialize only once after mounting

  useEffect(() => {
    if (!appKit || !isMounted) return;

    // Get the effective theme (resolvedTheme handles 'system' setting)
    const effectiveTheme = resolvedTheme || theme;

    if (effectiveTheme === 'dark' || effectiveTheme === 'light') {
      // Update AppKit theme when next-themes changes
      appKit.setThemeMode(effectiveTheme);
    }
  }, [theme, resolvedTheme, isMounted]);

  return null;
};

const ContextProvider = ({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null; // Cookies from server for hydration
}) => {
  // Calculate initial state for Wagmi SSR hydration
  const initialState = cookieToInitialState(config as Config, cookies);

  return (
    // Cast config as Config for WagmiProvider
    <WagmiProvider
      config={config as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        <AppKitThemeSync />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ContextProvider;
