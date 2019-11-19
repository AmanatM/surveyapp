import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import AuthButton from '../../elements/AuthButton'
import bgImg from '../../assets/imgs/survapp-bg-blured.jpg'
import logo  from '../../assets/imgs/logo.svg'
import Container from '../../elements/Container'

import setMetaTheme from '../../utils/setThemeColor'
import SuccessAnimationElement from './SuccessAnimationElement'

import PageFooter from '../../components/Footer'



const SectionStyled = styled.section`
    background: url(${bgImg}) #1d2f33;
    background-position: center;
    background-size: cover;
    min-height: 100vh;
    padding-top: 40px;
    padding-bottom: 10px;

    img {
        width: 370px;
        display: block;
        margin: 0 auto;
    }

`


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
    margin-top: 30px;

    h3 {
        text-align: center;
        font-weight: normal;
        border-bottom: 1px solid #E9E9E9;
        padding-bottom: 20px;
    }

    .info {
        font-weight: bold;
        text-align: center;
        margin: 20px auto;
        font-size: .9em;
        width: 300px;
        max-width: 100%;
    }
`

const Button = styled(AuthButton)`
    border-radius: 10px;
    margin-bottom: 20px;

    &[disabled] {
        background-color: grey;
        cursor: not-allowed;
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
    margin-bottom: 20px;
`
const LoginButton = styled.button`
    position: absolute;
    font-weight: bold;
    font-size: .9em;
    top: 40px;
    left: 30px;
    color: #373737;
    background-color: white;
    border-radius: 10px;
    padding: 5px;

        
    @media screen and (max-width: 700px) {
        display: none;
    }
`



const RecoverPassword = (props) => {

    setMetaTheme('#ffffff')


    const [ email, setEmail ] = useState('')
    const [ sent, setSent ] = useState(false)
    const [ disabled, setDisabled ] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()

        if(email) {
            setDisabled(true)

            setTimeout(() => {
                setDisabled(false)
                setSent(true)
            }, 1000)
        }

    }

    return (
        <SectionStyled>
            <Container>
                <LoginButton as={Link} to="/login">Войти</LoginButton>
                <Link to="/"><img alt="surveyapp logo" src={logo}/></Link>

                               
                <Form onSubmit={handleSubmit}>
                        <h3>Запросить  смену пароля</h3>

                {!sent ? (
                    <>
                        <p className="info">Введите свой адресс почты и мы вышлем  Вам запрос на смену пароля</p>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Введите свой email адресс"/>
                        <Button disabled={disabled} red>Отправить запрос</Button>
                    </>

                ) : (
                    <>
                        <p className="info">Мы отправили Вам письмо для смены пароля.  Пожалуйста проверьте почту</p>
                        <SuccessAnimationElement/>
                    </>
                )}

                <Link to="/login">Вернуться на страницу логина</Link>
                </Form>



            </Container>
            <PageFooter/>
        </SectionStyled>

    )
}


export default RecoverPassword