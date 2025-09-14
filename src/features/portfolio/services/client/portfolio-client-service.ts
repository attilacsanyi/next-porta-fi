import { createLogger } from '@/features/portfolio/utils';
import type { Portfolio, PortfolioServiceOptions } from '../../types';

/**
 * Client-side Portfolio Service
 * Secure portfolio data fetching via internal API routes
 */
export class PortfolioClientService {
  private readonly logger = createLogger('PortfolioClientService');

  /**
   * Fetch portfolio data from secure API route
   */
  async getPortfolio(
    address: string,
    options: PortfolioServiceOptions = {}
  ): Promise<Portfolio> {
    try {
      this.logger.info('Fetching portfolio for address', {
        address,
      });

      const { maxTokens, includeZeroBalances } = options;

      const searchParams = new URLSearchParams({
        ...(maxTokens && { maxTokens: maxTokens.toString() }),
        ...(includeZeroBalances !== undefined && {
          includeZeroBalances: includeZeroBalances.toString(),
        }),
      });

      const response = await fetch(
        `/api/portfolio/${address}?${searchParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.details ||
            errorData.error ||
            `HTTP error! status: ${response.status}`
        );
      }

      const portfolio: Portfolio = await response.json();
      this.logger.info(
        `Portfolio: $${portfolio.totalValue} across ${portfolio.tokens.length} tokens`
      );

      return portfolio;
    } catch (error) {
      this.logger.error('Error fetching portfolio', {
        error,
      });
      throw error;
    }
  }
}

export const portfolioClientService = new PortfolioClientService();
