import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import facebookLogo from '../../assets/imgs/facebook-icon.svg'
import googleLogo from '../../assets/imgs/google-icon.svg'
import PassWordInput from '../../elements/PasswordInput/PasswordInput'

import Loader from 'react-loader-spinner'
import { notify } from '../../reducers/popUp'

import { Form, FormTitle, SubmitButton, AuthSocial, Input, Divider, Agreement, TwoInOneLine} from './RegistrationFormStyled'
import { useInputChange } from '../../utils/useInputChange'

import countryList from './CountryList'




const RegistrationForm = (props) => {

    useEffect(() => {
        return () => {
            props.notify('')
        }
    }, [])



    const [ inputData, handleInputChange ] = useInputChange()
    const [ country, setCountry ] = useState('')
    console.log(inputData)
    console.log(country)

    useEffect(() => {
        axios.get('http://ip-api.com/json')
        .then((res) => {
            setCountry(res.data.countryCode)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputData)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormTitle>
                <h2>Новый пользователь</h2>
                <p><small>Справшиватйе и отвечайте</small></p>
            </FormTitle>

            <Input id="username" onChange={handleInputChange} aria-label="Никнэйм" require type="text" autoComplete="false" placeholder="Никнэйм"/>
            <Input id="email" onChange={handleInputChange} aria-label="Электронная почта" require type="email" autoComplete="false" placeholder="Email почта"/>
            <Input id="first_name" onChange={handleInputChange} aria-label="Имя" type="text" autoComplete="false" placeholder="Имя"/>
            <Input id="last_name" onChange={handleInputChange} aria-label="Фамилия" type="text" autoComplete="false" placeholder="Фамилия"/>

            <TwoInOneLine colWidth="50">
                <Input id="date" onChange={handleInputChange} aria-label="Дата" type="date" placeholder="Дата рождения"/>
                <select id="gender" onChange={handleInputChange} aria-label="Пол">
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
            </TwoInOneLine>

            <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Страна" type="text" placeholder="Страна">
                {countryList.map((item) => (
                    <option key={item.code} value={item.code}>{item.name}</option>
                ))}
            </select>

            <Input aria-label="Город" type="text" placeholder="Город"/>
            
            <TwoInOneLine colWidth="30">
                <Input aria-label="Код телефона" type="tel" placeholder="+996"/>
                <Input aria-label="Телефон без кода страны" type="tel" placeholder="Номер телефона"/>
            </TwoInOneLine>

            <PassWordInput bgColor="#E9E9E9">
                <Input id="password" onChange={handleInputChange} aria-label="Парль" autoComplete="new-password" placeholder="Пароль"/>
            </PassWordInput>

            <PassWordInput bgColor="#E9E9E9">
                <Input id="confirm_password" onChange={handleInputChange} aria-label="Повторите паоль" autoComplete="new-password" placeholder="Повторите пароль"/>
            </PassWordInput>


            <SubmitButton red type="submit">Продолжить</SubmitButton>
            <Divider><div>Уже есть аккунт? <b><Link to="/login">Войти</Link></b></div></Divider>

            {/* <AuthSocial blue><img src={facebookLogo} alt="facebook logo"/><div>Зарегестрироваться с помощью Facebook</div></AuthSocial>
            <AuthSocial red><img src={googleLogo} alt="google logo"/><div>Зарегестрироваться с помощью Google</div></AuthSocial> */}
            
          
            <Agreement>Продолжая, вы соглашаетесь с <b>Условиями<br/> использования</b> и Политикой <br/> конфиденциальности Survey App</Agreement>
        </Form>
    )
}

export default connect(null, { notify })(RegistrationForm)