import { useQuery } from "@tanstack/react-query";
import { cryptoDataMock } from "../mocks/cryptoDataMock";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = "/.netlify/functions/cryptos";

export const useCryptoData = () => {
  const searchParams = useSearchParams();
  const isMock = searchParams[0].get("mock") === "true";

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["cryptoData"],
    queryFn: () => (isMock ? cryptoDataMock.data : fetchCryptoData()),
    retry: false,
  });
};
