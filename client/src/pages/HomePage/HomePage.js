import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Container from '../../elements/Container'

const HomeSection = styled.section`
    a {
        display: block;
        font-weight: bold;
        margin: 10px;
        color: blue;
    }
`

const HomePage = () => {

    return (
        <HomeSection>
            <Container style={{marginTop: '50px'}}>
                <p>Website is being developed. <i>Available pages to test:</i></p>
                <Link to="/login">Check login page</Link>
                <Link to="/registration">Check registration page</Link>
                <Link to="/main/">Go to main frame window(Child routes are in sidenav of mainframe)</Link>
            </Container>
        </HomeSection>

    )
}

export default HomePage