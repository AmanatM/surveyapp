import React from 'react'
import styled from 'styled-components'

import InnerTopBar from '../../components/InnerTopBar/InnerTopBar'

const MainContainer = styled.main`
    padding: 20px;
    background: #E5E5E5;
    border-radius: 7px;
    min-height: 85vh;
    margin: 20px 0;
    color: #353C64;

    @media screen and (max-width: 760px) {
        margin: 20px 0;
    }
`


const MyPollsPage = () => {

    return (
        <MainContainer>
            <InnerTopBar titleText="Все вопросы"/>
        </MainContainer>
    )
}

export default MyPollsPage