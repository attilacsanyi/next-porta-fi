# Improvements

### Wallet Integration

- **Multiple Networks**: Support for Polygon, BSC, Arbitrum, Base, etc.

### Enhanced Loading States

- **Progressive Loading**: Implement the designed loading-balances → loading-metadata → loading-prices flow
- **Individual Token Refresh**: Add per-token verification reload functionality
- **Real-time Updates**: WebSocket connections for live price updates

### Performance Optimizations

- **Caching Layer**: Redis implementation for portfolio data
- **Background Refresh**: Automated portfolio updates
- **Rate Limit Handling**: Better CoinGecko API management (if we use coingecko for prices)
- **Image Loading**: Optimize token logo loading

### UI/UX Improvements

- **Portfolio Analytics**: Historical performance tracking (last 7 D)
- **Token Filters**: Filter by value, verified status, token type
- **Themes**: Improved theme with more customisation

### Data Features

- **More visuals**: Token Supply ratio, refresh portfolio,

### Developer Experience

- **Storybook**: Component documentation
- **Testing**: Unit and integration tests
- **Documentation**: API documentation (api/portfolio, etc.)
