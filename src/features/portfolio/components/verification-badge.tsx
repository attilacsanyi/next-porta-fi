/**
 * Verification Badge Component
 * Shows verification status for individual tokens
 */

import type { TokenVerificationResult, VerificationStatus } from '../types';

interface VerificationBadgeProps {
  verification?: TokenVerificationResult;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const VerificationBadge = ({
  verification,
  size = 'md',
  isLoading = false,
}: VerificationBadgeProps) => {
  const getStatusInfo = (status: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return {
          label: 'Verified',
          className: 'bg-green-100 text-green-800 border-green-200',
          icon: '✅',
        };
      case 'mismatch':
        return {
          label: 'Mismatch',
          className: 'bg-red-100 text-red-800 border-red-200',
          icon: '⚠️',
        };
      case 'unverified':
        return {
          label: 'Unverified',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '❌',
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: '⏳',
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '❓',
        };
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  // Show loading state if no verification data or explicitly loading
  if (isLoading || !verification) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 text-gray-600 ${sizeClasses[size]}`}
      >
        <span className="animate-spin text-xs">⏳</span>
        <span>Verifying...</span>
      </div>
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

  return (
    <div
      className={`inline-flex cursor-help items-center gap-1.5 rounded-full border font-medium ${statusInfo.className} ${sizeClasses[size]}`}
      title={
        verification.error
          ? `Error: ${verification.error}`
          : `${verification.name}: Symbol: ${verification.symbolMatch ? '✅' : '❌'} | Balance: ${verification.balanceMatch ? '✅' : '❌'}`
      }
    >
      <span className="text-xs">{statusInfo.icon}</span>
      <span>{statusInfo.label}</span>
    </div>
  );
};
