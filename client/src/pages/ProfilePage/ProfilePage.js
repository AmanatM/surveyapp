import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { changePage } from '../../reducers/currentPage'
import { notify } from '../../reducers/popUp'
import PasswordChange from './PasswordChange'
import noAvatarImg from '../../assets/imgs/no-avatar.png'
import { MainContainerStyled, Button, FirstCol, SecondCol, ProfileBaseInfo, Statistics, ProfilePersonalData, InputGroup } from './ProfilePageStyled'
import countryList from '../RegistrationPage/CountryList'
import { editProfile, getUserData } from '../../services/user'
import Loader from 'react-loader-spinner'
import { updateUser } from '../../reducers/user'


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
    const [ newUsername, setNewUsername ] = useState('')
    const [ loading, setLoading ] = useState(false)
    console.log(userData)

    useEffect(() => {
        let userFromLocal = window.sessionStorage.getItem('user')
        if(userFromLocal) {
            setLoading(true)
            let user = JSON.parse(userFromLocal)
            
            getUserData(user.user_id)
            .then((res) => {
                console.log(res)
                setUserData(res)
                setNewUsername(res.username)
                setLoading(false)

                let data = {
                    ...res,
                    user_id: user.user_id,
                    token: user.token,
                }
                
                props.updateUser(data)

            })
            .catch((err) => {
                setLoading(false)
                props.notify({
                    heading: 'Ошибка',
                    type: 'error',
                    text: 'Что-то пошло нет так'
                })
            })

        }

    }, [])

    const saveProfileData = () => {

        setEditMode(false)
        let dataToSend = {
            ...userData,
            username: newUsername

        }

        delete dataToSend.token
        delete dataToSend.user_id

        if(newUsername !== '') {
            editProfile(dataToSend)
            .then((res) => {
                props.notify({
                    heading: 'Данные обновлены',
                    type: 'success',
                    text: 'Изменение данных повлияет на проейденные опросы.'
                })

                let data = {
                    ...dataToSend,
                    user_id: props.user.user_id,
                    token: props.user.token,
                }
                console.log(data)
                props.updateUser(data)
            })
            .catch((err) => {
                props.notify({
                    heading: 'Ошибка',
                    type: 'error',
                    text: 'Не удалось обновить данные пользователя. Попробуйте еще раз.'
                })
    
            
                if(props.user) {
                    setUserData(props.user)
                }
            })
        } else {
            props.notify({
                heading: 'Не остовляйте имя пользователя пустым',
                type: 'error',
                text: 'Попробуйте еще раз!'
            })
        }



    }

    const toggleGender = (e) => {
        e.preventDefault()
        
        if(userData.gender) {
            setUserData({...userData, gender: userData.gender === 'male' ? 'female' : 'male'})
        }

    }


    if(!loading) {
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
                                {!editMode ? newUsername : (
                                    <input className="username_input" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                                )}
                                
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
                                    <input disabled={!editMode} type="date" value={userData.birth_date} onChange={(e) => setUserData({...userData, birth_date: e.target.value})}/>
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
                                    <select disabled={!editMode} id="country" onChange={(e) => setUserData({...userData, country: e.target.value})} aria-label="Страна" required type="text" placeholder="Страна*">
                                        {countryList.map((item) => (
                                            <option selected={userData.country === item.code ? true : false} key={item.code} value={item.code}>{item.name}</option>
                                        ))}
                                    </select>
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
    } else {
        return (
            <MainContainerStyled className={loading ? 'loading' : ''}>
                <Loader className="loader" color="#5F76FF" width={100} height={100}/>
            </MainContainerStyled>
        )

    }
   
}

const mapStateToProps = (state) => {

    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {changePage, notify, updateUser})(MyPollsPage)