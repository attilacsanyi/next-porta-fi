/**
 * Standardized logging utilities for portfolio operations
 */
type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  operation?: string;
  address?: string;
  tokenCount?: number;
  duration?: number;
  [key: string]: unknown;
}

/**
 * Create a context-aware logger for consistent log formatting
 */
export const createLogger = (service: string) => {
  const log = (level: LogLevel, message: string, context?: LogContext) => {
    const emoji = {
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
    }[level];

    const logMessage = `${emoji} [${service}] ${message}`;

    if (context) {
      console[level](logMessage, context);
    } else {
      console[level](logMessage);
    }
  };

  return {
    info: (message: string, context?: LogContext) =>
      log('info', message, context),
    warn: (message: string, context?: LogContext) =>
      log('warn', message, context),
    error: (message: string, context?: LogContext) =>
      log('error', message, context),
  };
};
