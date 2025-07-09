import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  color: #000;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgb(2, 2, 2);
  border-top: 4px solid rgb(207, 207, 207);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 24px;
`;

const LoadingText = styled.h2`
  font-size: 24px;
  font-weight: 300;
  margin: 0;
  animation: ${pulse} 2s ease-in-out infinite;
  letter-spacing: 1px;
`;

const SubText = styled.p`
  font-size: 14px;
  opacity: 0.8;
  margin: 8px 0 0 0;
  font-weight: 300;
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading Crypto Data</LoadingText>
      <SubText>Please wait while we fetch the latest information...</SubText>
    </LoadingContainer>
  );
}
