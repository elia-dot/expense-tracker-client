import React from 'react';
import styled from 'styled-components';
import AddExpense from './components/AddExpense';
import CreditDetails from './components/CreditDetails';
import History from './components/History';
import Top from './components/Top';

const AppContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 950px) {
    width: 400px;
  }
`

function App() {
  return (
    <AppContainer >
      <Top/>
      <CreditDetails/>
      <History/>
      <AddExpense/>
    </AppContainer>
  );
}

export default App;
