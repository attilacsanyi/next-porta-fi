const getEnvVar = (key: string, envVar: string | undefined) => {
  if (!envVar) {
    throw new Error(`${key} is not defined. Please set it in .env.local`);
  }
  return envVar;
};

/**
 * Environment Configuration
 * Centralized environment variable validation and export which support lazy evaluation for better performance
 */
export const env = {
  get projectId() {
    return getEnvVar(
      'NEXT_PUBLIC_PROJECT_ID',
      process.env.NEXT_PUBLIC_PROJECT_ID
    );
  },
  get alchemyApiKey() {
    return getEnvVar('ALCHEMY_API_KEY', process.env.ALCHEMY_API_KEY);
  },
} as const;
