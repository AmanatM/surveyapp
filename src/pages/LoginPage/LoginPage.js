import React from 'react'
import Loginform from '../../components/LoginForm'
import backgroundImg  from './survapp-bg1.jpg'
import styled from 'styled-components'
import logo from '../../assets/imgs/logo.svg'


import Container from '../../elements/Container'
import PageFooter from '../../components/Footer'

const LoginSection = styled.section`
    background: url(${backgroundImg}) #3F414A;
    min-height: 100vh;
    background-size: cover;
    color: white;
    background-position: center;
    padding-top: 4em;
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


const LoginPage = () => {
    
    return (
        <LoginSection>
            <Container>

                <Logo alt='logo' src={logo}/>

                <Info>
                    <div >Create your <br/>Own Surveys</div>
                    <div> <b>OR</b> </div>
                    <div>Answer <br/> someone else's <br/> questions  </div>
                </Info>

                <Loginform/>
            <PageFooter/>
            </Container>
        </LoginSection>
    )
}

export default LoginPage