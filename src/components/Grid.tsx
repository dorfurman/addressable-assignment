import { AgGridReact } from "ag-grid-react";
import styled from "styled-components";
import type { ColDef } from "ag-grid-community";
import { useCryptoData } from "../hooks/useCryptoData";

const GridContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default function Grid() {
  const { data, isLoading } = useCryptoData();
  return (
    <GridContainer>
      <AgGridReact loading={isLoading} rowData={data} columnDefs={columnDefs} />
    </GridContainer>
  );
}

const columnDefs: ColDef[] = [
  { headerName: "Rank", field: "rank", sortable: true, filter: true },
  { headerName: "Name", field: "name", sortable: true, filter: true },
  { headerName: "Symbol", field: "symbol", sortable: true, filter: true },
  {
    headerName: "Price",
    field: "price",
    sortable: true,
    filter: true,
    valueFormatter: (p) =>
      p.value?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 8,
      }),
  },
  {
    headerName: "Market Cap",
    field: "marketCap",
    sortable: true,
    filter: true,
    valueFormatter: (p) =>
      p.value?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
  },
  {
    headerName: "24h %",
    field: "change24h",
    sortable: true,
    filter: true,
    valueFormatter: (p) => p.value?.toFixed(2) + "%",
  },
  {
    headerName: "Volume 24h",
    field: "volume24h",
    sortable: true,
    filter: true,
    valueFormatter: (p) =>
      p.value?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
  },
];
