import { AgGridReact } from "ag-grid-react";
import styled from "styled-components";
import { useCryptoData } from "../hooks/useCryptoData";
import type { FormattedCryptoData } from "../types/types";
import GridHeader from "./GridHeader";
import GridPagination from "./GridPagination";
import { columnDefs } from "../utils/columnDefs";

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
  padding: 10px 0;
  overflow: hidden;
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
        suppressCellFocus={true}
        domLayout="autoHeight"
      />
      <GridPagination />
    </GridContainer>
  );
}
