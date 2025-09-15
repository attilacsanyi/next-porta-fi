import { PortfolioDemo } from '@/features/portfolio';
import { AddressInput } from '@/features/portfolio/client';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="from-background to-muted/20 border-b bg-gradient-to-b py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to PortaFi
            </h1>
            <p className="text-muted-foreground mb-8 text-lg sm:text-xl">
              Explore Ethereum portfolios with real-time data and insights
            </p>

            {/* Address Input */}
            <div className="mx-auto mb-6 max-w-lg">
              <div className="mb-3">
                <h2 className="text-muted-foreground text-sm font-medium">
                  Explore any Ethereum address
                </h2>
              </div>
              <AddressInput />
            </div>

            <p className="text-muted-foreground text-sm">
              Connect your wallet or enter any address to get started
            </p>
          </div>
        </div>
      </section>

      {/* Demo Portfolio Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Portfolio Preview
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              See how your portfolio data will be displayed with this
              interactive demo
            </p>
          </div>

          {/* Demo Portfolio Content */}
          <div className="mx-auto max-w-6xl">
            <PortfolioDemo />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
