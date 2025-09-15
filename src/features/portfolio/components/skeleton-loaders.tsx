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
    <div className="bg-card rounded-lg border p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="bg-muted h-6 w-40 animate-pulse rounded" />
        <div className="bg-muted h-4 w-24 animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Total Value Skeleton */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="bg-muted h-4 w-20 animate-pulse rounded" />
          <div className="bg-muted mt-2 h-8 w-24 animate-pulse rounded" />
        </div>

        {/* Token Count Skeleton */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="bg-muted h-4 w-12 animate-pulse rounded" />
          <div className="bg-muted mt-2 h-8 w-8 animate-pulse rounded" />
        </div>

        {/* Verification Status Skeleton */}
        {showVerification && (
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="bg-muted h-4 w-16 animate-pulse rounded" />
            <div className="mt-2 flex items-center gap-2">
              <div className="bg-muted h-8 w-8 animate-pulse rounded" />
              <div className="bg-muted h-4 w-12 animate-pulse rounded" />
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
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Token Logo Skeleton */}
          <div className="bg-muted h-10 w-10 flex-shrink-0 animate-pulse rounded-full" />

          {/* Token Info Skeleton */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-muted h-4 w-20 animate-pulse rounded" />
              <div className="bg-muted h-3 w-12 animate-pulse rounded" />
            </div>
            <div className="bg-muted h-3 w-16 animate-pulse rounded" />
          </div>
        </div>

        {/* Verification Badge Skeleton */}
        {showVerificationBadge && (
          <div className="bg-muted h-6 w-20 flex-shrink-0 animate-pulse rounded-full" />
        )}
      </div>

      {/* Token Details Skeleton */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="bg-muted h-3 w-12 animate-pulse rounded" />
          <div className="bg-muted h-4 w-16 animate-pulse rounded" />
        </div>
        <div className="space-y-1">
          <div className="bg-muted h-3 w-8 animate-pulse rounded" />
          <div className="bg-muted h-4 w-12 animate-pulse rounded" />
        </div>
        <div className="col-span-2 space-y-1">
          <div className="bg-muted h-3 w-10 animate-pulse rounded" />
          <div className="bg-muted h-6 w-20 animate-pulse rounded" />
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
