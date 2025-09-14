import { AddressInput } from '@/features/portfolio';
import { Button } from '@/shared/ui';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-8 p-8">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to PortaFi</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Enter an Ethereum address to view its portfolio
        </p>
      </div>

      <div className="w-full max-w-md">
        <AddressInput />
      </div>

      <div className="text-muted-foreground text-center text-sm">
        <p>Connect your wallet or manually enter any Ethereum address</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="bg-muted h-px flex-1"></div>
        <span className="text-muted-foreground text-xs">OR</span>
        <div className="bg-muted h-px flex-1"></div>
      </div>

      <div className="text-center">
        <Link href="/demo">
          <Button
            className="px-6"
            variant="outline"
          >
            View Demo Portfolio
          </Button>
        </Link>
        <p className="text-muted-foreground mt-2 text-xs">
          Explore the interface with sample data
        </p>
      </div>
    </div>
  );
};

export default HomePage;
