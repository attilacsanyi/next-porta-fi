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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Portfolio Summary
          </h2>
          <p className="text-muted-foreground">
            Real-time portfolio metrics and verification status
          </p>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Updated {formatters.time(portfolio.lastUpdated)}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Value - Hero metric */}
        <div className="relative overflow-hidden rounded-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-sm sm:col-span-2 lg:col-span-1 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="relative">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-green-500/10 p-2">
                <svg
                  className="h-5 w-5 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2v20M2 12h20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                Total Value
              </p>
            </div>
            <p className="text-3xl font-bold text-green-700 sm:text-4xl dark:text-green-400">
              ${formatters.value(portfolio.totalValue)}
            </p>
          </div>
        </div>

        {/* ETH Balance - Enhanced */}
        <div className="relative overflow-hidden rounded-xl border border-blue-200/30 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm dark:border-blue-800/30 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="relative">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <svg
                  className="h-5 w-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                ETH Balance
              </p>
            </div>
            <p className="text-2xl font-bold text-blue-700 sm:text-3xl dark:text-blue-400">
              {parseFloat(portfolio.ethBalance.balance).toFixed(4)}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              ${formatters.value(portfolio.ethBalance.valueUsd)} USD
            </p>
          </div>
        </div>

        {/* Token Count */}
        <div className="from-card to-card/50 relative overflow-hidden rounded-xl bg-gradient-to-br p-6 shadow-sm">
          <div className="relative">
            <div className="mb-3 flex items-center gap-2">
              <div className="bg-primary/10 rounded-lg p-2">
                <svg
                  className="text-primary h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                Token Assets
              </p>
            </div>
            <p className="text-2xl font-bold sm:text-3xl">{tokenCount}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Unique tokens held
            </p>
          </div>
        </div>

        {/* Verification Status */}
        <div className="from-card to-card/50 relative overflow-hidden rounded-xl bg-gradient-to-br p-6 shadow-sm">
          <div className="relative">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-amber-500/10 p-2">
                <svg
                  className="h-5 w-5 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                Verified
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold sm:text-3xl">{verifiedCount}</p>
              <p className="text-muted-foreground text-sm">of {tokenCount}</p>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              {formatters.percentage(verificationRate, 0)} verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
