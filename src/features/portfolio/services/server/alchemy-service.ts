import { env } from '@/core/config';
import {
  Alchemy,
  GetTokensForOwnerOptions,
  GetTokensForOwnerResponse,
  Network,
} from 'alchemy-sdk';
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
   * Get tokens with balances and metadata using official SDK
   */
  getTokensWithBalancesAndMetadata = async (
    address: string,
    maxTokens?: number
  ): Promise<Array<AlchemyTokenBalance & { metadata: TokenMetadata }>> => {
    const tokensResponse = await this.getTokensForOwner(address);

    let validTokens = tokensResponse.tokens.map(token => ({
      contractAddress: token.contractAddress,
      tokenBalance: token.rawBalance || '0',
      error: token.error || undefined,
      metadata: {
        name: token.name || 'Unknown Token',
        symbol: token.symbol || 'UNKNOWN',
        decimals: token.decimals || 18,
        logo: token.logo || null,
      },
    }));

    // Apply max tokens limit
    if (maxTokens && validTokens.length > maxTokens) {
      validTokens = validTokens.slice(0, maxTokens);
    }

    this.logger.info('Tokens with metadata fetched successfully', {
      operation: 'getTokensWithBalancesAndMetadata',
      address,
      tokenCount: validTokens.length,
    });

    return validTokens;
  };

  /**
   * Get tokens for owner using official SDK
   */
  getTokensForOwner = async (
    addressOrName: string,
    options?: GetTokensForOwnerOptions
  ): Promise<GetTokensForOwnerResponse> => {
    try {
      const tokensResponse = await this.alchemy.core.getTokensForOwner(
        addressOrName,
        options
      );

      this.logger.info('Tokens for owner fetched successfully', {
        operation: 'getTokensForOwner',
        address: addressOrName,
        tokenCount: tokensResponse.tokens.length,
      });

      return tokensResponse;
    } catch (error) {
      return apiErrorHandler(
        error,
        'Failed to fetch tokens for owner'
      ) as never;
    }
  };
}

export const alchemyService = new AlchemyService();
