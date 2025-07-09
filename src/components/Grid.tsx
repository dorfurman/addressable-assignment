import { AgGridReact } from "ag-grid-react";
import styled from "styled-components";

const GridContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default function Grid() {
  return (
    <GridContainer>
      <AgGridReact rowData={[]} columnDefs={[]} />
    </GridContainer>
  );
}
