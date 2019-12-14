import React from 'react'
import { Link } from 'react-router-dom'
import setMetaTheme from '../../utils/setThemeColor'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import backgroundImg  from '../../assets/imgs/survapp-bg1.jpg'
import styled from 'styled-components'
import logo from '../../assets/imgs/logo.svg'


import Container from '../../elements/Container'
import PageFooter from '../../components/Footer'
import Loginform from './LoginForm'




const LoginSection = styled.section`
    background: url(${backgroundImg}) #091211;
    min-height: 100vh;
    background-size: cover;
    color: white;
    background-position: center;
    padding-top: 45px;
`

const Logo = styled.img`
    width: 400px;
    display: block;
    margin: 0 auto;
`
const Info = styled.div`
        display: flex;
        max-width: 100%;
        width: 500px;
        margin: 0 auto;
        justify-content: space-between;
        margin-top: 3em;
        align-content: center;
        font-size: 1.1em;

        div {
            text-align: center;
            display: flex;
            align-items: center;
        }
`


const LoginPage = (props) => {

    setMetaTheme('#091211')

    return (
        <LoginSection>
            <Container>

                <Link to="/"><Logo alt="surveyapp logo" src={logo}/></Link>

                        <Info>
                            <div >Create your <br/>Own Surveys</div>
                            <div> <b>OR</b> </div>
                            <div>Answer <br/> someone else's <br/> questions  </div>
                        </Info>

                <Loginform/>
                
            </Container>
            <PageFooter/>
        </LoginSection>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, null)(LoginPage))