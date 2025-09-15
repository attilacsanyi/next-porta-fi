'use client';

import { usePortfolioData } from '../../hooks';
import { PortfolioOverview } from '../portfolio-overview';
import {
  LoadingProgress,
  PortfolioOverviewSkeleton,
  TokenListSkeleton,
} from '../skeleton-loaders';
import { TokenList } from '../token-list';
import { TokenHoldingsPieChart } from './token-holdings-pie-chart';

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

  const hasTokensForChart = portfolio.tokens.some(
    token => parseFloat(token.valueUsd) > 0
  );

  return (
    <div className="space-y-8">
      <PortfolioOverview portfolio={portfolio} />

      {hasTokensForChart && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Token Holdings
              </h2>
              <p className="text-muted-foreground">
                Portfolio distribution by value
              </p>
            </div>
          </div>
          <TokenHoldingsPieChart portfolio={portfolio} />
        </div>
      )}

      {/* Token List Section */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Tokens ({portfolio.tokens.length})
            </h2>
            <p className="text-muted-foreground">
              Detailed breakdown of all token holdings
            </p>
          </div>
          {portfolio.tokens.length > 0 && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Sorted by value
            </div>
          )}
        </div>
        <TokenList tokens={portfolio.tokens} />
      </div>
    </div>
  );
};
