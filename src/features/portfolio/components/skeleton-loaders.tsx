/**
 * Simplified Skeleton Loading Components
 * High-level bouncing effects for clean loading states
 */

// Reusable skeleton card component
const SkeletonCard = ({ className = '', children }: { className?: string; children?: React.ReactNode }) => (
  <div className={`animate-pulse rounded-xl bg-gradient-to-br from-muted/20 to-muted/10 shadow-sm ${className}`}>
    {children}
  </div>
);

interface PortfolioOverviewSkeletonProps {
  showVerification?: boolean;
}

export const PortfolioOverviewSkeleton = ({
  showVerification = true,
}: PortfolioOverviewSkeletonProps) => {
  const cardCount = showVerification ? 4 : 3;

  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <SkeletonCard className="h-20 p-6" />

      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: cardCount }).map((_, i) => (
          <SkeletonCard key={i} className="h-32 p-6" />
        ))}
      </div>
    </div>
  );
};

export const TokenCardSkeleton = () => <SkeletonCard className="h-80" />;

interface TokenListSkeletonProps {
  count?: number;
}

export const TokenListSkeleton = ({ count = 6 }: TokenListSkeletonProps) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <TokenCardSkeleton key={i} />
    ))}
  </div>
);

interface VerificationBadgeSkeletonProps {
  size?: 'sm' | 'md' | 'lg';
}

export const VerificationBadgeSkeleton = ({ size = 'md' }: VerificationBadgeSkeletonProps) => {
  const sizeClasses = { sm: 'h-5 w-16', md: 'h-6 w-20', lg: 'h-7 w-24' };
  return <div className={`animate-pulse rounded-full bg-muted ${sizeClasses[size]}`} />;
};

interface LoadingProgressProps {
  steps: Array<{
    label: string;
    status: 'pending' | 'loading' | 'completed' | 'error';
    icon?: string;
  }>;
}

export const LoadingProgress = ({ steps }: LoadingProgressProps) => {
  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Loading Progress</h3>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <div
              className={`flex-shrink-0 ${
                step.status === 'loading' ? 'animate-spin' : ''
              }`}
            >
              {step.status === 'completed'
                ? '✅'
                : step.status === 'error'
                  ? '❌'
                  : step.status === 'loading'
                    ? '⏳'
                    : '⚪'}
            </div>
            <div className="flex-1">
              <div
                className={`text-sm ${
                  step.status === 'completed'
                    ? 'text-green-600'
                    : step.status === 'error'
                      ? 'text-red-600'
                      : step.status === 'loading'
                        ? 'text-blue-600'
                        : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
