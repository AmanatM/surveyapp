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
`


const MyPollsPage = () => {

    return (
        <MainContainer>
            <InnerTopBar titleText="Все вопросы"/>
            My polls page
        </MainContainer>
    )
}

export default MyPollsPage