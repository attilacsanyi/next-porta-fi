/**
 * Token List Component
 * Displays all tokens in a responsive grid layout
 */

import type { TokenBalance } from '../types';
import { TokenCard } from './token-card';

interface TokenListProps {
  tokens: TokenBalance[];
  isLoading?: boolean;
  isVerifying?: boolean;
}

export const TokenList = ({
  tokens,
  isLoading = false,
  isVerifying = false,
}: TokenListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tokens</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tokens</h2>
        <div className="rounded-lg border border-dashed p-8 text-center">
          <div className="text-muted-foreground">
            <div className="mb-4 text-4xl">📦</div>
            <div className="text-lg font-medium">No tokens found</div>
            <div className="text-sm">
              This address doesn&apos;t hold any ERC-20 tokens
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tokens ({tokens.length})</h2>
        <div className="text-muted-foreground text-sm">
          Sorted by value (highest first)
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map(token => (
          <TokenCard
            key={token.contractAddress}
            showVerificationLoading={isVerifying}
            token={token}
          />
        ))}
      </div>
    </div>
  );
};
