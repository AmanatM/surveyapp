import React from 'react'
import { Link } from 'react-router-dom'

import Container from '../../elements/Container'


const HomePage = () => {

    return (
        <Container>
            <Link to="/login">Go to login page</Link>
        </Container>
    )
}

export default HomePage