# Next Porta Fi

[![Netlify Status](https://api.netlify.com/api/v1/badges/4fcd0131-334f-4bb7-8b32-3201ec71984a/deploy-status)](https://app.netlify.com/projects/next-porta-fi/deploys)

A modern portfolio finance application built with Next.js 15 and Ethereum integration. Visualize cryptocurrency portfolios with real-time pricing and blockchain verification.

## Quick Start

🚀 **Live Demo**: [https://next-porta-fi.netlify.app/](https://next-porta-fi.netlify.app/)

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the interactive portfolio demo and start exploring!

## Tech Stack

- **Next.js 15** - App Router with async components
- **React 19** - Latest React features
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Wagmi** - Ethereum interactions
- **Alchemy SDK** - Token data and metadata
- **CoinGecko API** - Real-time pricing

## Features

- Portfolio overview with total value and token count
- Individual token cards with metadata
- Blockchain verification system
- Responsive mobile design
- Demo mode (no API setup required)
- Dark/light theme support

## Development

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm lint     # Run ESLint
pnpm format   # Format code
```

## Real Data Setup (Optional)

Create `.env.local` with your API keys:

```bash
ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
NEXT_PUBLIC_MAINNET_RPC_URL=your_rpc_url
```

## Deployment

The application is deployed on [Netlify](https://next-porta-fi.netlify.app/) with automatic deployments from the main branch.
