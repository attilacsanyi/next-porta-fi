/**
 * Portfolio Demo Component
 * Shows sample portfolio data when API is not available
 */

import type { Portfolio } from '../types';
import { TokenHoldingsPieChart } from './client';
import { PortfolioOverview, TokenList } from './index';

// Sample portfolio data for demonstration
const samplePortfolio: Portfolio = {
  address: '0xf1dB03EadA64A3505dFBAd6cA28Ae67ec975cfa3',
  totalValue: '16505.13634',
  lastUpdated: new Date(),
  ethBalance: {
    balance: '1.0000',
    rawBalance: '1000000000000000000',
    priceUsd: '4538.02',
    valueUsd: '4538.02',
  },
  tokens: [
    {
      contractAddress: 'native',
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1747033579',
      balance: '1.0000',
      rawBalance: '1000000000000000000',
      priceUsd: '4538.02',
      valueUsd: '4538.02',
      decimals: 18,
      verification: {
        symbol: 'ETH',
        balance: '1.0000',
        name: 'Ethereum',
        verified: true,
        symbolMatch: true,
        balanceMatch: true,
        alchemySymbol: 'ETH',
        alchemyBalance: '1.0000',
        alchemyName: 'Ethereum',
      },
    },
    {
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      name: 'Tether USDt',
      symbol: 'USDT',
      logo: 'https://static.alchemyapi.io/images/assets/825.png',
      balance: '1234.5678',
      rawBalance:
        '0x00000000000000000000000000000000000000000000000000000002541536cc',
      priceUsd: '1.00',
      valueUsd: '1234.56',
      decimals: 6,
      verification: {
        symbol: 'USDT',
        balance: '10000611020',
        name: 'Tether USD',
        verified: true,
        symbolMatch: true,
        balanceMatch: true,
        alchemySymbol: 'USDT',
        alchemyBalance: '1234.5678',
        alchemyName: 'Tether USDt',
      },
    },
    {
      contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      name: 'WETH',
      symbol: 'WETH',
      logo: 'https://static.alchemyapi.io/images/assets/2396.png',
      balance: '2.344',
      rawBalance:
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      priceUsd: '4585.45',
      valueUsd: '10932.00',
      decimals: 18,
      verification: {
        symbol: 'WETH',
        balance: '0',
        name: 'Wrapped Ether',
        verified: true,
        symbolMatch: true,
        balanceMatch: true,
        alchemySymbol: 'WETH',
        alchemyBalance: '2.344',
        alchemyName: 'WETH',
      },
    },
    {
      contractAddress: '0xd3e8695d2bef061eab38b5ef526c0f714108119c',
      name: 'YFIVE FINANCE',
      symbol: 'YFIVE',
      logo: 'https://static.alchemyapi.io/images/assets/6812.png',
      balance: '3.1234',
      rawBalance:
        '0x00000000000000000000000000000000000000000000000000005af3107a4000',
      priceUsd: '160.01',
      valueUsd: '500.05634',
      decimals: 18,
      verification: {
        symbol: 'YFIVE',
        balance: '100000000000000',
        name: 'YFIVE.FINANCE',
        verified: false,
        symbolMatch: true,
        balanceMatch: false,
        alchemySymbol: 'YFIVE',
        alchemyBalance: '34',
        alchemyName: 'YFIVE FINANCE',
      },
    },
  ],
};

export const PortfolioDemo = () => {
  // Check if we have tokens with value > 0 for the pie chart
  const hasTokensForChart = samplePortfolio.tokens.some(
    token => parseFloat(token.valueUsd) > 0
  );

  return (
    <div className="space-y-8">
      <PortfolioOverview portfolio={samplePortfolio} />

      {/* Token Holdings Section - Only show if we have tokens with value */}
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
          <TokenHoldingsPieChart portfolio={samplePortfolio} />
        </div>
      )}

      {/* Token List Section */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Tokens ({samplePortfolio.tokens.length})
            </h2>
            <p className="text-muted-foreground">
              Detailed breakdown of all token holdings
            </p>
          </div>
          {samplePortfolio.tokens.length > 0 && (
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
        <TokenList tokens={samplePortfolio.tokens} />
      </div>
    </div>
  );
};
