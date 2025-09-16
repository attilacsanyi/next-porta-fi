export interface Balance {
  /** Formatted token balance (e.g., "1.2345") */
  balance: string;
  /** Raw balance in wei/smallest unit */
  rawBalance: string;
  /** USD price per token (e.g., "2500.00") */
  priceUsd: string;
  /** Total USD value of holdings (e.g., "3087.50") */
  valueUsd: string;
}

/**
 * Processed token data for display
 */
// TODO: Rename to Token
export interface TokenBalance extends Balance {
  /** Token contract address */
  contractAddress: string;
  /** Token name (e.g., "Wrapped Ether") */
  name: string;
  /** Token symbol (e.g., "WETH") */
  symbol: string;
  /** Token logo URL */
  logo: string | null;
  /** Token decimals */
  decimals: number;
  /** Verification result for Trust but Verify badge system */
  verification: TokenVerificationResult;
}

/**
 * Complete portfolio data
 */
export interface Portfolio {
  /** Array of token balances */
  tokens: TokenBalance[];
  /** Native ETH balance */
  ethBalance: Balance;
  /** Total portfolio value in USD including ETH */
  totalValue: string;
  /** Wallet address */
  address: string;
  /** Last updated timestamp (Date object or ISO string from API) */
  lastUpdated: Date | string;
}

// Note: PortfolioLoadingState removed - using simple boolean loading state instead

/**
 * Service options for portfolio fetching
 */
export interface PortfolioServiceOptions {
  /** Include tokens with zero balance */
  includeZeroBalances?: boolean;
  /** Maximum number of tokens to process */
  maxTokens?: number;
  /** Include native ETH */
  includeEth?: boolean;
}

/**
 * Token verification status for Trust but Verify badge system
 */
export type VerificationStatus =
  | 'verified'
  | 'mismatch'
  | 'unverified'
  | 'pending';

/**
 * Token verification result from blockchain comparison
 */
export interface TokenVerificationResult {
  /** On-chain symbol */
  symbol: string;
  /** On-chain balance (as string to avoid JSON serialization issues) */
  balance: string;
  /** On-chain name */
  name: string;
  /** Overall verification status */
  verified: boolean;
  /** Symbol matches between Alchemy and blockchain */
  symbolMatch: boolean;
  /** Balance matches between Alchemy and blockchain */
  balanceMatch: boolean;
  /** Original Alchemy symbol for comparison */
  alchemySymbol: string;
  /** Original Alchemy balance for comparison */
  alchemyBalance: string;
  /** Original Alchemy name for comparison */
  alchemyName: string;
  /** Error message if verification failed */
  error?: string;
}
