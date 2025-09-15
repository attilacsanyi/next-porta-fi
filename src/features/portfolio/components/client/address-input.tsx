'use client';

import { ClientOnly } from '@/shared/components';
import { Button, Input } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';

export const AddressInput = () => {
  const [address, setAddress] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { address: connectedAddress, isConnected } = useAccount();
  const router = useRouter();

  // Update address when wallet connects/disconnects
  useEffect(() => {
    if (isConnected && connectedAddress) {
      setAddress(connectedAddress);
    } else {
      setAddress('');
    }
  }, [connectedAddress, isConnected]);

  // Validate address whenever it changes
  useEffect(() => {
    setIsValid(address ? isAddress(address) : false);
  }, [address]);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value.trim());
  };

  const handleShowPortfolio = () => {
    if (isValid && address) {
      router.push(`/portfolio/${address}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isValid) {
      handleShowPortfolio();
    }
  };

  return (
    <ClientOnly
      fallback={
        <div className="w-full max-w-lg space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="bg-muted h-12 w-full animate-pulse rounded-lg shadow-sm" />
            </div>
            <div className="bg-muted h-12 w-36 animate-pulse rounded-lg shadow-sm" />
          </div>
        </div>
      }
    >
      <div className="w-full max-w-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              className={`h-12 font-mono text-sm shadow-sm transition-all duration-200 focus:shadow-md ${
                address && !isValid
                  ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20 dark:bg-red-950/20'
                  : 'focus:ring-primary/20'
              }`}
              placeholder="Enter Ethereum address (0x...)"
              type="text"
              value={address}
              suppressHydrationWarning
              onChange={handleAddressChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button
            className="h-12 px-6 font-semibold shadow-sm transition-all duration-200 hover:shadow-md"
            disabled={!isValid}
            suppressHydrationWarning
            onClick={handleShowPortfolio}
          >
            Show Portfolio
          </Button>
        </div>
        {address && !isValid && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 dark:bg-red-950/20">
            <svg
              className="h-4 w-4 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              Please enter a valid Ethereum address
            </p>
          </div>
        )}
      </div>
    </ClientOnly>
  );
};
