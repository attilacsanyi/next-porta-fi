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
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {/* Token Logo */}
            <div className="h-10 w-10 flex-shrink-0 sm:h-12 sm:w-12">
              {token.logo ? (
                <Image
                  alt={`${token.name} logo`}
                  className="h-10 w-10 rounded-full sm:h-12 sm:w-12"
                  height={48}
                  src={token.logo}
                  width={48}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium sm:h-12 sm:w-12 sm:text-base">
                  {token.symbol.charAt(0)}
                </div>
              )}
            </div>

            {/* Token Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-foreground truncate text-sm font-semibold sm:text-base">
                  {token.name}
                </h3>
                <span className="text-muted-foreground flex-shrink-0 text-sm">
                  ({token.symbol})
                </span>
              </div>
              <div className="text-muted-foreground font-mono text-xs sm:text-sm">
                {token.contractAddress.slice(0, 6)}...
                {token.contractAddress.slice(-4)}
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <VerificationBadge
            isLoading={showVerificationLoading && !token.verification}
            size="sm"
            verification={token.verification}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Token Details */}
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-muted-foreground text-xs font-medium sm:text-sm">
                Balance
              </div>
              <div className="mt-1 truncate font-mono text-sm sm:text-base">
                {parseFloat(token.balance).toFixed(4)} {token.symbol}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs font-medium sm:text-sm">
                Price
              </div>
              <div className="mt-1 font-mono text-sm sm:text-base">
                ${formatters.price(token.priceUsd)}
              </div>
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs font-medium sm:text-sm">
              Value
            </div>
            <div className="mt-1 text-lg font-semibold text-green-600 sm:text-xl">
              ${formatters.value(token.valueUsd)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
