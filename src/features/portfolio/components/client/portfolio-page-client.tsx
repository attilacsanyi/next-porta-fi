'use client';

import { usePortfolioData } from '../../hooks';
import { PortfolioOverview } from '../portfolio-overview';
import { TokenList } from '../token-list';
import {
  LoadingProgress,
  PortfolioOverviewSkeleton,
  TokenListSkeleton,
} from './skeleton-loaders';

interface PortfolioPageClientProps {
  address: string;
}

export const PortfolioPageClient = ({ address }: PortfolioPageClientProps) => {
  const { portfolio, loading, error, retry } = usePortfolioData(address, {
    maxTokens: 10, // Limit for better performance
    includeZeroBalances: true,
    includeEth: true,
  });

  if (loading) {
    const loadingSteps = [
      {
        label: 'Discovering tokens...',
        status: 'loading' as const,
        icon: '🔍',
      },
      { label: 'Fetching metadata...', status: 'pending' as const, icon: '📊' },
      { label: 'Getting prices...', status: 'pending' as const, icon: '💰' },
      {
        label: 'Verifying on-chain...',
        status: 'pending' as const,
        icon: '🔗',
      },
    ];

    return (
      <div className="space-y-6">
        <PortfolioOverviewSkeleton />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TokenListSkeleton
              count={4}
              showVerificationBadges={false}
            />
          </div>
          <div className="lg:col-span-1">
            <LoadingProgress steps={loadingSteps} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-red-800">
            Portfolio Loading Issue
          </h2>
          <p className="text-red-700">
            We encountered an issue loading the portfolio data. This is likely
            temporary and often resolves after a quick retry.
          </p>

          <button
            className="mt-4 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            onClick={retry}
          >
            {loading ? 'Retrying...' : 'Try Again'}
          </button>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
              Technical Details
            </summary>
            <pre className="mt-2 overflow-x-auto text-xs text-red-600">
              {error}
            </pre>
          </details>
        </div>
      </>
    );
  }

  if (!portfolio) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <h2 className="mb-2 text-lg font-semibold text-yellow-800">
          No Portfolio Data
        </h2>
        <p className="text-yellow-700">
          No portfolio data was returned for this address.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PortfolioOverview portfolio={portfolio} />

      {/* Mobile-optimized token list with better spacing */}
      <div className="space-y-4">
        <TokenList tokens={portfolio.tokens} />
      </div>
    </div>
  );
};
