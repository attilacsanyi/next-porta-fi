import { PortfolioPageClient } from '@/features/portfolio/client';
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
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="text-center">
          <h1 className="mb-4 text-xl font-bold text-red-600 sm:text-2xl">
            Invalid Address
          </h1>
          <p className="text-muted-foreground mx-auto max-w-md">
            The provided address &quot;{address}&quot; is not a valid Ethereum
            address.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Portfolio</h1>
        <div className="text-muted-foreground font-mono text-sm break-all sm:text-base">
          Address: {address}
        </div>
      </div>

      <PortfolioPageClient address={address} />
    </div>
  );
};

export default PortfolioPage;
