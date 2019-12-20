import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { changePage } from '../../reducers/currentPage'
import { notify } from '../../reducers/popUp'
import PasswordChange from './PasswordChange'
import noAvatarImg from '../../assets/imgs/no-avatar.png'
import { MainContainerStyled, Button, FirstCol, SecondCol, ProfileBaseInfo, Statistics, ProfilePersonalData, InputGroup } from './ProfilePageStyled'



const MyPollsPage = (props) => {

    useEffect(() => {
        props.changePage('Профиль')
        return () => {
            props.changePage('')
        }
    }, [])

    const [ editMode, setEditMode ] = useState(false)
    const [ userData, setUserData ] = useState({})
    const [ passwordChangeMode, setPasswordChangeMode] = useState(false)
    const [ userDataUpdated, setUserDataUpdated ] = useState({})


    useEffect(() => {
        if(editMode) {
            setUserDataUpdated(userData)
        } else {
            setUserDataUpdated({})
        }
    }, [editMode])

    useEffect(() => {
        let userFromStorage = window.sessionStorage.getItem('user')
        if(userFromStorage) {
            setUserData(JSON.parse(userFromStorage))
        }
    }, [])

    const saveProfileData = () => {
        setEditMode(false)
        console.log(userData)
    }

    const toggleGender = (e) => {
        e.preventDefault()
        
        if(userData.gender) {
            setUserData({...userData, gender: userData.gender === 'male' ? 'female' : 'male'})
            console.log(userData.gender)
        }

    }

    return (
        <MainContainerStyled>

            <FirstCol>
                <ProfileBaseInfo>
                    <h2>{userData.name} {userData.surname}</h2>
                    <div className="avatar">
                        <img src={noAvatarImg}/> 
                    </div>

                    <h3>Никнэйм</h3>

                    <div className="username">
                        <div>
                            {userData.username}
                        </div>
                    </div>
                    <p>Скопируйте имя пользователя</p>


                </ProfileBaseInfo>

            </FirstCol>


            <SecondCol>
                <ProfilePersonalData>
                    <h3>Личная информация</h3>
                    <form>  
                        <InputGroup>
                                <label>Имя</label>
                                <input disabled={!editMode} type="text" value={userData.first_name} onChange={(e) => setUserData({...userData, first_name: e.target.value})}/>
                            </InputGroup>

                            <InputGroup>
                                <label>Фамилия</label>
                                <input disabled={!editMode} type="text" value={userData.last_name} onChange={(e) => setUserData({...userData, last_name: e.target.value})}/>
                            </InputGroup>

                            <InputGroup>
                                <label>Дата рождения</label>
                                <input disabled={!editMode} type="text" value={userData.birth_date} onChange={(e) => setUserData({...userData, birth_date: e.target.value})}/>
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
                                <input disabled={!editMode} type="text" value={userData.city ? userData.city : ''} onChange={(e) => setUserData({...userData, city: e.target.value})}/>
                            </InputGroup>

                            <InputGroup>
                                <label>Пол: </label>
                                <button onClick={toggleGender} className="toggle_gender" disabled={!editMode}>{userData.gender === 'male' ? 'Мужской' : 'Женкский'}</button>
                            </InputGroup>
                        </form>
                        
                        {passwordChangeMode && editMode ? null : <Button onClick={() => setPasswordChangeMode(true)} disabled={!editMode} color="#3A71FF">Сменить пароль</Button>}

                        {passwordChangeMode && editMode ? 
                            <PasswordChange notify={notify} setPasswordChangeMode={setPasswordChangeMode} editMode={editMode}/>
                        : null}


                </ProfilePersonalData>
                
                <div className="buttons"> 

                    {editMode ? null : <Button onClick={() => setEditMode(true)} color="#29CC97">Редактировать</Button>} 
                    {editMode ? <Button onClick={() => {setEditMode(false)}} color="#6D6D6D">Отменить</Button> : null} 
                    {editMode ?  <Button onClick={saveProfileData} color="#3A71FF">Сохранить</Button> : null} 
                    
                </div>


            </SecondCol>

        </MainContainerStyled>
    )
}

const mapStateToProps = (state) => {

    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {changePage, notify})(MyPollsPage)