import styled from 'styled-components'


const MainContainer = styled.main`
    padding: 20px;
    background: #E5E5E5;
    border-radius: 7px;
    min-height: 85vh;
    margin: 20px auto;
    margin-bottom: 0;
    color: #353C64;
    width: 100%;
    max-width: 1400px;
    position: relative;

    @media screen and (max-width: 760px) {
        margin: 20px 0;
    }
`

export default MainContainer

