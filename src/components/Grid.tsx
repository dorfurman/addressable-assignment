import { AgGridReact } from "ag-grid-react";
import styled from "styled-components";
import type { ColDef } from "ag-grid-community";
import { useCryptoData } from "../hooks/useCryptoData";
import type { FormattedCryptoData } from "../types/types";
import GridHeader from "./GridHeader";
import GridCellName from "./GridCellName";
import GridPagination from "./GridPagination";

const GridContainer = styled.div`
  width: 1500px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 20px;
  padding: 0;
  background: #ffffff;
  box-shadow: 0 4px 20px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px 0;
`;

export default function Grid() {
  const { data, isLoading } = useCryptoData();

  return (
    <GridContainer>
      <GridHeader />
      <AgGridReact<FormattedCryptoData>
        className="ag-theme-alpine coinmarketcap-grid"
        loading={isLoading}
        rowData={data}
        columnDefs={columnDefs}
        animateRows={true}
        rowHeight={60}
        headerHeight={50}
        suppressRowClickSelection={true}
        suppressCellFocus={true}
        domLayout="autoHeight"
      />
      <GridPagination />
    </GridContainer>
  );
}

export const columnDefs: ColDef<FormattedCryptoData>[] = [
  {
    headerName: "#",
    field: "rank",
    sortable: true,
    width: 70,
    cellStyle: {
      fontWeight: "500",
      color: "#58667e",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
    },
    headerClass: "custom-header",
  },
  {
    headerName: "Name",
    field: "name",
    sortable: true,
    width: 280,
    cellRenderer: GridCellName,
    cellStyle: {
      paddingLeft: "16px",
      paddingRight: "16px",
      display: "flex",
      alignItems: "center",
    },
    headerClass: "custom-header",
  },
  {
    headerName: "Price",
    field: "price",
    sortable: true,
    width: 150,
    valueFormatter: (p) =>
      p.value?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: p.value > 1 ? 2 : 8,
      }),
    cellStyle: {
      fontWeight: "600",
      color: "#1e2329",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
    },
    headerClass: "custom-header",
  },
  {
    headerName: "1h %",
    field: "change1h",
    sortable: true,
    width: 100,
    valueFormatter: (p) =>
      p.value ? (p.value > 0 ? "+" : "") + p.value.toFixed(2) + "%" : "--",
    cellClassRules: {
      "positive-change": (params) => params.value > 0,
      "negative-change": (params) => params.value < 0,
      "neutral-change": (params) => params.value === 0 || params.value === null,
    },
    cellStyle: {
      fontWeight: "600",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
    },
    headerClass: "custom-header",
  },
  {
    headerName: "24h %",
    field: "change24h",
    sortable: true,
    width: 120,
    valueFormatter: (p) =>
      p.value ? (p.value > 0 ? "+" : "") + p.value.toFixed(2) + "%" : "--",
    cellClassRules: {
      "positive-change": (params) => params.value > 0,
      "negative-change": (params) => params.value < 0,
      "neutral-change": (params) => params.value === 0 || params.value === null,
    },
    cellStyle: {
      fontWeight: "600",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
    },
    headerClass: "custom-header",
  },
  {
    headerName: "7d %",
    field: "change7d",
    sortable: true,
    width: 120,
    valueFormatter: (p) => {
      return p.value
        ? (p.value > 0 ? "+" : "") + p.value.toFixed(2) + "%"
        : "--";
    },
    cellClassRules: {
      "positive-change": (params) => {
        return params.value !== null && params.value > 0;
      },
      "negative-change": (params) => {
        return params.value !== null && params.value < 0;
      },
      "neutral-change": (params) => {
        return params.value === 0 || params.value === null;
      },
    },
    cellStyle: {
      fontWeight: "600",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
    },
    headerClass: "custom-header",
  },
  {
    headerName: "Market Cap",
    field: "marketCap",
    sortable: true,
    width: 150,
    valueFormatter: (p) => {
      if (!p.value) return "--";
      if (p.value >= 1e12) return "$" + (p.value / 1e12).toFixed(2) + "T";
      if (p.value >= 1e9) return "$" + (p.value / 1e9).toFixed(2) + "B";
      if (p.value >= 1e6) return "$" + (p.value / 1e6).toFixed(2) + "M";
      return p.value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    },
    cellStyle: {
      fontWeight: "500",
      color: "#1e2329",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
    },
    headerClass: "custom-header",
  },
  {
    headerName: "Volume(24h)",
    field: "volume24h",
    sortable: true,
    width: 150,
    valueFormatter: (p) => {
      if (!p.value) return "--";
      if (p.value >= 1e12) return "$" + (p.value / 1e12).toFixed(2) + "T";
      if (p.value >= 1e9) return "$" + (p.value / 1e9).toFixed(2) + "B";
      if (p.value >= 1e6) return "$" + (p.value / 1e6).toFixed(2) + "M";
      return p.value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    },
    cellStyle: {
      fontWeight: "500",
      color: "#1e2329",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
    },
    headerClass: "custom-header",
  },
  {
    headerName: "Total Supply",
    field: "totalSupply",
    sortable: true,
    width: 150,
    valueFormatter: (p) => {
      if (!p.value) return "--";
      if (p.value >= 1e12) return (p.value / 1e12).toFixed(2) + "T";
      if (p.value >= 1e9) return (p.value / 1e9).toFixed(2) + "B";
      if (p.value >= 1e6) return (p.value / 1e6).toFixed(2) + "M";
      if (p.value >= 1e3) return (p.value / 1e3).toFixed(2) + "K";
      return p.value.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      });
    },
    cellStyle: {
      fontWeight: "500",
      color: "#1e2329",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
    },
    headerClass: "custom-header",
  },
  {
    headerName: "Circulating Supply",
    field: "circulatingSupply",
    sortable: true,
    width: 180,
    valueFormatter: (p) => {
      if (!p.value) return "--";
      if (p.value >= 1e9) return (p.value / 1e9).toFixed(2) + "B";
      if (p.value >= 1e6) return (p.value / 1e6).toFixed(2) + "M";
      if (p.value >= 1e3) return (p.value / 1e3).toFixed(2) + "K";
      return p.value.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      });
    },
    cellStyle: {
      fontWeight: "500",
      color: "#1e2329",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
    },
    headerClass: "custom-header",
  },
];
