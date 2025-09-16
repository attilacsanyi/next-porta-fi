/**
 * Token List Component
 * Displays all tokens in a responsive grid layout
 */

import type { TokenBalance } from '../types';
import { TokenCard } from './client/token-card';

interface TokenListProps {
  tokens: TokenBalance[];
  isLoading?: boolean;
}

export const TokenList = ({ tokens, isLoading = false }: TokenListProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="from-muted/20 to-muted/10 h-80 animate-pulse rounded-xl bg-gradient-to-br shadow-sm"
          />
        ))}
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <div className="text-muted-foreground">
          <div className="mb-4 text-4xl">📦</div>
          <div className="text-lg font-medium">No tokens found</div>
          <div className="text-sm">
            This address does not hold any ERC-20 tokens
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tokens.map(token => (
        <TokenCard
          key={token.contractAddress}
          token={token}
        />
      ))}
    </div>
  );
};
