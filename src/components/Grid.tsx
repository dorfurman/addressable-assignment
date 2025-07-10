import { AgGridReact } from "ag-grid-react";
import styled from "styled-components";
import { useCryptoData } from "../hooks/useCryptoData";
import type { FormattedCryptoData } from "../types/types";
import GridHeader from "./GridHeader";
import GridPagination from "./GridPagination";
import { columnDefs } from "../utils/columnDefs";

const GridContainer = styled.div`
  height: auto;
  width: 100%;
  max-width: min(80%, 1500px);
  min-width: 320px;
  max-height: 80vh;
  min-height: 300px;
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

const AgGridWrapper = styled.div`
  overflow: auto;
`;

export default function Grid() {
  const { data, isLoading } = useCryptoData();

  return (
    <GridContainer>
      <GridHeader />
      <AgGridWrapper>
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
      </AgGridWrapper>
      <GridPagination />
    </GridContainer>
  );
}
