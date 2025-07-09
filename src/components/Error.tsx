import styled, { keyframes } from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { useParsedSearchParams } from "../hooks/useParsedSearchParams";

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  color: #000;
  padding: 40px;
  box-sizing: border-box;
`;

const ErrorCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 500px;
  width: 100%;
`;

const ErrorIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 24px;
  font-size: 40px;
  animation: ${shake} 0.5s ease-in-out;
`;

const ErrorTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin: 0 0 32px 0;
  line-height: 1.5;
  font-weight: 300;
`;

const RetryButton = styled.button`
  background: rgb(213, 213, 213);
  border: 0;
  color: #464646;
  padding: 12px 32px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(156, 156, 156, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  const queryClient = useQueryClient();
  const [searchParams] = useParsedSearchParams();

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["cryptoData", searchParams] });
  };

  return (
    <ErrorContainer>
      <ErrorCard>
        <ErrorIcon>⚠️</ErrorIcon>
        <ErrorTitle>Oops! Something went wrong</ErrorTitle>
        <ErrorMessage>{message}</ErrorMessage>
        <RetryButton onClick={handleRetry}>Try Again</RetryButton>
      </ErrorCard>
    </ErrorContainer>
  );
}
