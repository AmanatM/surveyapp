import React from 'react'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle' 

import Loginform from './components/LoginForm'

const Container = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
`

function App() {
  return (
      <div className="App">
        <GlobalStyle/>
        <Container>
          Amanat
          <Loginform/>
        </Container>
      </div>
  );
}

export default App;
