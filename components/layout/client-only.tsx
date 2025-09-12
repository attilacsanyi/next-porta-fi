'use client';

import { useIsMounted } from '@/hooks/use-is-mounted';
import { ReactElement, ReactNode } from 'react';

interface ClientOnlyProps<T extends ReactNode = ReactElement> {
  children: T;
  fallback?: ReactNode;
}

/**
 * Renders children only after the component has mounted on the client.
 * Prevents hydration mismatches caused by browser extensions or client-only code.
 *
 * @example
 * <ClientOnly fallback={<Skeleton />}>
 *   <YourClientComponent />
 * </ClientOnly>
 */
export const ClientOnly = <T extends ReactNode = ReactElement>({
  children,
  fallback = null,
}: ClientOnlyProps<T>) => {
  const isMounted = useIsMounted();

  if (!isMounted) return <>{fallback}</>;

  return <>{children}</>;
};
