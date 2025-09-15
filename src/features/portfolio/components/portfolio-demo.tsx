/**
 * Portfolio Demo Component
 * Shows sample portfolio data when API is not available
 */

import type { Portfolio } from '../types';
import { PortfolioOverview, TokenList } from './index';

// Sample portfolio data for demonstration
const samplePortfolio: Portfolio = {
  address: '0xf1dB03EadA64A3505dFBAd6cA28Ae67ec975cfa3',
  totalValue: '5423876.50',
  lastUpdated: new Date(),
  ethBalance: {
    balance: '0',
    rawBalance: '0',
    priceUsd: '0',
    valueUsd: '0',
  },
  tokens: [
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
      priceUsd: '16.01',
      valueUsd: '50,005634',
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
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Portfolio Demo</h1>
      </div>

      <div className="space-y-6">
        <PortfolioOverview portfolio={samplePortfolio} />
        <TokenList tokens={samplePortfolio.tokens} />
      </div>
    </div>
  );
};
