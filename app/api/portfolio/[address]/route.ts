import {
  alchemyService,
  coinGeckoService,
  contractService,
} from '@/features/portfolio/services/server';
import type { Portfolio, TokenBalance } from '@/features/portfolio/types';
import { createLogger, formatters } from '@/features/portfolio/utils';
import { NextRequest, NextResponse } from 'next/server';
import { isAddress } from 'viem';

interface RouteContext {
  params: Promise<{
    address: string;
  }>;
}

/**
 * Portfolio API Route
 * Uses Alchemy SDK securely on server-side to fetch token balances and metadata
 */
export const GET = async (
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> => {
  const logger = createLogger('PortfolioAPIRoute');
  try {
    const { address } = await context.params;

    // Validate address
    if (!isAddress(address)) {
      return NextResponse.json(
        { error: 'Invalid Ethereum address' },
        { status: 400 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const maxTokens = parseInt(searchParams.get('maxTokens') || '50');
    const includeZeroBalances =
      searchParams.get('includeZeroBalances') === 'false' ? false : true;

    // logger.info(`Fetching portfolio for address: ${address}`);

    // 1. Get token balances from Alchemy
    const balances = await alchemyService.getTokenBalances(address, maxTokens);
    // logger.info(`Found ${balances.length} non-zero token balances`);

    if (balances.length === 0) {
      const emptyPortfolio: Portfolio = {
        address,
        totalValue: '0',
        tokens: [],
        lastUpdated: new Date(),
      };
      return NextResponse.json(emptyPortfolio);
    }

    // Filter  balances
    const filteredBalances = includeZeroBalances
      ? balances
      : balances.filter(token => {
          // tokenBalance stored as hex in Alchemy SDK
          const decimalBalance = BigInt(token.tokenBalance);
          return decimalBalance > BigInt(0);
        });

    // 2. Get metadata and prices in parallel
    const contractAddresses = filteredBalances.map(
      token => token.contractAddress
    );
    // logger.info(`Fetching prices for tokens`, {
    //   tokenCount: contractAddresses.length,
    // });

    const [tokensWithMetadata, priceData] = await Promise.all([
      getTokensWithMetadata(filteredBalances),
      coinGeckoService.getTokenPrices(contractAddresses),
    ]);

    // logger.info(`Received price data:`, {
    //   priceData: JSON.stringify(priceData, null, 2),
    // });

    // 3. Create token balance objects with verification
    const tokens: (TokenBalance | null)[] = await Promise.all(
      tokensWithMetadata.map(async token => {
        const { metadata } = token;

        // Skip tokens with invalid metadata
        if (!metadata.name || !metadata.symbol || metadata.decimals === null) {
          return null;
        }

        const balance = formatters.balance(
          token.tokenBalance,
          metadata.decimals
        );

        const normalizedAddress = token.contractAddress.toLowerCase();
        const price = priceData[normalizedAddress]?.usd || 0;
        const value = parseFloat(balance) * price;

        logger.info(
          `Token ${metadata.symbol} (${normalizedAddress}): balance=${balance}, price=$${price}, value=$${value.toFixed(2)}`
        );

        // Get verification data from contract service
        const verification = await contractService.verifyTokenData(
          token.contractAddress as `0x${string}`,
          address as `0x${string}`,
          token.tokenBalance,
          metadata.symbol,
          metadata.name
        );

        return {
          contractAddress: token.contractAddress,
          name: metadata.name,
          symbol: metadata.symbol,
          logo: metadata.logo,
          balance: parseFloat(balance).toFixed(4),
          rawBalance: token.tokenBalance,
          priceUsd: price.toFixed(2),
          valueUsd: value.toFixed(2),
          decimals: metadata.decimals,
          verification,
        };
      })
    );

    // Filter out null tokens and sort by value
    const validTokens = tokens
      .filter((token): token is TokenBalance => token !== null)
      .sort((a, b) => parseFloat(b.valueUsd) - parseFloat(a.valueUsd));

    // 4. Calculate total portfolio value
    const totalValue = validTokens.reduce(
      (total, token) => total + parseFloat(token.valueUsd),
      0
    );

    const portfolio: Portfolio = {
      address,
      totalValue: totalValue.toFixed(2),
      tokens: validTokens,
      lastUpdated: new Date(),
    };

    logger.info(
      `Portfolio: $${totalValue.toFixed(2)} across ${validTokens.length} tokens`
    );

    return NextResponse.json(portfolio);
  } catch (error) {
    logger.error('❌ API Error fetching portfolio:', { error });

    return NextResponse.json(
      {
        error: 'Failed to fetch portfolio data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
};

/**
 * Helper function to get tokens with metadata
 * Fetches token metadata for each balance and combines them
 *
 * @param balances - Array of token balances with contract addresses
 * @returns Promise resolving to array of tokens with their metadata
 */
const getTokensWithMetadata = async (
  balances: Array<{ contractAddress: string; tokenBalance: string }>
) => {
  return Promise.all(
    balances.map(async token => {
      const metadata = await alchemyService.getTokenMetadata(
        token.contractAddress
      );
      return { ...token, metadata };
    })
  );
};
