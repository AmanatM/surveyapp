import React, { useEffect } from 'react'
import GlobalStyle from './GlobalStyle' 
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { initUser } from './reducers/user'

import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import MainFrame from './components/MainFrame/MainFrame'
import MainPage from './pages/MainPage'
import RecoverPasswordPage from './pages/RecoverPasswordPage/RecoverPasswordPage'
import NotFound from './components/NotFound/NotFound'

import PopUp from './components/PopUp/PopUp'




const App = (props) => {

    useEffect(() => {
      props.initUser()

    }, [])


    return (
      <div className="App">
        <GlobalStyle/>
        <PopUp/>
          <Router>
            <Switch>
              
              <Route exact path="/" render={() => <MainPage/>}/>
              <Route path="/main" render={() => <MainFrame/>}/>   
              <Route exact path="/login" render={() => <LoginPage/>}/>
              <Route exact path="/registration" render={() => <RegistrationPage/>}/>  
              <Route exact path="/recover-password" render={() => <RecoverPasswordPage/>}/>

              <Route render={() => <NotFound/>}/>

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
