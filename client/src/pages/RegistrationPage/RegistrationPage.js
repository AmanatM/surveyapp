import React from 'react'
import styled from 'styled-components'

import RegistrationForm from './RegistrationForm'
import Footer from '../../components/Footer'

import Container from '../../elements/Container'

import backgroundImg  from '../../assets/imgs/survapp-bg-blured.jpg'
import logo  from '../../assets/imgs/logo.svg'



const RegistrationSection = styled.section`
    min-height: 100vh;
    background: url(${backgroundImg}) #3F414A;
    background-position: center;
    background-size: cover;
    color: white;
    padding-top: 45px;
`

const Logo = styled.img`
    width: 300px;
    display: block;
    margin: 0 auto;
    margin-bottom: 30px;
`


const RegistrationPage = () => {

    return (
        <RegistrationSection>
            <Container>
                <Logo alt="surveyapp logo" src={logo}/>
                <RegistrationForm/>
            </Container>
            <Footer/>
        </RegistrationSection>
    )
}

export default RegistrationPage