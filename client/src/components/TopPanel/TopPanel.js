import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../reducers/user'
import noAvatarImg from '../../assets/imgs/no-avatar.png'
import { searchPolls } from '../../services/polls'
import Loader from 'react-loader-spinner'


import { TopPanelSection, SearchBox, Profile } from './TopPanelStyled'



const TopPanel = (props) => {

    const [ profileActive, setProfileActive] = useState(false)
    const [ keyword, setKeyWord ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ pollList, setPollList ] = useState([])
    const [ resultsActive, setResultsActive ] = useState(false)

    let profileClassName = profileActive ? 'active' : ''


    const profileMouseLeave = () => setProfileActive(false)

    const logout = () => {
        props.logoutUser()
        props.history.push('/login')
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setLoading(true)
        setResultsActive(false)

        searchPolls(keyword)
        .then((res) => {
            console.log(res)
            setLoading(false)
            setPollList(res.results)
            setResultsActive(true)

        })
        .catch((err) => {
            console.log(err)
            setLoading(false)

        })
    }

    const handleGoTo = (id) => {
        props.history.push(`/main/all-polls/${id}`)
        setResultsActive(false)
    }

    const closeSearchResults = () => {
        setResultsActive(false)
        setPollList([])
        setKeyWord('')
    }

    return (
        <TopPanelSection>
            <h3>{props.currentPage}</h3>

            <SearchBox>
                <form onSubmit={handleSearch}>
                    <input onChange={(e) =>  setKeyWord(e.target.value)} value={keyword} aria-label="Поиск" type="text" placeholder="Поиск"/>
                    <button disabled={loading}>{loading ? (<Loader className='loader' width={50} height={50} type="Rings" color="#fff"/>) : 'Поиск'}</button>
                </form>
                <ul className={`results ${resultsActive ? 'active': ''}`}>
                <button onClick={closeSearchResults} className="close_btn">
                    <div></div>
                    <div></div>
                </button>

                    {pollList.map((poll) => (
                        <li onClick={() => handleGoTo(poll.id)}>{poll.title}</li>
                    ))}
                    {pollList.length === 0 ? (
                        <p>Опрос не найден</p>
                    ): null}
                </ul>
            </SearchBox>

            <Profile className={profileClassName} onMouseLeave={profileMouseLeave} onClick={() => setProfileActive(!profileActive)}>
                <p>{props.user ? props.user.first_name + ' ' + props.user.last_name : ''}</p>
                <img alt="Фото профиля" src={noAvatarImg}/>

                <div className="submenu">
                    <ul>
                        <li><Link to="/main/profile">Профиль</Link></li>
                        <li><a href="mailto: mailingneobis@gmail.com" style={{whiteSpace: 'nowrap'}}>Тех. Поддержка</a></li>
                        <li onClick={logout}>Выйти</li>
                    </ul>
                </div>
            </Profile>

        </TopPanelSection>
    )
}


const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage,
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps , {logoutUser})(TopPanel))