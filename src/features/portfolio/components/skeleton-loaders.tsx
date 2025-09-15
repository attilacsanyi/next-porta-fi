// Reusable skeleton card component
const SkeletonCard = ({
  className = '',
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={`from-muted/20 to-muted/10 animate-pulse rounded-xl bg-gradient-to-br shadow-sm ${className}`}
  >
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
          <SkeletonCard
            key={i}
            className="h-32 p-6"
          />
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
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <TokenCardSkeleton key={i} />
    ))}
  </div>
);

interface VerificationBadgeSkeletonProps {
  size?: 'sm' | 'md' | 'lg';
}

export const VerificationBadgeSkeleton = ({
  size = 'md',
}: VerificationBadgeSkeletonProps) => {
  const sizeClasses = { sm: 'h-5 w-16', md: 'h-6 w-20', lg: 'h-7 w-24' };
  return (
    <div
      className={`bg-muted animate-pulse rounded-full ${sizeClasses[size]}`}
    />
  );
};
