import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'


import { notify } from '../../reducers/popUp'

import AuthButton from '../../elements/AuthButton'
import facebookLogo from '../../assets/imgs/facebook-icon.svg'
import googleLogo from '../../assets/imgs/google-icon.svg'
import refreshIcon from '../../assets/imgs/refresh-icon.svg'

import { login } from '../../services/user'

import { loginUser } from '../../reducers/user'

import { Form, Input, AuthSocial, Agreement, Divider} from './LoginFormStyled'


const LoginForm = (props) => {

    useEffect(() => {

        return () => {
            props.notify('')
        }

    }, [])

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ loading, setLoading ] = useState(false)


    const handleLogin = (e) => {
        e.preventDefault()

        if(username !== '' && password !== '') {

            let data = {
                username,
                password
            }
            setLoading(true)

            props.notify('')
            
            login(data)
            .then((res)=> {
                setLoading(false)
                props.loginUser(res.token)
                props.history.push('/main/my-polls')
            })
            .catch((err) => {

                setLoading(false)

                props.notify({
                    heading: 'Ошибка',
                    type: 'error',
                    text: `${err.response.status === 401 ? 'Ошибка авторизации' : 'Что-то пошло не так'}` 
                })
            })




        } else {
          props.notify({
              heading: 'Не оставляйте поля пустыми!!',
              type: 'error',
              text: 'Повторите попытку'
          })
        }
    }


    return (
        <main>
            <Form onSubmit={handleLogin}>
                
                {props.user ? <Redirect to="/main/my-polls"/> : null}

                <Input value={username} onChange={(e) => setUsername(e.target.value)} aria-label="Никнэйм" type="text" autoComplete="username" placeholder="Никнэйм"/>
                <Input value={password}  onChange={(e) => setPassword(e.target.value)} aria-label="Пароль" type="password" autoComplete="current-password" placeholder="Пароль"/>
                <AuthButton disabled={loading ? true : false} className="login_btn" red type="submit">
                    {!loading ? 'Войти' : <Loader
                        type="TailSpin" color="#ffffff" height={15} width={15}
                    />}
                </AuthButton>

                <div className="extra_functions">
                    <div className="createAcc"><Link to="/registration">Создать аккаунт</Link></div>
                    <Link to="/recover-password" className="forgotPass">Забыли пароль? <img src={refreshIcon} alt=""/></Link>
                </div>

                {/* <Divider><div>OR</div></Divider> */}
            

                
                {/* <AuthSocial blue><img src={facebookLogo} alt="facebook logo"/><div>Войти через Facebook</div></AuthSocial>
                <AuthSocial red><img src={googleLogo} alt="google logo"/><div>Войти через Google</div></AuthSocial> */}

                <Agreement>Продолжая, вы соглашаетесь с <b>Условиями<br/> использования</b> и Политикой <br/> конфиденциальности Survey App</Agreement>

            </Form>
        </main>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, {loginUser, notify})(LoginForm))