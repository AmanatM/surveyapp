import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import facebookLogo from '../../assets/imgs/facebook-icon.svg'
import googleLogo from '../../assets/imgs/google-icon.svg'
import PassWordInput from '../../elements/PasswordInput/PasswordInput'

import Loader from 'react-loader-spinner'
import { notify } from '../../reducers/popUp'
import { loginUser } from '../../reducers/user'


import { Form, FormTitle, SubmitButton, AuthSocial, Input, Divider, Agreement, TwoInOneLine} from './RegistrationFormStyled'
import { useInputChange } from '../../utils/useInputChange'

import countryList from './CountryList'
import phoneList from './phoneList'

import { register } from '../../services/user'
import globeIcon from './globe.png'




const RegistrationForm = (props) => {

    useEffect(() => {
        return () => {
            props.notify('')
        }
    }, [])

    const [ loading, setLoading ] = useState(false)
    const [ flag, setFlag ] = useState(globeIcon)

    const [ inputData, handleInputChange ] = useInputChange()
    const [ country, setCountry ] = useState('AF')
    const [ dialCode, setDialCode] = useState('')
    const [ phone, setPhone] = useState('')
    const [ city, setCity ] = useState('')

    useEffect(() => {
        axios.get(`https://api.ipdata.co?api-key=94ad779a265d3957a6af4449f3dcbf1543de2dc55843fb41f249b359`)
        .then((res) => {
            setCountry(res.data.country_code)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {

        setFlag(globeIcon)

        let finded = phoneList.find(item => item.dial_code === dialCode)
        console.log(finded)

        axios.get(`https://restcountries.eu/rest/v2/alpha/${finded.code}`)
        .then((res) => {
            setFlag(res.data.flag)

        })
        .catch((err) => {
            console.log(err)
        })
    }, [dialCode])

    useEffect(() => {
        if(country) {
            let finded = phoneList.find(item => item.code === country)
            setDialCode(finded.dial_code)
        }

    }, [country])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        let dataToSend = {}

        if(city) {
             dataToSend = {
                ...inputData,
                phone: dialCode + phone,
                city: city
            }
        } else {
            dataToSend = {
                ...inputData,
                phone: dialCode + phone,
            }
        }

        props.notify('')

        register(dataToSend)
        .then((res) => {
            setLoading(false)
            console.log(res)
            props.notify({
                heading: 'Пользователь создан',
                type: 'success',
                text: 'Пользователь упешно создван!'
            })
            props.loginUser(res.token)
            props.history.push('/main/profile')

        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
            props.notify({
                heading: 'Ошибка',
                type: 'error',
                text: 'Повторите попытку'
            })
        })
        console.log(dataToSend)
    }

    const handleDialCode = (e) => {
        setDialCode(e.target.value)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormTitle>
                <h2>Новый пользователь</h2>
                <p><small>Справшиватйе и отвечайте</small></p>
            </FormTitle>

            <Input id="username" onChange={handleInputChange} aria-label="Никнэйм" required type="text" autoComplete="false" placeholder="Никнэйм"/>
            <Input id="email" onChange={handleInputChange} aria-label="Электронная почта" required type="email" autoComplete="false" placeholder="Email почта"/>
            <Input id="first_name" onChange={handleInputChange} aria-label="Имя" type="text" required autoComplete="false" placeholder="Имя"/>
            <Input id="last_name" onChange={handleInputChange} aria-label="Фамилия" type="text" required autoComplete="false" placeholder="Фамилия"/>

            <TwoInOneLine colWidth="50">
                <div>
                <Input id="date" onChange={handleInputChange} required aria-label="Дата" type="date" placeholder="Дата рождения"/>
                <select id="gender" onChange={handleInputChange} aria-label="Пол">
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
                </div>

            </TwoInOneLine>

            <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Страна" required type="text" placeholder="Страна">
                {countryList.map((item) => (
                    <option key={item.code} value={item.code}>{item.name}</option>
                ))}
            </select>

            <Input aria-label="Город" value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Город"/>
            
  
            <TwoInOneLine className="country" colWidth="30">
                <img className="flag" src={flag}/>
                <div>
                    <select required value={dialCode} onChange={handleDialCode} aria-label="Код телефона" type="tel" placeholder="+996">
                        {phoneList.map((item) => (
                            <option key={item.code} value={item.dial_code}>{item.code}: {item.dial_code}</option>
                        ))}
                    </select>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} required aria-label="Телефон без кода страны" type="tel" placeholder="Номер телефона"/>

                </div>
 
            </TwoInOneLine>

            <PassWordInput bgColor="#E9E9E9">
                <Input required id="password" onChange={handleInputChange} aria-label="Парль" autoComplete="new-password" placeholder="Пароль"/>
            </PassWordInput>

            <PassWordInput bgColor="#E9E9E9">
                <Input required id="confirm_password" onChange={handleInputChange} aria-label="Повторите паоль" autoComplete="new-password" placeholder="Повторите пароль"/>
            </PassWordInput>


            <SubmitButton disabled={loading ? true : false} red type="submit">{!loading ? 'Продолжить' : <Loader
                        type="TailSpin" color="#ffffff" height={15} width={15}
                    />}</SubmitButton>
            <Divider><div>Уже есть аккунт? <b><Link to="/login">Войти</Link></b></div></Divider>

            {/* <AuthSocial blue><img src={facebookLogo} alt="facebook logo"/><div>Зарегестрироваться с помощью Facebook</div></AuthSocial>
            <AuthSocial red><img src={googleLogo} alt="google logo"/><div>Зарегестрироваться с помощью Google</div></AuthSocial> */}
            
          
            <Agreement>Продолжая, вы соглашаетесь с <b>Условиями<br/> использования</b> и Политикой <br/> конфиденциальности Survey App</Agreement>
        </Form>
    )
}

export default withRouter(connect(null, { notify, loginUser })(RegistrationForm))