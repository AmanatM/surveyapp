import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import AuthButton from '../../elements/AuthButton'
import facebookLogo from '../../assets/imgs/facebook-icon.svg'
import googleLogo from '../../assets/imgs/google-icon.svg'


const Form = styled.form`
    max-width: 100%;
    width: 440px;
    display: flex;
    padding: 20px;
    color: #373737;
    background-color: #fff;
    flex-direction: column;
    border-radius: 8px;
    margin: 0 auto;

    select {
        font-size: inherit;
        border: none;
        margin: 5px 0;
        border-radius: 8px;
        font-family: inherit;
        background-color: #E9E9E9;
        height: 44px;
    }
`

const FormTitle = styled.div`
        text-align: center;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border-bottom: 1px solid #E9E9E9;

        h2 {
            font-weight: normal;
        }

`

const SubmitButton = styled(AuthButton)`
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


const Input = styled.input`
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

const Divider = styled.div`
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    display: flex;
    color: black;
    align-items: center;
    margin-top: 20px;

    div {
        margin: 0 20px;
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

const Agreement = styled.p`
    font-family: 'Arial', sans-serif;
    font-size: .8em;
    text-align: center;
    margin-top: 20px;
`

const TwoInOneLine = styled.div`

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

const Eye = styled.div`
    width: 20px;
    height: 20px;
    border: solid 2px #3E3E3E;
    border-radius:  75% 15%;
    position: relative;
    transform: rotate(45deg);
    pointer-events: none;
    transition: all .3s;

    &::before {
        content: '';
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border: solid 2px #3E3E3E;
        border-radius: 50%;
        left: 2px;
        top: 2px;
        opacity: 1;
        transition: all .3s;

    }

    &::after {
        content: '';
        display: block;
        position: absolute;
        width: 25px;
        height: 3px;
        transition: all .2s;
        background-color: #3E3E3E;
        right: -4px;
        top: 7px;
        transform: rotate(70deg);
        transition: all .2s;
        opacity: 0;
    }

    &.invisible {
        &:before {
            opacity: 0;
        }

        &:after {
            opacity: 1;
        }
    }
`
const PasswordVisibilityToggler = ({toggle, eyeClass}) => {

    return (
        <button onClick={toggle} aria-label="password visibiliy toggle">
            <Eye className={eyeClass}></Eye>
        </button>
    )
}


const PassWordInput = ({placeholder}) => {

    const [ visible, setVisible ] = useState(false)

    const toggle = (e) => {
        e.preventDefault()
        setVisible(!visible)
    }

    const eyeClass = visible ? '' : 'invisible'
    const inputType = visible ? 'text' : 'password'


    return (
        <PasswordContainer>
            <Input aria-label={placeholder} type={inputType} autoComplete="new-password" placeholder={placeholder}/><PasswordVisibilityToggler toggle={toggle} eyeClass={eyeClass}/>
        </PasswordContainer>
    )
}



const PasswordContainer = styled.div`

    display: flex;
    align-items: center;


    input {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        width: 80%;
        height: 40px;
    }
    
    button {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        outline: none;
        border-radius: 8px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        background-color: #e9e9e9;

        min-width: 50px;
        width: 20%;
        text-align: center;
        display: flex;
        justify-content: flex-end;
        padding-right: 15px;
        height: 40px;

    }
`




const RegistrationForm = () => {

    return (
        <Form >
            <FormTitle>
                <h2>Новый пользователь</h2>
                <p><small>Справшиватйе и отвечайте</small></p>
            </FormTitle>

            <Input aria-label="Электронная почта" require type="email" autoComplete="false" placeholder="Email почта"/>
            <Input aria-label="Имя" type="text" autoComplete="false" placeholder="Имя"/>
            <Input aria-label="Фамилия" type="text" autoComplete="false" placeholder="Фамилия"/>

            <TwoInOneLine colWidth="50">
                <Input aria-label="Дата" type="date" placeholder="Дата рождения"/>
                <select aria-label="Пол">
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
            </TwoInOneLine>
            <Input aria-label="Страна" type="text" placeholder="Страна"/>
            <Input aria-label="Город" type="text" placeholder="Город"/>
            <TwoInOneLine colWidth="30">
                <Input aria-label="Код телефона" type="tel" placeholder="+996"/>
                <Input aria-label="Телефон без кода страны" type="tel" placeholder="Номер телефона"/>
            </TwoInOneLine>

            <PassWordInput placeholder="Пароль"/>
            <PassWordInput placeholder="Подтвердите пароль"/>


            <SubmitButton red type="submit">Продолжить</SubmitButton>
            <Divider><div>ИЛИ</div></Divider>

            <AuthSocial blue><img src={facebookLogo} alt="facebook logo"/><div>Зарегестрироваться с помощью Facebook</div></AuthSocial>
            <AuthSocial red><img src={googleLogo} alt="google logo"/><div>Зарегестрироваться с помощью Google</div></AuthSocial>
            <Agreement>Уже есть аккунт? <b><Link to="/login">Войти</Link></b></Agreement>
            <Agreement>Продолжая, вы соглашаетесь с <b>Условиями<br/> использования</b> и Политикой <br/> конфиденциальности Survey App</Agreement>
        </Form>
    )
}

export default RegistrationForm