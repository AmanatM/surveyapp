import React, { useEffect } from 'react'
import GlobalStyle from './GlobalStyle' 
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { initUser } from './reducers/user'


// import {
//   BrowserRouter as Router,
//   Route, Link, Redirect, withRouter
// } from 'react-router-dom'

import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import MainFrame from './components/MainFrame/MainFrame'
import MainPage from './pages/MainPage'




const App = (props) => {

    useEffect(() => {
      props.initUser()
    }, [])

    return (
      <div className="App">
        <GlobalStyle/>
          <Router>
            <Switch>
              
              <Route exact path="/" render={() => <MainPage/>}/>
              <Route path="/main" render={() => <MainFrame/>}/>   
              <Route exact path="/login" render={() => <LoginPage/>}/>
              <Route exact path="/registration" render={() => <RegistrationPage/>}/>  

              {/* {props.user ? <Redirect to="/main/my-polls"/> : <Redirect to="/login"/> } */}

            </Switch>

          </Router>
      </div>
    )

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, {initUser})(App))
