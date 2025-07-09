import styled from "styled-components";
import Grid from "./components/Grid";
import Loading from "./components/Loading";
import Error from "./components/Error";
import { useCryptoData } from "./hooks/useCryptoData";

const AppView = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const { isInitialLoading, error } = useCryptoData();

  if (isInitialLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <AppView>
      <Grid />
    </AppView>
  );
}
