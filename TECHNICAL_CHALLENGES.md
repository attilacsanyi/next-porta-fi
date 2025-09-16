# Technical Challenges

## The Big One: Serverless Timeouts

**The Problem**: The app worked perfectly locally but kept timing out in production on Netlify.

I was using using CoinGecko's API for token prices, but it has rate limits that add 1.2s delays between requests. With 15+ tokens, this easily exceeded Netlify's 10-second serverless function limit.

**The Fix**: Switched to Alchemy's pricing API which lets us get all prices in one call. This cut load times from 18+ seconds down to 2-3 seconds and eliminated the timeout issues.

## Next.js 15 Server/Client Boundaries

**The Problem**: Environment variables were leaking to the client side, causing build errors.

**The Fix**: Strict separation between server-only and client-safe code. Server code goes in `/server/` directories, client code gets its own exports from `client` barrel.

## Alchemy SDK Integration

**The Problem**: The Alchemy SDK wasn't playing nice with Next.js server components.

**The Fix**: Added `connectionInfoOverrides: { skipFetchSetup: true }` to make it work with server-side rendering.

## Performance Optimization

**The Problem**: We were making way too many API calls - one for each token's balance, then another for metadata.

**The Fix**: Used Alchemy's `getTokensForOwner()` method that gets everything in one call. This reduced API calls by 90%+.

## What I've Learned

- **Single API provider is better**: Using Alchemy for both token data and pricing eliminated complexity
- **Server components are great**: But you need to be careful about what code runs where
- **Batch requests matter**: One call vs many calls makes a huge difference in serverless environments
- **API providers pick**: Important to test API providers first and which api's included in the free tier to save costs. Read all available api's first not just start implementing based on first viable api.

## Current Limits

- Can handle limited tokens per portfolio (price per contract address, so we might see Netlify serverless 10 sec limits in some cases)
- Some browser extensions (password managers, etc.) cause hydration warnings (we wrap those components in `ClientOnly`)

## Performance

- Caching can be added for prices for the same contracts across portfolios which can speed up things
