import styled from 'styled-components'
import MainContainer from '../../elements/MainContainer'

export const MainContainerStyled = styled(MainContainer)`
    display: flex;
    @media screen and (max-width: 1160px) {
        flex-direction: column;
    }
`

export const FirstCol = styled.div`
    flex: calc(50% - 26px) 0 0;
    margin-right: 25px;
    @media screen and (max-width: 1160px) {
        margin-right: 0;
        flex: 100%;

    }
`

export const SecondCol = styled.div`
    flex: 50% 0 0;
    @media screen and (max-width: 1160px) {
        flex: 100%;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
    }
`

export const ProfileBaseInfo = styled.div`
    text-align: center;
    padding-top: 20px;

    .avatar {
        margin: 15px 0;
        img {
            border-radius: 50%;
            width: 160px;
            border: 5px solid #0078B4;
       }
    }

    .username {


        div {
            width: 80%;
            margin: 0 auto;
            font-weight: bold;
            color: #5F76FF;
            font-size: 2em;
            padding: 0;
            margin-top: 20x;
            margin-bottom: 20px;
            border-bottom: 3px solid #5F76FF;
            margin-top: 20px;
        }
    }

`

export const Statistics = styled.div`
    border-radius: 10px;
    background: #EDEDED;
    margin-top: 30px;
    padding: 15px 30px;
    display: flex;


    div.diagram {
        width: 150px;
        margin-right: 40px;
    }

    div.text_data {

        display: flex;
        flex-direction: column;
        justify-content: space-around;

        @media screen and (max-width: 400px){
            h3 {
                margin-bottom: 10px;
            }
        }

        p {
            font-weight: bold;
            font-size: .85em;
            display: flex;
            align-items: center;

            @media screen and (max-width: 400px){
                margin: 7px 0;
            }

            span {
                margin-left: auto;
                padding-left: 20px;
            }

            &.my_polls {
                color: #00AC65;
            }

            &.passed_polls {
                color: #1488C8;
            }
        }
    }

    @media screen and (max-width: 1160px) {
        margin-bottom: 20px;
        justify-content: center;
        
        div.diagram {
            min-width: 100px;
        }
        

        
    }

`

export const ProfilePersonalData = styled.div`

    background-color: #EDEDED;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    margin-top: 30px;
    
    h3 {
        text-align: center;
        margin-bottom: 20px;
    }
`

export const InputGroup = styled.div`

    display: flex;
    align-items: center;
    margin: 15px 0;

    *[disabled] {
        cursor: not-allowed;
        color: grey;
        transition: all .2s;
    }

    label {
        flex: 150px 0 1;
        color: #353C64;
        font-weight: bold;
        font-size: .85em;
    }

    input {
        outline-color: #5F76FF;
        transition: all .2s;
        flex: auto 1 0;
        color: #5F76FF;
        border-radius: 8px;
        border: 2px solid #DEDEDE;
        padding: 5px 5px;
        font-weight: bold;
        font-size: .9em;
    }

    .toggle_gender {
        transition: all .2s;
        color: #FFFFFF;
        background-color: #353C64;
        border-radius: 21px;
        padding: 5px 10px;
        font-weight: bold;
        &:disabled {
            background-color: grey;
        }
    }

    @media screen and (max-width: 570px) {

        flex-wrap: wrap;
        label {
            flex: 100% 1 0;
            padding-bottom: 3px;

        }
    }
`

export const Button = styled.button`

    background-color: ${props => props.color};
    color: white;
    font-weight: bold;
    padding: 3px 7px;
    border-radius: 10px;
    font-size: .85em;
    margin-left: 10px;
    width: auto;

    &:first-of-type {
        margin-left: 0;
    }

    &[disabled] {
        cursor: not-allowed;
        background-color: grey !important;
    }

`