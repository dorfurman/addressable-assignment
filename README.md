# Cryptocurrency Market Data Grid

A cryptocurrency market dashboard built with React and TypeScript, displaying live data from CoinMarketCap API in an interactive data grid.

## Features

- Real-time cryptocurrency data with sorting and filtering
- Filter by minimum market cap and maximum price
- Pagination (10 items per page)
- URL state management - filters persist in URL
- Mock data mode for development (`?mock=true`)

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, AG Grid, React Query
- **Backend**: Netlify Functions, Node.js
- **Deployment**: Netlify

## Project Structure

```
src/
├── components/          # React components (Grid, filters, etc.)
├── hooks/              # Custom hooks for data fetching
├── types/              # TypeScript interfaces
├── utils/              # Helper functions
└── mocks/              # Sample data for development

netlify/functions/      # Serverless API endpoints
```

> **Note**: The Netlify function uses `.js` instead of `.ts` since it's relatively small with minimal code, avoiding the extra TypeScript setup complexity for serverless functions.

## Getting Started

### Prerequisites

- Node.js 18+
- Netlify CLI: `npm install -g netlify-cli`
- CoinMarketCap API key (free at [pro.coinmarketcap.com](https://pro.coinmarketcap.com/api/))

### Setup

1. Clone and install dependencies:

   ```bash
   git clone <repo-url>
   cd addressable-assignment
   npm install
   ```

2. Create `.env` file:

   ```env
   CMC_PRO_API_KEY=your_api_key_here
   ```

3. Start development server:

   ```bash
   netlify dev
   ```

   App will be available at `http://localhost:8888`

### Development without API key

Add `?mock=true` to use sample data: `http://localhost:8888?mock=true`

## Configuration

Supported URL parameters:

| Parameter      | Description                                | Example                 |
| -------------- | ------------------------------------------ | ----------------------- |
| `minMarketCap` | Minimum market cap filter                  | `?minMarketCap=1000000` |
| `maxPrice`     | Maximum price filter                       | `?maxPrice=50000`       |
| `sortBy`       | Sort field (`market_cap`, `price`, `name`) | `?sortBy=price`         |
| `order`        | Sort direction (`asc`, `desc`)             | `?order=desc`           |
| `page`         | Page number                                | `?page=2`               |
| `mock`         | Use mock data                              | `?mock=true`            |

## Deployment

Deploy to Netlify:

1. Connect repository to Netlify
2. Set `CMC_PRO_API_KEY` environment variable
3. Deploy (build command: `npm run build`, publish directory: `dist`)
