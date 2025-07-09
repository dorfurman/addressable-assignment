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
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #1e2329;
  padding: 10px 12px;
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
  const [params, setParams] = useParsedSearchParams();

  const handlePageChange = (page: number) => {
    console.log("page", params.page);
    setParams({ page });
  };

  return (
    <PaginationContainer>
      <PaginationButton
        disabled={params.page === 1}
        onClick={() => handlePageChange((params.page ?? 1) - 1)}
      >
        Previous
      </PaginationButton>
      <PageLabel>{params.page}</PageLabel>
      <PaginationButton
        onClick={() => handlePageChange((params.page ?? 1) + 1)}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
}
