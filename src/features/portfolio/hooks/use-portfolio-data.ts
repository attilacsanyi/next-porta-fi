'use client';

import { useEffect, useState } from 'react';
import { portfolioClientService } from '../services/client';
import type { Portfolio, PortfolioServiceOptions } from '../types';
import { createLogger, createUserErrorMessage } from '../utils';

interface UsePortfolioDataResult {
  portfolio: Portfolio | null;
  loading: boolean;
  error: string | null;
  retry: () => Promise<void>;
}

/**
 * Custom hook for portfolio data fetching and state management
 * Extracts data logic from PortfolioPageClient component
 */
export const usePortfolioData = (
  address: string,
  options: PortfolioServiceOptions = {}
): UsePortfolioDataResult => {
  const logger = createLogger('usePortfolioData');
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await portfolioClientService.getPortfolio(address, {
        ...options,
      });

      setPortfolio(result);
    } catch (error) {
      logger.error('Portfolio fetch error:', { error });
      setError(createUserErrorMessage(error));
      setPortfolio(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchPortfolio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return {
    portfolio,
    loading,
    error,
    retry: fetchPortfolio,
  };
};
