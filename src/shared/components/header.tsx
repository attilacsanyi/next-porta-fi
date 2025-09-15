'use client';

import { ClientOnly } from '@/shared/components';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { ModeToggle } from './mode-toggle';

export const Header = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const handleShowMyPortfolio = () => {
    if (address) {
      router.push(`/portfolio/${address}`);
    }
  };

  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            className="hover:text-primary text-xl font-bold transition-colors sm:text-2xl"
            href="/"
          >
            PortaFi
          </Link>

          <nav className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <ClientOnly
              fallback={
                <div className="bg-muted h-10 w-32 animate-pulse rounded-md" />
              }
            >
              <appkit-button />
            </ClientOnly>

            <ClientOnly fallback={null}>
              {isConnected && address && (
                <Button
                  className="hidden text-sm sm:inline-flex"
                  size="sm"
                  variant="outline"
                  onClick={handleShowMyPortfolio}
                >
                  Show My Portfolio
                </Button>
              )}

              {/* Mobile version - shorter text */}
              {isConnected && address && (
                <Button
                  className="inline-flex text-xs sm:hidden"
                  size="sm"
                  variant="outline"
                  onClick={handleShowMyPortfolio}
                >
                  My Portfolio
                </Button>
              )}
            </ClientOnly>

            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
