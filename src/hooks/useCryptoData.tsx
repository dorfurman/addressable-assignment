import { useQuery } from "@tanstack/react-query";
import { cryptoDataMock } from "../mocks/cryptoDataMock";
import axios from "axios";
import type { CryptoDataItem, FormattedCryptoData } from "../types/types";
import { useParsedSearchParams } from "./useParsedSearchParams";
import { formatCryptoPrice } from "../utils/priceFormatter";

const API_URL = "/.netlify/functions/cryptos";

export const useCryptoData = () => {
  const [searchParams] = useParsedSearchParams();
  const isMock = searchParams.mock;

  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([_, value]) => value !== undefined)
  );

  const fetchCryptoData = async () => {
    try {
      const response = isMock
        ? cryptoDataMock
        : await axios.get(
            `${API_URL}?${new URLSearchParams({
              ...filteredSearchParams,
              page: searchParams.page?.toString() ?? "1",
            }).toString()}`
          );

      const formattedData = formatCryptoData(response.data);
      return formattedData;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["cryptoData", filteredSearchParams],
    queryFn: () => fetchCryptoData(),
    retry: false,
  });
};

function formatCryptoData(data: CryptoDataItem[]): FormattedCryptoData[] {
  return data.map((item) => {
    const usd = item.quote.USD;
    return {
      name: item.name,
      symbol: item.symbol,
      price: formatCryptoPrice(usd?.price ?? 0),
      marketCap: usd?.market_cap ?? null,
      change1h: usd?.percent_change_1h ?? null,
      change24h: usd?.percent_change_24h ?? null,
      change7d: usd?.percent_change_7d ?? null,
      rank: item.cmc_rank,
      volume24h: usd?.volume_24h ?? null,
      totalSupply: item.total_supply ?? null,
      circulatingSupply: item.circulating_supply ?? null,
      logo: item.logo || null,
    };
  });
}
