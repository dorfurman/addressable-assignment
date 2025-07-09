import styled from "styled-components";
import Grid from "./components/Grid";
import { useCryptoData } from "./hooks/useCryptoData";

const AppView = styled.div`
  height: 100vh;
  width: 100%;
`;

export default function App() {
  const { isLoading, isError } = useCryptoData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <AppView>
      <Grid />
    </AppView>
  );
}
