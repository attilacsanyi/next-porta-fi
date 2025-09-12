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
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            Invalid Address
          </h1>
          <p className="text-muted-foreground">
            The provided address &quot;{address}&quot; is not a valid Ethereum
            address.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground font-mono text-sm">
          Address: {address}
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Portfolio Overview</h2>
          <p className="text-muted-foreground">
            For now, this page shows that the address routing and validation is
            working correctly.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">ETH Balance</h2>
          <p className="text-muted-foreground">ETH balance, etc.</p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">ERC-20 Tokens</h2>
          <p className="text-muted-foreground">Token balances, etc.</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
