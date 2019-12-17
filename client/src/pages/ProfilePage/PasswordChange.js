import React, { useState } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import PasswordInput from '../../elements/PasswordInput/PasswordInput'
import scorePassword from '../../utils/scorePassword'

import { changePassword } from '../../services/user'

import { notify } from '../../reducers/popUp'


const PasswordStrengthMeterStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;

    .change_pass {
        padding: 10px 20px;
        padding-right: 0;
    }

    
    .label {
        text-align: center;
        font-size: .8em;
        margin: 0 15px;
        padding: 0 5px;
    }

    .indicators {

        display: flex;
        margin: 0 5px;

        div {
            width: 23px;
            height: 8px;
            background-color: #fff;
            border-radius: 20px;
            margin: 0 2px;
            transition: all .2s;

            &.weak {
                &.active {
                    background-color: #FF1F00;
                }
            }

            &.medium {

                &.active {
                    background-color: #FFB800;
                }
            }

            &.strong {
                &.active {
                    background-color: #29CC97;
                }
            }
        }
    }

    @media screen and (max-width: 1300px) {

        .label {
            display: none;
        }

        @media screen and (max-width: 1160px) {

            .label {
                display: block
            }
        }


        @media screen and (max-width: 570px) {

            flex-wrap: wrap;

            .label {
                display: none;
            }

            .indicators {
                order: -1;
                margin-bottom: 5px;
                margin-top: 10px;
            }
        }

        

        
    }

`

const ChangePasswordSection = styled.div`
    position: relative;
    margin-top: 30px;

    h4 {
        text-decoration: underline;
        text-align: center;
        background-color: #5F76FF;
        color: white;
        border-radius: 7px;
        padding: 2px 0;
        margin: 0;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }


    div.content {
        background-color: #3F414A;
        border-radius: 10px;
        padding: 20px;
        padding-top: 40px;
        color: white;

        button.cancel {
            padding: 5px 10px;
            border-radius: 10px;
            background-color: #3A71FF;
            font-weight: bold;
            color: white;
            margin-right: 10px;
        }

        button.submit {
            padding: 5px 10px;
            border-radius: 10px;
            background-color: #29CC97;
            font-weight: bold;
            color: white;   

            &:disabled {
                background-color: grey;
                cursor: pointer;
            }
        }
    }
` 

const PasswordStrengthMeter = ({children}) => {

    
    const [ score, setScore ] = useState(0)


    let weak, medium, strong

    if(score > 80) {
        strong = 'active'
        medium = 'active'
        weak = 'active'
    } else if (score > 40) {
        medium = 'active'
        weak = 'active'
    } else {
        weak = 'active'
    }
    

    const handleChange = (e) => {
        setScore(scorePassword(e.target.value))
    }

    return (
        <PasswordStrengthMeterStyled>

            {React.cloneElement(children, {handleInput: handleChange})}

            <p className="label">Уровень сложности</p>
            <div className="indicators">
                <div className={`weak ${weak}`}></div>
                <div className={`medium ${medium}`}></div>
                <div className={`strong ${strong}`}></div>
            </div>

        </PasswordStrengthMeterStyled>
    )
}


const PasswordChange = (props) => {

    const [ current, setCurrent ] = useState('')
    const [ newPass, setNewPass ] = useState('')
    const [ repeat, setRepeat ] = useState('')
    
    const [ loading, setLoading ] = useState(false)
    
    const handlePasswordChange = (e) => {
        e.preventDefault()
        setLoading(true)

        if(current && newPass && repeat) {
            if(newPass === repeat) {
                let data = {
                    old_password: current,
                    new_password: newPass,
                    new_password_confirm: repeat
                }
                changePassword(data)
                .then((res) => {
                    setLoading(false)
                    props.notify({
                        heading: 'Пароль успешно сменен!',
                        type: 'success',
                    })
                    props.setPasswordChangeMode(false)
                })
                .catch((err) => {
                    setLoading(false)
                    props.notify({
                        heading: 'Ошибка',
                        type: 'error',
                    })
                })
            } else {
                props.notify({
                    heading: 'Новый пароль не совпадает',
                    type: 'error'
                })
            }
        } else {

            props.notify({
                heading: 'Не оставляйте пустыми',
                type: 'error'
            })
        }

    }

    return (
        <ChangePasswordSection>
            <h4>Сменить пароль</h4>

            <div className="content">

            <PasswordStrengthMeter>
                    <PasswordInput height="30px" bgColor="#FFFFFF" placeholderColor="#6A6A6A">
                        <input value={current} onChange={(e) => {props.notify(''); setCurrent(e.target.value)}} className="change_pass" placeholder="Текущий пароль"/>
                    </PasswordInput>
                </PasswordStrengthMeter>

                <PasswordStrengthMeter>
                    <PasswordInput height="30px" bgColor="#FFFFFF" placeholderColor="#6A6A6A">
                        <input value={newPass} onChange={(e) => {props.notify(''); setNewPass(e.target.value)}} className="change_pass" placeholder="Новый пароль"/>
                    </PasswordInput>
                </PasswordStrengthMeter>

                <PasswordStrengthMeter>
                    <PasswordInput height="30px" bgColor="#FFFFFF" placeholderColor="#6A6A6A">
                        <input value={repeat} onChange={(e) => {props.notify(''); setRepeat(e.target.value)}} className="change_pass" placeholder="Подтвердите новый пароль"/>
                    </PasswordInput>
                </PasswordStrengthMeter>

            <button disabled={!props.editMode} className="cancel" onClick={() => props.setPasswordChangeMode(false)}>Отмена</button>
            <button disabled={loading} className="submit" onClick={handlePasswordChange}>Сменить</button>
            
            </div>

        </ChangePasswordSection> 
    )
}

export default connect(null, {notify})(PasswordChange)