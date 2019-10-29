import React from 'react'
import GlobalStyle from './GlobalStyle' 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import {
//   BrowserRouter as Router,
//   Route, Link, Redirect, withRouter
// } from 'react-router-dom'

import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import HomePage from './pages/HomePage/HomePage'


function App() {

  return (
      <div className="App">
        <GlobalStyle/>
          <Router>
            <Switch>
            <Route exact path="/" render={() => <HomePage/>}/>
              <Route exact path="/login" render={() => <LoginPage/>}/>
              <Route exact path="/registration" render={() => <RegistrationPage/>}/>             
            </Switch>

          </Router>
      </div>
  );
}

export default App 
