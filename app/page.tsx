import { AddressInput } from '@/features/portfolio';

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
    </div>
  );
};

export default HomePage;
