import { env } from '@/core/config';
import { Alchemy, Network } from 'alchemy-sdk';
import { apiErrorHandler, createLogger } from '../../utils';

/**
 * Raw token balance response from Alchemy API
 */
interface AlchemyTokenBalance {
  contractAddress: string;
  tokenBalance: string;
  error?: string;
}

/**
 * Token metadata from Alchemy SDK
 */
interface TokenMetadata {
  name: string | null;
  symbol: string | null;
  decimals: number | null;
  logo: string | null;
}

/**
 * Alchemy Service
 * Uses official Alchemy SDK for reliable API interactions
 * Server-Side SDK Implementation
 */
export class AlchemyService {
  private readonly alchemy: Alchemy;
  private readonly logger = createLogger('AlchemyService');

  constructor() {
    this.alchemy = new Alchemy({
      apiKey: env.alchemyApiKey,
      network: Network.ETH_MAINNET,
      // This is needed: https://stackoverflow.com/questions/78184162/nextjs-14-sever-error-with-alchemy-api-missing-response-requestbody-method
      connectionInfoOverrides: {
        skipFetchSetup: true,
      },
    });
  }

  /**
   * Get token balances using official SDK
   */
  getTokenBalances = async (
    address: string,
    maxTokens?: number
  ): Promise<AlchemyTokenBalance[]> => {
    try {
      const balances = await this.alchemy.core.getTokenBalances(address);

      // Filter non-zero balances and convert to our interface
      let validBalances = balances.tokenBalances
        .filter(
          token => token.tokenBalance !== '0x0' && token.tokenBalance !== '0'
        )
        .map(token => ({
          contractAddress: token.contractAddress,
          tokenBalance: token.tokenBalance || '0',
          error: token.error || undefined,
        }));

      // Apply max tokens limit
      if (maxTokens && validBalances.length > maxTokens) {
        validBalances = validBalances.slice(0, maxTokens);
      }

      this.logger.info('Token balances fetched successfully', {
        operation: 'getTokenBalances',
        address,
        tokenCount: validBalances.length,
      });

      return validBalances;
    } catch (error) {
      return apiErrorHandler(error, 'Failed to fetch token balances') as never;
    }
  };

  /**
   * Get token metadata using SDK
   */
  getTokenMetadata = async (
    contractAddress: string
  ): Promise<TokenMetadata> => {
    const fallbackMetadata = {
      name: 'Unknown Token',
      symbol: 'UNKNOWN',
      decimals: 18,
      logo: null,
    };

    try {
      const {
        name = fallbackMetadata.name,
        symbol = fallbackMetadata.symbol,
        decimals = fallbackMetadata.decimals,
        logo = fallbackMetadata.logo,
      } = await this.alchemy.core.getTokenMetadata(contractAddress);

      return { name, symbol, decimals, logo };
    } catch (error) {
      this.logger.warn('Failed to fetch token metadata', {
        operation: 'getTokenMetadata',
        contractAddress,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return fallbackMetadata;
    }
  };
}

export const alchemyService = new AlchemyService();
