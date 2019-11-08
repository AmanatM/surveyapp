import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import AuthButton from '../../elements/AuthButton'
import facebookLogo from '../../assets/imgs/facebook-icon.svg'
import googleLogo from '../../assets/imgs/google-icon.svg'

import PassWordInput from '../../elements/PasswordInput/PasswordInput'


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

            <PassWordInput bgColor="#E9E9E9">
                <Input aria-label="Парль" autoComplete="new-password" placeholder="Пароль"/>
            </PassWordInput>

            <PassWordInput bgColor="#E9E9E9">
                <Input aria-label="Повторите паоль" autoComplete="new-password" placeholder="Повторите пароль"/>
            </PassWordInput>


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