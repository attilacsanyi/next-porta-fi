import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui';
import type { TokenVerificationResult, VerificationStatus } from '../types';

interface VerificationBadgeProps {
  verification?: TokenVerificationResult;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

/**
 * Verification Badge Component
 */
export const VerificationBadge = ({
  verification,
  size = 'md',
  isLoading = false,
}: VerificationBadgeProps) => {
  const getStatusInfo = (status: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return {
          label: 'OK',
          className:
            'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800',
          icon: '✅',
        };
      case 'mismatch':
        return {
          label: 'WARN',
          className:
            'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800',
          icon: '⚠️',
        };
      case 'unverified':
        return {
          label: 'FAIL',
          className:
            'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700',
          icon: '❌',
        };
      case 'pending':
        return {
          label: 'WAIT',
          className:
            'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800',
          icon: '⏳',
        };
      default:
        return {
          label: '???',
          className:
            'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700',
          icon: '❓',
        };
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const iconSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Show loading state if no verification data or explicitly loading
  if (isLoading || !verification) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 ${sizeClasses[size]}`}
          >
            <span className={`animate-spin ${iconSizes[size]}`}>⏳</span>
            <span className="font-medium">LOAD</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Verifying token data...</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  const getStatus = (): VerificationStatus => {
    if (verification.verified) return 'verified';
    if (verification.error) return 'unverified';
    if (!verification.symbolMatch || !verification.balanceMatch)
      return 'mismatch';
    return 'pending';
  };

  const status = getStatus();
  const statusInfo = getStatusInfo(status);

  const tooltipContent = verification.error
    ? `Error: ${verification.error}`
    : `${verification.name}: Symbol: ${verification.symbolMatch ? '✅' : '❌'} | Balance: ${verification.balanceMatch ? '✅' : '❌'}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`inline-flex cursor-pointer items-center gap-2 rounded-full border font-medium transition-all duration-200 hover:scale-105 ${statusInfo.className} ${sizeClasses[size]}`}
        >
          <span className={iconSizes[size]}>{statusInfo.icon}</span>
          <span className="font-bold">{statusInfo.label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs text-center">{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
};
