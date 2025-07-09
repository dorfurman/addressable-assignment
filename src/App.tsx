import styled from "styled-components";
import Grid from "./components/Grid";

const AppView = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  return (
    <AppView>
      <Grid />
    </AppView>
  );
}
