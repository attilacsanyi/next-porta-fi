/**
 * Skeleton Loading Components
 * Provides granular loading states for different UI sections
 */

interface PortfolioOverviewSkeletonProps {
  showVerification?: boolean;
}

export const PortfolioOverviewSkeleton = ({
  showVerification = true,
}: PortfolioOverviewSkeletonProps) => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="bg-muted mb-2 h-8 w-48 animate-pulse rounded-md" />
          <div className="bg-muted h-4 w-80 animate-pulse rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-muted h-4 w-4 animate-pulse rounded-full" />
          <div className="bg-muted h-4 w-32 animate-pulse rounded-md" />
        </div>
      </div>

      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Value Skeleton */}
        <div className="from-muted/20 to-muted/10 relative overflow-hidden rounded-xl bg-gradient-to-br p-6 shadow-sm">
          <div className="relative space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-muted h-9 w-9 animate-pulse rounded-lg" />
              <div className="bg-muted h-3 w-20 animate-pulse rounded-md" />
            </div>
            <div className="bg-muted h-10 w-32 animate-pulse rounded-md" />
          </div>
        </div>

        {/* ETH Balance Skeleton */}
        <div className="from-muted/20 to-muted/10 relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 shadow-sm">
          <div className="relative space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-muted h-9 w-9 animate-pulse rounded-lg" />
              <div className="bg-muted h-3 w-24 animate-pulse rounded-md" />
            </div>
            <div className="bg-muted h-8 w-28 animate-pulse rounded-md" />
            <div className="bg-muted h-3 w-20 animate-pulse rounded-md" />
          </div>
        </div>

        {/* Token Count Skeleton */}
        <div className="from-muted/20 to-muted/10 relative overflow-hidden rounded-xl bg-gradient-to-br p-6 shadow-sm">
          <div className="relative space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-muted h-9 w-9 animate-pulse rounded-lg" />
              <div className="bg-muted h-3 w-24 animate-pulse rounded-md" />
            </div>
            <div className="bg-muted h-8 w-12 animate-pulse rounded-md" />
            <div className="bg-muted h-3 w-28 animate-pulse rounded-md" />
          </div>
        </div>

        {/* Verification Status Skeleton */}
        {showVerification && (
          <div className="from-muted/20 to-muted/10 relative overflow-hidden rounded-xl bg-gradient-to-br p-6 shadow-sm">
            <div className="relative space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-muted h-9 w-9 animate-pulse rounded-lg" />
                <div className="bg-muted h-3 w-16 animate-pulse rounded-md" />
              </div>
              <div className="flex items-baseline gap-2">
                <div className="bg-muted h-8 w-12 animate-pulse rounded-md" />
                <div className="bg-muted h-4 w-12 animate-pulse rounded-md" />
              </div>
              <div className="bg-muted h-3 w-20 animate-pulse rounded-md" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface TokenCardSkeletonProps {
  showVerificationBadge?: boolean;
}

export const TokenCardSkeleton = ({
  showVerificationBadge = true,
}: TokenCardSkeletonProps) => {
  return (
    <div className="from-muted/20 to-muted/10 overflow-hidden rounded-xl border-0 bg-gradient-to-br shadow-sm">
      <div className="space-y-0 p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {/* Token Logo Skeleton */}
            <div className="bg-muted ring-border/50 h-14 w-14 flex-shrink-0 animate-pulse rounded-full ring-2" />

            {/* Token Info Skeleton */}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-muted h-5 w-24 animate-pulse rounded-md" />
                <div className="bg-muted h-4 w-12 animate-pulse rounded-md" />
              </div>
              <div className="bg-muted h-4 w-20 animate-pulse rounded-md" />
            </div>
          </div>

          {/* Verification Badge Skeleton */}
          {showVerificationBadge && (
            <div className="bg-muted ml-2 h-6 w-20 flex-shrink-0 animate-pulse rounded-full" />
          )}
        </div>
      </div>

      {/* Token Details Skeleton */}
      <div className="space-y-6 p-6 pt-0">
        {/* Primary metrics grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="bg-muted h-3 w-16 animate-pulse rounded-md" />
            <div className="space-y-1">
              <div className="bg-muted h-4 w-20 animate-pulse rounded-md" />
              <div className="bg-muted h-3 w-12 animate-pulse rounded-md" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-muted h-3 w-12 animate-pulse rounded-md" />
            <div className="bg-muted h-4 w-16 animate-pulse rounded-md" />
          </div>
        </div>

        {/* Total Value skeleton */}
        <div className="from-muted/30 to-muted/20 rounded-lg bg-gradient-to-r p-4">
          <div className="bg-muted h-3 w-20 animate-pulse rounded-md" />
          <div className="bg-muted mt-1 h-7 w-24 animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  );
};

interface TokenListSkeletonProps {
  count?: number;
  showVerificationBadges?: boolean;
}

export const TokenListSkeleton = ({
  count = 6,
  showVerificationBadges = true,
}: TokenListSkeletonProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-muted h-6 w-16 animate-pulse rounded" />
          <div className="bg-muted h-4 w-8 animate-pulse rounded" />
        </div>
        <div className="bg-muted h-4 w-32 animate-pulse rounded" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <TokenCardSkeleton
            key={i}
            showVerificationBadge={showVerificationBadges}
          />
        ))}
      </div>
    </div>
  );
};

interface VerificationBadgeSkeletonProps {
  size?: 'sm' | 'md' | 'lg';
}

export const VerificationBadgeSkeleton = ({
  size = 'md',
}: VerificationBadgeSkeletonProps) => {
  const sizeClasses = {
    sm: 'h-5 w-16',
    md: 'h-6 w-20',
    lg: 'h-7 w-24',
  };

  return (
    <div
      className={`bg-muted animate-pulse rounded-full ${sizeClasses[size]}`}
    />
  );
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
