'use client';

import shineStyles from '@/shared/styles/shine.module.css';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui';
import { useState } from 'react';
import type { TokenVerificationResult, VerificationStatus } from '../../types';

interface VerificationBadgeProps {
  verification: TokenVerificationResult;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Verification Badge Component
 */
export const VerificationBadge = ({
  verification,
  size = 'sm',
}: VerificationBadgeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };
  const getStatusInfo = (status: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return {
          label: 'OK',
          className: `bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800 ${shineStyles.shineSlow}`,
          icon: '✅',
        };
      case 'mismatch':
        return {
          label: 'WARN',
          className:
            'animate-pulse bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800',
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
    <Tooltip
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <TooltipTrigger asChild>
        <div
          aria-label={`Verification status: ${statusInfo.label}`}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-full border font-medium transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${statusInfo.className} ${sizeClasses[size]}`}
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
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
