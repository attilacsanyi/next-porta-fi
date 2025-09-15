import { env } from '@/core/config';
import {
  Alchemy,
  BigNumber,
  BlockTag,
  GetTokensForOwnerOptions,
  GetTokensForOwnerResponse,
  Network,
} from 'alchemy-sdk';
import { apiErrorHandler, createLogger } from '../../utils';

/**
 * Raw token balance response from Alchemy API
 */
interface AlchemyTokenBalance {
  contractAddress: string | 'native';
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

export type AlchemyTokenBalanceWithMetadata = AlchemyTokenBalance & {
  metadata: TokenMetadata;
};

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
   * Get tokens with balances and metadata using official Alchemy SDK
   *
   * @param address - The Ethereum address to fetch tokens for
   * @param maxTokens - Maximum number of tokens to return (optional)
   * @param includeEth - Whether to include native ETH balance in results (optional, defaults to false)
   */
  getTokensWithBalancesAndMetadata = async (
    address: string,
    maxTokens?: number,
    includeEth?: boolean
  ): Promise<AlchemyTokenBalanceWithMetadata[]> => {
    const tokensResponse = await this.getTokensForOwner(address);

    let tokens: AlchemyTokenBalanceWithMetadata[] = tokensResponse.tokens.map(
      token => ({
        contractAddress: token.contractAddress,
        tokenBalance: token.rawBalance || '0',
        error: token.error || undefined,
        metadata: {
          name: token.name || 'Unknown Token',
          symbol: token.symbol || 'UNKNOWN',
          decimals: token.decimals || 18,
          logo: token.logo || null,
        },
      })
    );

    // Add native ETH if requested
    if (includeEth) {
      const ethBalance = await this.getBalance(address);
      const nativeEthToken: AlchemyTokenBalanceWithMetadata = {
        contractAddress: 'native',
        tokenBalance: ethBalance.toString(),
        error: undefined,
        metadata: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1747033579',
        },
      };
      tokens.push(nativeEthToken);
    }

    // Apply max tokens limit
    if (maxTokens && tokens.length > maxTokens) {
      tokens = tokens.slice(0, maxTokens);
    }

    this.logger.info('Tokens with metadata fetched successfully', {
      operation: 'getTokensWithBalancesAndMetadata',
      address,
      tokenCount: tokens.length,
      includeEth,
    });

    return tokens;
  };

  /**
   * Get ETH balance for an address using official SDK
   */
  getBalance = async (
    addressOrName: string | Promise<string>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<BigNumber> => {
    try {
      const balance = await this.alchemy.core.getBalance(
        addressOrName,
        blockTag
      );

      this.logger.info('ETH balance fetched successfully', {
        operation: 'getBalance',
        address:
          typeof addressOrName === 'string' ? addressOrName : 'Promise<string>',
        blockTag: blockTag
          ? typeof blockTag === 'string'
            ? blockTag
            : 'Promise<BlockTag>'
          : 'latest',
      });

      return balance;
    } catch (error) {
      return apiErrorHandler(error, 'Failed to fetch ETH balance') as never;
    }
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
