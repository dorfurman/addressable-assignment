import type { ColDef } from "ag-grid-community";
import type { FormattedCryptoData } from "../types/types";
import GridCellName from "../components/GridCellName";
import GridCellComponent from "../components/GridCellComponent";

export const columnDefs: ColDef<FormattedCryptoData>[] = [
  {
    headerName: "#",
    field: "rank",
    width: 70,
    sortable: true,
    headerClass: "custom-header",
    cellRenderer: (params: any) => (
      <GridCellComponent
        value={params.value}
        variant="rank"
        formatType="number"
      />
    ),
  },

  {
    headerName: "Name",
    field: "name",
    width: 280,
    sortable: true,
    headerClass: "custom-header",
    cellRenderer: GridCellName,
  },

  {
    headerName: "Price",
    field: "price",
    width: 150,
    sortable: true,
    headerClass: "custom-header",
    cellRenderer: (params: any) => (
      <GridCellComponent
        value={params.value}
        variant="price"
        formatType="currency"
      />
    ),
  },

  {
    headerName: "1h %",
    field: "change1h",
    width: 100,
    sortable: true,
    headerClass: "custom-header",
    cellRenderer: (params: any) => (
      <GridCellComponent
        value={params.value}
        variant="change"
        formatType="percentage"
      />
    ),
  },

  {
    headerName: "24h %",
    field: "change24h",
    width: 120,
    sortable: true,
    headerClass: "custom-header",
    cellRenderer: (params: any) => (
      <GridCellComponent
        value={params.value}
        variant="change"
        formatType="percentage"
      />
    ),
  },

  {
    headerName: "7d %",
    field: "change7d",
    width: 120,
    sortable: true,
    headerClass: "custom-header",
    cellRenderer: (params: any) => (
      <GridCellComponent
        value={params.value}
        variant="change"
        formatType="percentage"
      />
    ),
  },

  {
    headerName: "Market Cap",
    field: "marketCap",
    width: 150,
    sortable: true,
    headerClass: "custom-header",
    cellRenderer: (params: any) => (
      <GridCellComponent
        value={params.value}
        variant="standard"
        formatType="currencyCompact"
      />
    ),
  },

  {
    headerName: "Volume(24h)",
    field: "volume24h",
    width: 150,
    sortable: true,
    headerClass: "custom-header",
    cellRenderer: (params: any) => (
      <GridCellComponent
        value={params.value}
        variant="standard"
        formatType="currencyCompact"
      />
    ),
  },

  {
    headerName: "Total Supply",
    field: "totalSupply",
    width: 150,
    sortable: true,
    headerClass: "custom-header",
    cellRenderer: (params: any) => (
      <GridCellComponent
        value={params.value}
        variant="standard"
        formatType="numberCompact"
      />
    ),
  },

  {
    headerName: "Circulating Supply",
    field: "circulatingSupply",
    width: 180,
    sortable: true,
    headerClass: "custom-header",
    cellRenderer: (params: any) => (
      <GridCellComponent
        value={params.value}
        variant="standard"
        formatType="numberCompact"
      />
    ),
  },
];
