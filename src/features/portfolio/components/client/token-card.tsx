'use client';

import { Card, CardContent, CardHeader } from '@/shared/ui';
import Image from 'next/image';
import type { TokenBalance } from '../../types';
import { formatters } from '../../utils';
import { VerificationBadge } from '../verification-badge';

interface TokenCardProps {
  token: TokenBalance;
  showVerificationLoading?: boolean;
}

/**
 * Token Card Component
 * Displays individual token information with verification badge
 */
export const TokenCard = ({
  token,
  showVerificationLoading = false,
}: TokenCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
      <CardHeader className="space-y-0 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {/* Token Logo with improved styling */}
            <div className="relative h-12 w-12 flex-shrink-0 sm:h-14 sm:w-14">
              {token.logo ? (
                <Image
                  alt={`${token.name} logo`}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-border/50 transition-transform group-hover:scale-105 sm:h-14 sm:w-14"
                  height={56}
                  src={token.logo}
                  width={56}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/70 text-sm font-bold ring-2 ring-border/50 transition-transform group-hover:scale-105 sm:h-14 sm:w-14 sm:text-base">
                  {token.symbol.charAt(0)}
                </div>
              )}
            </div>

            {/* Token Info with improved typography */}
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h3 className="truncate text-base font-bold tracking-tight sm:text-lg">
                  {token.name}
                </h3>
                <span className="flex-shrink-0 text-sm font-medium text-muted-foreground">
                  {token.symbol}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground sm:text-sm">
                <span className="font-mono">
                  {token.contractAddress.slice(0, 6)}...
                  {token.contractAddress.slice(-4)}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="ml-2 flex-shrink-0">
            <VerificationBadge
              isLoading={showVerificationLoading && !token.verification}
              size="sm"
              verification={token.verification}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-0">
        {/* Primary metrics in grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Balance
            </p>
            <div className="space-y-1">
              <p className="truncate font-mono text-sm font-medium sm:text-base">
                {parseFloat(token.balance).toFixed(4)}
              </p>
              <p className="text-xs text-muted-foreground">
                {token.symbol}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Price
            </p>
            <p className="font-mono text-sm font-medium sm:text-base">
              ${formatters.price(token.priceUsd)}
            </p>
          </div>
        </div>

        {/* Total Value - prominently displayed */}
        <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:from-green-950/20 dark:to-emerald-950/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Value
          </p>
          <p className="mt-1 text-xl font-bold text-green-700 dark:text-green-400 sm:text-2xl">
            ${formatters.value(token.valueUsd)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
