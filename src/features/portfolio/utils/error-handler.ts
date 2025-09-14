export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Standardized error handler for API operations
 */
export const apiErrorHandler = (
  error: unknown,
  context: string,
  fallback?: unknown
): never | unknown => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  console.error(`❌ ${context} failed:`, errorMessage);

  if (fallback !== undefined) {
    console.warn(`🔄 Using fallback for ${context}`);
    return fallback;
  }

  throw new Error(`${context}: ${errorMessage}`);
};

/**
 * Create user-friendly error messages from API errors
 */
export const createUserErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // Map specific error types to user-friendly messages
    if (error.message.includes('rate limit')) {
      return 'Too many requests. Please try again in a few moments.';
    }

    if (error.message.includes('network')) {
      return 'Network connection issue. Please check your internet connection.';
    }

    if (error.message.includes('Invalid address')) {
      return 'Please enter a valid Ethereum address.';
    }

    return 'An unexpected error occurred. Please try again.';
  }

  return 'Service temporarily unavailable. Please try again later.';
};
