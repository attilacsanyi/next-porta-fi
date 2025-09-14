/**
 * Portfolio Overview Component
 * Displays total value, token count, and verification summary
 */

import type { Portfolio } from '../types';
import { formatters } from '../utils';

interface PortfolioOverviewProps {
  portfolio: Portfolio;
}

export const PortfolioOverview = ({ portfolio }: PortfolioOverviewProps) => {
  const tokenCount = portfolio.tokens.length;
  const verifiedCount = portfolio.tokens.filter(
    token => token.verification?.verified
  ).length;
  const verificationRate =
    tokenCount > 0 ? (verifiedCount / tokenCount) * 100 : 0;

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Portfolio Overview</h2>
        <div className="text-muted-foreground text-sm">
          Updated {formatters.time(portfolio.lastUpdated)}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Value */}
        <div className="bg-muted/50 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
          <div className="text-muted-foreground text-sm font-medium">
            Total Value
          </div>
          <div className="mt-1 text-2xl font-bold text-green-600 sm:text-3xl">
            ${formatters.value(portfolio.totalValue)}
          </div>
        </div>

        {/* Token Count */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-muted-foreground text-sm font-medium">
            Tokens
          </div>
          <div className="mt-1 text-2xl font-bold sm:text-3xl">
            {tokenCount}
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-muted-foreground text-sm font-medium">
            Verified
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="text-2xl font-bold sm:text-3xl">
              {verifiedCount}
            </div>
            <div className="text-muted-foreground text-sm">
              ({formatters.percentage(verificationRate, 0)})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
