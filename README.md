# Porta Fi

[![Netlify Status](https://api.netlify.com/api/v1/badges/4fcd0131-334f-4bb7-8b32-3201ec71984a/deploy-status)](https://app.netlify.com/projects/next-porta-fi/deploys)

A portfolio tracker for Ethereum addresses. Enter any wallet address to see their token holdings with real-time prices. You can also connect your wallet and see your portfolio.

🚀 **Try it live**: [next-porta-fi.netlify.app](https://next-porta-fi.netlify.app/)

## Quick Start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` and try the demo address or enter your own wallet address.

## What it does

- Shows all tokens in a wallet with current prices
- Displays portfolio value and token count
- Works with any Ethereum address
- No wallet connection needed (just paste an address)

## Tech Stack

- Next.js 15 + React 19
- TypeScript + Tailwind CSS (dark/light theme)
- Alchemy for blockchain data and pricing
- Wagmi for Ethereum interactions (symbol + balance verification)

## Development

```bash
pnpm dev      # Start dev server
pnpm build    # Build for production
pnpm lint     # Run linter
pnpm format   # Run formatter
```

## Using Real Data

Create `.env.local` with your API keys:

```bash
ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
NEXT_PUBLIC_MAINNET_RPC_URL=your_rpc_url
```

## Technical Notes

The app handles some interesting challenges around serverless timeouts and Next.js 15 boundaries.
See [TECHNICAL_CHALLENGES.md](./TECHNICAL_CHALLENGES.md) for details and solutions.
