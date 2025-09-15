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
        <div className="w-full max-w-lg space-y-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <div className="bg-muted h-10 w-full animate-pulse rounded-md border" />
            </div>
            <div className="bg-muted h-10 w-32 animate-pulse rounded-md" />
          </div>
        </div>
      }
    >
      <div className="w-full max-w-lg space-y-2">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Input
              className={`font-mono text-sm ${
                address && !isValid ? 'border-red-500 focus:border-red-500' : ''
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
            className="whitespace-nowrap"
            disabled={!isValid}
            suppressHydrationWarning
            onClick={handleShowPortfolio}
          >
            Show Portfolio
          </Button>
        </div>
        {address && !isValid && (
          <p className="px-1 text-sm text-red-500">
            Please enter a valid Ethereum address
          </p>
        )}
      </div>
    </ClientOnly>
  );
};
