import { createLogger } from '@/features/portfolio/utils';

interface CoingeckoPriceResponse {
  [contractAddress: string]: {
    usd?: number;
  };
}

/**
 * Coingecko Service
 */
export class CoingeckoService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';
  private readonly delayMs = 1200; // Increased delay for free tier (50 calls/minute = 1.2s between calls)
  private readonly logger = createLogger('CoingeckoService');

  /**
   * Get token prices from Coingecko API with improved handling
   * Free tier: 50 calls/minute, only 1 address per request
   */
  getTokenPrices = async (
    contractAddresses: string[],
    limit = 15
  ): Promise<CoingeckoPriceResponse> => {
    const priceData: CoingeckoPriceResponse = {};
    this.logger.info('Starting price fetch', {
      operation: 'getTokenPrices',
      tokenCount: contractAddresses.length,
    });

    // Limit to reasonable number to avoid hitting rate limits
    const limitedAddresses = contractAddresses.slice(0, limit);

    for (let i = 0; i < limitedAddresses.length; i++) {
      const address = limitedAddresses[i];
      const normalizedAddress = address.toLowerCase();

      try {
        // Rate limiting: delay between requests (1.2s for free tier safety)
        if (i > 0) {
          this.logger.info(
            `Waiting ${this.delayMs}ms before next request (${i}/${limitedAddresses.length})`
          );

          await this.delay(this.delayMs);
        }

        const price = await this.getSingleTokenPrice(address);
        if (price !== null && price > 0) {
          priceData[normalizedAddress] = { usd: price };
          // this.logger.info(`Stored price for ${normalizedAddress}: $${price}`);
        } else {
          this.logger.warn(
            `No price found for ${address} (may not be listed on Coingecko)`
          );
        }
      } catch (error) {
        this.logger.error(`Failed to fetch price for ${address}`, {
          contractAddress: address,
          error,
        });
        // Continue with other tokens if one fails
        continue;
      }
    }

    // this.logger.info(
    //   `Completed, found prices for ${Object.keys(priceData).length}/${limitedAddresses.length} tokens`
    // );
    return priceData;
  };

  /**
   * Get price for a single token with retry logic
   */
  private getSingleTokenPrice = async (
    contractAddress: string,
    retries = 2
  ): Promise<number | null> => {
    const normalizedAddress = contractAddress.toLowerCase();
    const url = `${this.baseUrl}/simple/token_price/ethereum?contract_addresses=${normalizedAddress}&vs_currencies=usd`;

    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        const response = await fetch(url);

        if (response.status === 429) {
          this.logger.warn(
            `Rate limited (429) for ${contractAddress}, attempt ${attempt}/${retries + 1}`
          );
          if (attempt <= retries) {
            await this.delay(this.delayMs * 2); // Double delay on rate limit
            continue;
          }
          return null;
        }

        if (!response.ok) {
          this.logger.error(
            `Token Price by address API error ${response.status} fo     r ${contractAddress}`
          );
          return null;
        }

        const data: { [key: string]: { usd: number } | undefined } =
          await response.json();
        this.logger.info(`Response for ${contractAddress}`, {
          data: JSON.stringify(data),
        });

        // Try multiple case variations to find the price
        const price = data[normalizedAddress]?.usd;

        if (price) {
          // this.logger.info(`Found price for ${contractAddress}: $${price}`);
          return price;
        } else {
          this.logger.warn(`No price data for ${contractAddress}`, {
            data: Object.keys(data),
          });
          return null;
        }
      } catch (error) {
        this.logger.error(
          `Error fetching price for ${contractAddress} (attempt ${attempt})`,
          {
            error,
          }
        );
        if (attempt <= retries) {
          await this.delay(this.delayMs);
        }
      }
    }

    return null;
  };

  /**
   * Get ETH price
   */
  getEthPrice = async (): Promise<number> => {
    const url = `${this.baseUrl}/simple/price?ids=ethereum&vs_currencies=usd`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        this.logger.error(`ETH price API error: ${response.status}`);
        return 0;
      }

      const data: { ethereum?: { usd?: number } } = await response.json();
      const price = data.ethereum?.usd || 0;

      this.logger.info(`ETH price fetched: $${price}`);
      return price;
    } catch (error) {
      this.logger.error('Failed to fetch ETH price', { error });
      return 0;
    }
  };

  /**
   * Add delay between requests
   */
  // TODO: Move to a utility function
  private delay = async (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));
}

export const coinGeckoService = new CoingeckoService();
