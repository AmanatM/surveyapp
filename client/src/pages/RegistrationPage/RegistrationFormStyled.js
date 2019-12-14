import styled from 'styled-components'
import AuthButton from '../../elements/AuthButton'


export const Form = styled.form`
    max-width: 100%;
    width: 440px;
    display: flex;
    padding: 20px;
    color: #373737;
    background-color: #fff;
    flex-direction: column;
    border-radius: 8px;
    margin: 0 auto;

    option {
        outline: none;
    }

    select {
        font-size: inherit;
        outline: none;
        border: none;
        margin: 5px 0;
        border-radius: 8px;
        font-family: inherit;
        background-color: #E9E9E9;
        height: 44px;
    }
`

export const FormTitle = styled.div`
    text-align: center;
    padding-bottom: 15px;
    margin-bottom: 10px;
    border-bottom: 1px solid #E9E9E9;

    h2 {
        font-weight: normal;
        }

`

export const SubmitButton = styled(AuthButton)`
    margin-top: 10px;
    @media screen and (max-width: 425px)  {
        padding: 15px;
    }
`

const AuthSocial = styled(AuthButton)`
    padding: 5px 5px;
    border-radius: 8px;
    margin-bottom: 10px;

    img {
        width: 30px;
    }

    div {
        margin: auto;
        position: relative;
        left: -13.5px;
        padding-left: 30px;
    }

    @media screen and (max-width: 425px)  {
        padding: 10px;
    }


`


export const Input = styled.input`
    font-size: inherit;
    border: none;
    padding: 10px 20px;
    margin: 5px 0;
    border-radius: 8px;
    font-family: inherit;
    background-color: #E9E9E9;
    outline: none;

    &[type="date"] {
        &:placeholder {

        }
    }
`

export const Divider = styled.div`
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    display: flex;
    color: black;
    align-items: center;
    margin-top: 20px;

    div {
        margin: 0 20px;
        font-size: .8em;
        font-family: 'Arial',sans-serif;
        font-weight: normal;
        white-space: nowrap;
    }

    &::before, &::after {
        width: 100%;
        content: '';
        font-weight: normal;
        display: flex;
        height: 1px;
        background-color: black;
    }
`

export const Agreement = styled.p`
    font-family: 'Arial', sans-serif;
    font-size: .8em;
    text-align: center;
    margin-top: 20px;
`

export const TwoInOneLine = styled.div`

    display: flex;
    align-content: center;    
    *{

        &:first-child {
            width: ${props => props.colWidth}%;
        }

        &:last-child {
            width: calc(${props => 100 - +(props.colWidth)}% - 10px);
            margin-left: 10px;
        }
    }

`