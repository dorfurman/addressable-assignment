import styled from "styled-components";
import { useParsedSearchParams } from "../hooks/useParsedSearchParams";

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 10px 24px;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  background-color: transparent;
  border: 0;
  border-radius: 6px;
  color: #1e2329;
  padding: 4px;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.2s ease;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const PageLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #1e2329;
`;

export default function GridPagination() {
  const [params, updateParams] = useParsedSearchParams();

  const handlePageChange = (page: number) => {
    updateParams({ page });
  };

  return (
    <PaginationContainer>
      <PageLabel>Current Page</PageLabel>
      <PaginationButton
        disabled={params.page === 1}
        onClick={() => handlePageChange((params.page ?? 1) - 1)}
      >
        {"<"}
      </PaginationButton>
      <PageLabel>{params.page}</PageLabel>
      <PaginationButton
        onClick={() => handlePageChange((params.page ?? 1) + 1)}
      >
        {">"}
      </PaginationButton>
    </PaginationContainer>
  );
}
