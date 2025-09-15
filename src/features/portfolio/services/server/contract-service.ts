import { env } from '@/core/config';
import { createLogger } from '@/features/portfolio/utils';
import { createPublicClient, erc20Abi, http } from 'viem';
import { mainnet } from 'viem/chains';
import type { TokenVerificationResult } from '../../types';

/**
 * Contract Service
 * Handles direct smart contract interactions for verification using viem
 */
export class ContractService {
  private readonly publicClient;
  private readonly logger = createLogger('ContractService');

  constructor() {
    this.publicClient = createPublicClient({
      chain: mainnet,
      transport: http(env.rpcUrl),
    });
  }

  /**
   * Get an ERC-20 token's symbol directly from its contract
   */
  private getTokenSymbol = async (
    contractAddress: `0x${string}`
  ): Promise<string> => {
    try {
      const symbol = await this.publicClient.readContract({
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'symbol',
      });
      return symbol;
    } catch (error) {
      this.logger.error('Failed to get symbol', {
        operation: 'symbol',
        address: contractAddress,
        error,
      });
      return 'N/A';
    }
  };

  /**
   * Get an ERC-20 token balance directly from its contract
   */
  private getTokenBalance = async (
    contractAddress: `0x${string}`,
    userAddress: `0x${string}`
  ): Promise<bigint> => {
    try {
      const balance = await this.publicClient.readContract({
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [userAddress],
      });
      return balance;
    } catch (error) {
      this.logger.error('Failed to get balance', {
        operation: 'balanceOf',
        address: contractAddress,
        error,
      });
      return BigInt(0);
    }
  };

  /**
   * Get an ERC-20 token's name directly from its contract
   */
  private getTokenName = async (
    contractAddress: `0x${string}`
  ): Promise<string> => {
    try {
      const name = await this.publicClient.readContract({
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'name',
      });
      return name;
    } catch (error) {
      console.error('Failed to get name', {
        operation: 'name',
        address: contractAddress,
        error,
      });
      return 'Unknown Token';
    }
  };

  /**
   * Get native ETH balance for an address
   */
  getEthBalance = async (userAddress: `0x${string}`): Promise<bigint> => {
    try {
      const balance = await this.publicClient.getBalance({
        address: userAddress,
      });
      return balance;
    } catch (error) {
      this.logger.error('Failed to get ETH balance', {
        operation: 'getBalance',
        address: userAddress,
        error,
      });
      return BigInt(0);
    }
  };

  /**
   * Verify token data against Alchemy for badge system
   * Returns verification status for UI display
   */
  verifyTokenData = async (
    contractAddress: `0x${string}` | 'native',
    userAddress: `0x${string}`,
    alchemyBalance: string,
    alchemySymbol: string,
    alchemyName: string
  ): Promise<TokenVerificationResult> => {
    try {
      // this.logger.info('Verifying token data', {
      //   operation: 'verifyTokenData',
      //   contractAddress,
      //   userAddress,
      //   alchemyBalance,
      //   alchemySymbol,
      //   alchemyName,
      // });

      // Handle native ETH verification
      if (contractAddress === 'native') {
        const onChainBalance = await this.getEthBalance(userAddress);
        const alchemyBigInt = BigInt(alchemyBalance);

        return {
          symbol: 'ETH',
          balance: onChainBalance.toString(),
          name: 'Ethereum',
          verified: alchemyBigInt === onChainBalance,
          symbolMatch: alchemySymbol === 'ETH',
          balanceMatch: alchemyBigInt === onChainBalance,
          alchemySymbol,
          alchemyBalance: alchemyBigInt.toString(),
          alchemyName,
        };
      }

      // Get direct contract data for ERC-20 tokens
      const [onChainSymbol, onChainBalance, onChainName] = await Promise.all([
        this.getTokenSymbol(contractAddress as `0x${string}`),
        this.getTokenBalance(contractAddress as `0x${string}`, userAddress),
        this.getTokenName(contractAddress as `0x${string}`),
      ]);

      // Convert Alchemy balance to BigInt for comparison
      const alchemyBigInt = BigInt(alchemyBalance);

      // Determine verification status
      const symbolMatch = alchemySymbol === onChainSymbol;
      const balanceMatch = alchemyBigInt === onChainBalance;

      return {
        symbol: onChainSymbol,
        balance: onChainBalance.toString(),
        name: onChainName,
        verified: symbolMatch && balanceMatch,
        symbolMatch,
        balanceMatch,
        alchemySymbol,
        alchemyBalance: alchemyBigInt.toString(),
        alchemyName,
      };
    } catch (error) {
      this.logger.error('Token verification failed', {
        operation: 'verifyTokenData',
        address: contractAddress,
        error,
      });

      return {
        symbol: 'N/A',
        balance: '0',
        name: 'Unknown Token',
        verified: false,
        symbolMatch: false,
        balanceMatch: false,
        alchemySymbol,
        alchemyBalance,
        alchemyName,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  };
}

export const contractService = new ContractService();
