import styled from "styled-components";
import Grid from "./components/Grid";
import { useCryptoData } from "./hooks/useCryptoData";

const AppView = styled.div`
  height: 100vh;
  width: 100%;
`;

export default function App() {
  const data = useCryptoData();
  console.log(data);
  return (
    <AppView>
      <Grid />
    </AppView>
  );
}
