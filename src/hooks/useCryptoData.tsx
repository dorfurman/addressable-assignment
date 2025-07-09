import { useQuery } from "@tanstack/react-query";
import { cryptoDataMock } from "../mocks/cryptoDataMock";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import type { CryptoDataItem, FormattedCryptoData } from "../types/types";

const API_URL = "/.netlify/functions/cryptos";

export const useCryptoData = () => {
  const searchParams = useSearchParams();
  const isMock = searchParams[0].get("mock") === "true";

  const fetchCryptoData = async () => {
    try {
      const response = isMock ? cryptoDataMock : await axios.get(`${API_URL}`);
      const formattedData = cryptoDataToRows(response.data);
      return formattedData;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["cryptoData"],
    queryFn: () => fetchCryptoData(),
    retry: false,
  });
};

function cryptoDataToRows(data: CryptoDataItem[]): FormattedCryptoData[] {
  return data.map((item) => {
    const usd = item.quote.USD;
    return {
      name: item.name,
      symbol: item.symbol,
      price: usd?.price ?? null,
      marketCap: usd?.market_cap ?? null,
      change24h: usd?.percent_change_24h ?? null,
      rank: item.cmc_rank,
      volume24h: usd?.volume_24h ?? null,
    };
  });
}
