'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true only after the component has mounted on the client.
 * Useful to avoid SSR hydration mismatches caused by browser extensions or client-only code.
 *
 * @example
 * const isMounted = useIsMounted();
 * if (!isMounted) return <Skeleton />;
 */
export const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};
