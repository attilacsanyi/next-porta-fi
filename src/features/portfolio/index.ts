// SERVER-SAFE exports only
// NO 'use client' components or hooks allowed here

// Server services (API routes only)
export * from './services/server';

// Server components (can be used in both server and client)
export {
  PortfolioDemo,
  PortfolioLoading,
  PortfolioOverview,
  TokenList,
  VerificationBadge,
} from './components';

// Universal utilities and types
export {
  apiErrorHandler,
  createLogger,
  createUserErrorMessage,
  formatters,
  validateAddress,
} from './utils';

// Types (server-safe)
export type {
  Portfolio,
  PortfolioLoadingState,
  PortfolioServiceOptions,
  TokenBalance,
  TokenVerificationResult,
  VerificationStatus,
} from './types';

// IMPORTANT: For client components and hooks, import from './client'
