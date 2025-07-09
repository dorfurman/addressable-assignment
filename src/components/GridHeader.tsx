import styled from "styled-components";
import { useParsedSearchParams } from "../hooks/useParsedSearchParams";
import NumberInputField from "./NumberInputField";
import SelectField from "./SelectField";
import type { FormattedCryptoData } from "../types/types";

const GridHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const sortByOptions = [
  { value: "market_cap", label: "Market Cap" },
  { value: "price", label: "Price" },
  { value: "name", label: "Name" },
];

const orderOptions = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

export default function GridHeader() {
  const [searchParams, updateParams] = useParsedSearchParams();

  return (
    <GridHeaderContainer>
      <NumberInputField
        label="Min Market Cap"
        placeholder="e.g 1000000"
        value={searchParams.minMarketCap}
        onSubmit={(value) => updateParams({ minMarketCap: value })}
      />

      <NumberInputField
        label="Max Price"
        placeholder="e.g 50000000"
        value={searchParams.maxPrice}
        onSubmit={(value) => updateParams({ maxPrice: value })}
      />

      <SelectField
        label="Sort By"
        value={searchParams.sortBy || "market_cap"}
        options={sortByOptions}
        onChange={(value) =>
          updateParams({
            sortBy: value as keyof FormattedCryptoData,
          })
        }
      />

      <SelectField
        label="Order"
        value={searchParams.order || "desc"}
        options={orderOptions}
        onChange={(value) => updateParams({ order: value as "asc" | "desc" })}
      />
    </GridHeaderContainer>
  );
}
