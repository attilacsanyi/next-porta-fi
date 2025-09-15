/**
 * Shared formatting utilities for portfolio data
 * Consolidates duplicate formatting logic across components
 */

/**
 * Format token balance using decimals with BigInt precision
 */
const formatBalance = (rawBalance: string, decimals: number): string => {
  const balance = BigInt(rawBalance);
  const divisor = BigInt(Math.pow(10, decimals));
  const quotient = balance / divisor;
  const remainder = balance % divisor;

  if (remainder === BigInt(0)) {
    return quotient.toString();
  }

  const remainderStr = remainder.toString().padStart(decimals, '0');
  const trimmedRemainder = remainderStr.replace(/0+$/, '');

  if (trimmedRemainder === '') {
    return quotient.toString();
  }

  return `${quotient}.${trimmedRemainder}`;
};

/**
 * Format USD price with proper decimal places
 */
const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (numPrice === 0) return '0.00';
  if (numPrice < 0.01) return '<0.01';

  return numPrice.toFixed(2);
};

/**
 * Format USD value with commas and proper decimals
 */
const formatValue = (
  value: number | string,
  notation: 'standard' | 'compact' = 'standard'
): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (numValue === 0) return '0.00';

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation,
  }).format(numValue);
};

/**
 * Format percentage with proper decimal places
 */
const formatPercentage = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format time for display (handles both Date objects and ISO strings)
 */
const formatTime = (timestamp: Date | string): string => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleTimeString();
};

/**
 * Format date for display (handles both Date objects and ISO strings)
 */
const formatDate = (timestamp: Date | string): string => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleDateString();
};

export const formatters = {
  balance: formatBalance,
  price: formatPrice,
  value: formatValue,
  percentage: formatPercentage,
  time: formatTime,
  date: formatDate,
} as const;
