// Platform for tokens (sometimes null, sometimes object)
export interface Platform {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

// Individual currency quote (like USD, etc)
export interface QuoteCurrency {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d?: number;
  percent_change_60d?: number;
  percent_change_90d?: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl?: number | null;
  last_updated: string;
}

// Quotes for a given item (multiple currencies)
export interface Quote {
  [currency: string]: QuoteCurrency;
}

// Main crypto item interface
export interface CryptoDataItem {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  infinite_supply: boolean;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform?: Platform | null;
  quote: Quote;
  self_reported_circulating_supply?: number | null;
  self_reported_market_cap?: number | null;
  tvl_ratio?: number | null;
}

// (optional) Status type if you want to match the CoinMarketCap API response
export interface Status {
  timestamp: string;
  error_code: number;
  error_message: string | null;
  elapsed: number;
  credit_count: number;
}

// Your mock data shape, if you want an array:
export type CryptoDataMock = CryptoDataItem[];

// Or, if you want the full object style (like CMC API):
export interface CryptoDataMockApi {
  data: CryptoDataItem[];
  status: Status;
}
