import React from "react";
import A from "./page/A";
import Header from "./page/Header";
import Left from "./page/Left";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const App = () => {
  return (
    <div>
      <Header />
      <Container>
        <Left />
        <A />
      </Container>
    </div>
  );
};

export default App;
