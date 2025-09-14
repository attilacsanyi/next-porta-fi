/**
 * Portfolio Loading Component
 * Shows loading states during portfolio data fetching
 */

import type { PortfolioLoadingState } from '../types';

interface PortfolioLoadingProps {
  state: PortfolioLoadingState;
  address: string;
}

export const PortfolioLoading = ({ state, address }: PortfolioLoadingProps) => {
  const getLoadingMessage = () => {
    switch (state) {
      case 'loading-balances':
        return 'Discovering tokens...';
      case 'loading-metadata':
        return 'Fetching token details...';
      case 'loading-prices':
        return 'Getting current prices...';
      case 'error':
        return 'Failed to load portfolio';
      default:
        return 'Loading portfolio...';
    }
  };

  const getLoadingIcon = () => {
    switch (state) {
      case 'loading-balances':
        return '🔍';
      case 'loading-metadata':
        return '📊';
      case 'loading-prices':
        return '💰';
      case 'error':
        return '❌';
      default:
        return '⏳';
    }
  };

  if (state === 'error') {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <div className="mb-4 text-6xl">{getLoadingIcon()}</div>
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            {getLoadingMessage()}
          </h1>
          <p className="text-muted-foreground">
            Unable to load portfolio for address: {address}
          </p>
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded px-4 py-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground font-mono text-sm">
          Address: {address}
        </p>
      </div>

      <div className="space-y-6">
        {/* Loading Overview */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="animate-spin text-2xl">{getLoadingIcon()}</div>
            <div>
              <h2 className="text-xl font-semibold">{getLoadingMessage()}</h2>
              <p className="text-muted-foreground text-sm">
                This may take a few moments...
              </p>
            </div>
          </div>
        </div>

        {/* Loading Token Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tokens</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-card animate-pulse rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-muted h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="bg-muted h-4 w-24 rounded" />
                    <div className="bg-muted h-3 w-16 rounded" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="bg-muted h-3 w-20 rounded" />
                  <div className="bg-muted h-4 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
