import React from 'react'
import GlobalStyle from './GlobalStyle' 
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import {
//   BrowserRouter as Router,
//   Route, Link, Redirect, withRouter
// } from 'react-router-dom'

import LoginPage from './pages/LoginPage/LoginPage'


function App(props) {


  return (
      <div className="App">
        <GlobalStyle/>
          <Router>
            <Route exact path="/login" render={() => <LoginPage/>}/>
          </Router>
      </div>
  );
}

export default App 
