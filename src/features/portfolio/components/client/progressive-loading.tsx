/**
 * Progressive Loading Component
 * Handles different loading phases with partial data display
 */

'use client';

import type { Portfolio, TokenBalance } from '../../types';
import { PortfolioOverview } from '../portfolio-overview';
import { TokenList } from '../token-list';
import { LoadingProgress, PortfolioOverviewSkeleton } from './skeleton-loaders';

interface ProgressiveLoadingProps {
  portfolio?: Partial<Portfolio>;
  loadingState:
    | 'balances'
    | 'metadata'
    | 'prices'
    | 'verifying'
    | 'complete'
    | 'error';
  error?: string;
}

export const ProgressiveLoading = ({
  portfolio,
  loadingState,
  error,
}: ProgressiveLoadingProps) => {
  const getLoadingSteps = () => {
    const steps = [
      {
        label: 'Discovering tokens...',
        status:
          loadingState === 'balances'
            ? ('loading' as const)
            : ['metadata', 'prices', 'verifying', 'complete'].includes(
                  loadingState
                )
              ? ('completed' as const)
              : ('pending' as const),
        icon: '🔍',
      },
      {
        label: 'Fetching metadata...',
        status:
          loadingState === 'metadata'
            ? ('loading' as const)
            : ['prices', 'verifying', 'complete'].includes(loadingState)
              ? ('completed' as const)
              : ('pending' as const),
        icon: '📊',
      },
      {
        label: 'Getting prices...',
        status:
          loadingState === 'prices'
            ? ('loading' as const)
            : ['verifying', 'complete'].includes(loadingState)
              ? ('completed' as const)
              : ('pending' as const),
        icon: '💰',
      },
      {
        label: 'Verifying on-chain...',
        status:
          loadingState === 'verifying'
            ? ('loading' as const)
            : loadingState === 'complete'
              ? ('completed' as const)
              : ('pending' as const),
        icon: '🔗',
      },
    ];

    if (loadingState === 'error') {
      return steps.map(step => ({ ...step, status: 'error' as const }));
    }

    return steps;
  };

  const hasTokens = portfolio?.tokens && portfolio.tokens.length > 0;
  const canShowOverview =
    portfolio && typeof portfolio.totalValue !== 'undefined';

  if (loadingState === 'error') {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-red-800">
            Loading Error
          </h2>
          <p className="mb-4 text-red-700">
            We encountered an issue while loading the portfolio data.
          </p>
          {error && (
            <details className="text-sm">
              <summary className="cursor-pointer text-red-600 hover:text-red-800">
                Technical Details
              </summary>
              <pre className="mt-2 overflow-x-auto text-xs text-red-600">
                {error}
              </pre>
            </details>
          )}
        </div>
        <LoadingProgress steps={getLoadingSteps()} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      {canShowOverview ? (
        <PortfolioOverview portfolio={portfolio as Portfolio} />
      ) : (
        <PortfolioOverviewSkeleton
          showVerification={loadingState !== 'balances'}
        />
      )}

      {/* Content Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {hasTokens ? (
            <TokenList
              isVerifying={loadingState === 'verifying'}
              tokens={portfolio.tokens as TokenBalance[]}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="bg-muted h-6 w-24 animate-pulse rounded" />
                <div className="bg-muted h-4 w-32 animate-pulse rounded" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-card animate-pulse rounded-lg border p-4 sm:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-muted h-10 w-10 flex-shrink-0 rounded-full sm:h-12 sm:w-12" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="bg-muted h-4 w-24 rounded" />
                        <div className="bg-muted h-3 w-16 rounded" />
                      </div>
                      {loadingState !== 'balances' && (
                        <div className="bg-muted h-6 w-20 flex-shrink-0 rounded-full" />
                      )}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="bg-muted h-3 w-20 rounded" />
                      <div className="bg-muted h-4 w-16 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading Progress Sidebar */}
        <div className="lg:col-span-1">
          <LoadingProgress steps={getLoadingSteps()} />
        </div>
      </div>
    </div>
  );
};
