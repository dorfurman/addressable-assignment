import { useSearchParams } from "react-router-dom";
import type { FormattedCryptoData } from "../types/types";

export interface SearchParams {
  minMarketCap?: number;
  maxPrice?: number;
  sortBy?: keyof FormattedCryptoData;
  order?: "asc" | "desc";
  page?: number;
  mock?: boolean;
}

export function useParsedSearchParams(): [
  SearchParams,
  (next: Partial<SearchParams>) => void
] {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = parseCryptoSearchParams(searchParams);

  // Update only what's needed
  const updateParams = (next: Partial<SearchParams>) => {
    const merged = { ...params, ...next };
    // Remove undefined/null/empty string values
    const clean: Record<string, string> = {};
    Object.entries(merged).forEach(([k, v]) => {
      if (v !== undefined && v !== null) clean[k] = String(v);
    });
    setSearchParams(clean);
  };

  return [params, updateParams];
}

function parseCryptoSearchParams(searchParams: URLSearchParams): SearchParams {
  const params = Object.fromEntries(searchParams);
  return {
    minMarketCap: params.minMarketCap ? Number(params.minMarketCap) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    sortBy: params.sortBy as keyof FormattedCryptoData,
    order: params.order as "asc" | "desc",
    page: params.page ? Number(params.page) : 1,
    mock: params.mock === "true" ? true : undefined,
  };
}
