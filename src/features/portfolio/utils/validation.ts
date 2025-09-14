import { isAddress } from 'viem';

/**
 * Validate Ethereum address
 */
export const validateAddress = (address: string): boolean => {
  return isAddress(address);
};
