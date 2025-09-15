import { PortfolioPageClient } from '@/features/portfolio/client';
import Link from 'next/link';
import { isAddress } from 'viem';

interface PortfolioPageProps {
  params: Promise<{
    address: string;
  }>;
}

const PortfolioPage = async ({ params }: PortfolioPageProps) => {
  const { address } = await params;

  if (!isAddress(address)) {
    return (
      <div className="min-h-screen">
        <section className="flex min-h-[60vh] items-center justify-center py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950">
                <svg
                  className="h-8 w-8 text-red-600"
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
              </div>

              <h1 className="mb-4 text-2xl font-bold text-red-600 sm:text-3xl">
                Invalid Ethereum Address
              </h1>

              <p className="text-muted-foreground mb-8">
                The provided address &quot;{address}&quot; is not a valid
                Ethereum address. Please check the format and try again.
              </p>

              <Link
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium transition-colors"
                href="/"
              >
                Return Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Portfolio Header */}
      <section className="from-background to-muted/10 border-b bg-gradient-to-b py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center sm:text-left">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Portfolio Overview
              </h1>

              <div className="bg-muted/50 rounded-lg px-4 py-3 sm:px-6 sm:py-4">
                <p className="text-muted-foreground mb-1 text-sm font-medium">
                  Ethereum Address
                </p>
                <p className="font-mono text-sm break-all sm:text-base">
                  {address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <PortfolioPageClient address={address} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
