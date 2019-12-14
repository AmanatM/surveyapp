import styled from 'styled-components'

import AuthButton from '../../elements/AuthButton'

export const Form = styled.form`
    max-width: 100%;
    width: 400px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 30px;

    .login_btn {
        margin-top: 30px;
    }

    .extra_functions {
        display: flex;
        align-content: center;
        padding: 0 25px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .forgotPass {
        font-size: .8em;
        display: flex;
        justify-content: flex-end;
        align-content: center;

        cursor: pointer;
    

        img {
            width: 12px;
            margin-left: 4px;
            transition: all .2s;
        }

        &:hover {
            img {
                transform: rotate(90deg);
            }
        }
    }

    div.createAcc {
        font-size: .8em;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-right: auto;
    }
`

export const Input = styled.input`
    font-size: inherit;
    border: none;
    padding: 10px 20px;
    margin: 5px 0;
    border-radius: 8px;
    font-family: inherit;
`

export const AuthSocial = styled(AuthButton)`
    padding: 3px 5px;
    border-radius: 8px;

    img {
        width: 30px;
    }

    div {
        margin: auto;
        position: relative;
        left: -13.5px;
    }

`

export const Agreement = styled.p`
    font-family: 'Arial', sans-serif;
    font-size: .8em;
    text-align: center;
    margin-top: 20px;
`

export const Divider = styled.div`
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;

    div {
        margin: 0 20px;
    }

    &::before, &::after {
        
        width: 100%;
        content: '';
        font-weight: normal;
        display: flex;
        height: 1px;
        background-color: white;
    }
`