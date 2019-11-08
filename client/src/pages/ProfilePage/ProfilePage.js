import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactMinimalPieChart from 'react-minimal-pie-chart'
import { connect } from 'react-redux'
import { changePage } from '../../reducers/currentPage'

import profileImg from '../../assets/imgs/demo-profile-img.jpg'

import MainContainer from '../../elements/MainContainer'

import PasswordInput from '../../elements/PasswordInput/PasswordInput'
import scorePassword from '../../utils/scorePassword'

const MainContainerStyled = styled(MainContainer)`
    display: flex;
    @media screen and (max-width: 1160px) {
        flex-direction: column;
    }
`

const FirstCol = styled.div`
    flex: calc(50% - 26px) 0 0;
    margin-right: 25px;
    @media screen and (max-width: 1160px) {
        margin-right: 0;
        flex: 100%;

    }
`

const SecondCol = styled.div`
    flex: 50% 0 0;
    @media screen and (max-width: 1160px) {
        flex: 100%;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
    }
`

const ProfileBaseInfo = styled.div`
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

const Statistics = styled.div`
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

        p {
            font-weight: bold;
            font-size: .85em;
            display: flex;

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
            margin-right: auto;
            min-width: 100px;
        }
        

        
    }

`

const ProfilePersonalData = styled.div`

    background-color: #EDEDED;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    
    h3 {
        text-align: center;
        margin-bottom: 20px;
    }
`

const InputGroup = styled.div`

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
    }

    @media screen and (max-width: 570px) {

        flex-wrap: wrap;
        label {
            flex: 100% 1 0;
            padding-bottom: 3px;

        }
    }


`

const Button = styled.button`

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

        }
    }
` 

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


const MyPollsPage = (props) => {

    useEffect(() => {
        props.changePage('Профиль')
        return () => {
            props.changePage('')
        }
    }, [])

    const fromServer = {
        username: 'neobisov',
        name: 'Нео',
        surname: 'Бисов',
        myPolls: 1,
        passedPolls: 3,
        birthDate: '11 мая 1988 года',
        email: 'neobisov@neo.bis',
        phone: '+8-800 5553535',
        country: 'Кыргызстан',
        city: 'Бишкек',
        gender: 'Мужской'
    }

    const [ editMode, setEditMode ] = useState(false)
    const [ userData, setUserData ] = useState(fromServer)
    const [ passwordChangeMode, setPasswordChangeMode] = useState(false)

    const saveProfileData = () => {
        setEditMode(false)
    }

    const toggleGender = (e) => {
        e.preventDefault()
        let male = userData.gender === 'Мужской' ? true : false
        setUserData({...userData, gender: male ? 'Женский' : 'Мужской' })
    }

    return (
        <MainContainerStyled>

            <FirstCol>
                <ProfileBaseInfo>
                    <h2>{userData.name} {userData.surname}</h2>
                    <div className="avatar">
                        <img src={profileImg}/> 
                    </div>

                    <h3>Никнэйм</h3>

                    <div className="username">
                        <div>
                            {userData.username}
                        </div>
                    </div>
                    <p>Скопируйте имя пользователя</p>


                </ProfileBaseInfo>


                <Statistics>
                    <div className="diagram">
                        <ReactMinimalPieChart
                            animate={true}
                            animationDuration={500}
                            animationEasing="ease-out"
                            cx={50}
                            cy={50}
                            data={[
                                {
                                    color: '#1488C8',
                                    title: 'Пройденые опросы',
                                    value: userData.passedPolls
                                },
                                {
                                color: '#00AC65',
                                title: 'Мои опросы',
                                value: userData.myPolls
                                },

                            ]}
                            label={true}
                            labelPosition={50}
                            lengthAngle={360}
                            labelStyle={{
                                fill: '#EDEDED',
                                fontFamily: 'sans-serif',
                                fontSize: '13px'
                            }}
                            lineWidth={100}
                            onClick={undefined}
                            onMouseOut={undefined}
                            onMouseOver={undefined}
                            paddingAngle={0}
                            radius={50}
                            ratio={1}
                            rounded={false}
                            startAngle={0}
                            style={{
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </div>

                    <div className="text_data">
                        <h3>Статистика</h3>

                        <p className="all_polls">Все опросы: <span>{userData.myPolls + userData.passedPolls}</span></p>
                        <p className="my_polls">Мои опросы: <span>{userData.myPolls}</span></p>
                        <p className="passed_polls">Пройденые опросы: <span>{userData.passedPolls}</span></p>

                    </div>
                </Statistics>

            </FirstCol>


            <SecondCol>
                <ProfilePersonalData>
                    <h3>Личная информация</h3>
                    <form>  
                        <InputGroup>
                                <label>Имя</label>
                                <input disabled={!editMode} type="text" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})}/>
                            </InputGroup>

                            <InputGroup>
                                <label>Фамилия</label>
                                <input disabled={!editMode} type="text" value={userData.surname} onChange={(e) => setUserData({...userData, surname: e.target.value})}/>
                            </InputGroup>

                            <InputGroup>
                                <label>Дата рождения</label>
                                <input disabled={!editMode} type="text" value={userData.birthDate} onChange={(e) => setUserData({...userData, birthDate: e.target.value})}/>
                            </InputGroup>

                            <InputGroup>
                                <label>Email</label>
                                <input disabled={!editMode} type="text" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                            </InputGroup>

                            <InputGroup>
                                <label>Телефон</label>
                                <input disabled={!editMode} type="text" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})}/>
                            </InputGroup>

                            <InputGroup>
                                <label>Страна</label>
                                <input disabled={!editMode} type="text" value={userData.country} onChange={(e) => setUserData({...userData, country: e.target.value})}/>
                            </InputGroup>

                            <InputGroup>
                                <label>Город</label>
                                <input disabled={!editMode} type="text" value={userData.city} onChange={(e) => setUserData({...userData, city: e.target.value})}/>
                            </InputGroup>

                            <InputGroup>
                                <label>Пол: {userData.gender}</label>
                                <button onClick={toggleGender} className="toggle_gender" disabled={!editMode}>Изменить</button>
                            </InputGroup>
                        </form>
                        
                        {passwordChangeMode && editMode ? null : <Button onClick={() => setPasswordChangeMode(true)} disabled={!editMode} color="#3A71FF">Сменить пароль</Button>}

                        {passwordChangeMode && editMode ? 
                            <ChangePasswordSection>
                                <h4>Сменить пароль</h4>

                                <div className="content">

                                  <PasswordStrengthMeter>
                                        <PasswordInput height="30px" bgColor="#FFFFFF" placeholderColor="#6A6A6A">
                                            <input className="change_pass" placeholder="Текущий пароль"/>
                                        </PasswordInput>
                                    </PasswordStrengthMeter>

                                    <PasswordStrengthMeter>
                                        <PasswordInput height="30px" bgColor="#FFFFFF" placeholderColor="#6A6A6A">
                                            <input className="change_pass" placeholder="Новый пароль"/>
                                        </PasswordInput>
                                    </PasswordStrengthMeter>

                                    <PasswordStrengthMeter>
                                        <PasswordInput height="30px" bgColor="#FFFFFF" placeholderColor="#6A6A6A">
                                            <input className="change_pass" placeholder="Подтвердите новый пароль"/>
                                        </PasswordInput>
                                    </PasswordStrengthMeter>

                                <button disabled={!editMode} className="cancel" onClick={() => setPasswordChangeMode(false)}>Отмена</button>
                                
                                </div>

                            </ChangePasswordSection> 
                        : null}


                </ProfilePersonalData>
                
                <div className="buttons">

                    {editMode ? null : <Button onClick={() => setEditMode(true)} color="#29CC97">Редактировать</Button>} 
                    {editMode ? <Button onClick={() => {setEditMode(false); setUserData(fromServer)}} color="#6D6D6D">Отменить</Button> : null} 
                    {editMode ?  <Button onClick={saveProfileData} color="#3A71FF">Сохранить</Button> : null} 
                    
                </div>


            </SecondCol>

        </MainContainerStyled>
    )
}

export default connect(null, {changePage})(MyPollsPage)