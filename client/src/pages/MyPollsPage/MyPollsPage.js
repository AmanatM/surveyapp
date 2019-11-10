import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import InnerTopBar from '../../components/InnerTopBar/InnerTopBar'
import MainContainer from '../../elements/MainContainer'
import profileImg from '../../assets/imgs/demo-profile-img.jpg'
import threedots from './threedots-icon.svg'

import { connect } from 'react-redux'
import { changePage } from '../../reducers/currentPage'

import PollsContainer from '../../elements/PollsContainer'
import PollTr from '../../elements/PollTr'


const Poll = ({children }) => {

    const [ submenuActive, setSubmenuActive] = useState(false)
    let menuActive = submenuActive ? 'active' : ''

    const handleMouseLeave = () => {
        setSubmenuActive(false)
    }

    
    return (
        <PollTr className={menuActive}>

            {children}
            
            <td className="submenu" onMouseLeave={handleMouseLeave} >

                <div className="toggle_btn" onClick={() => setSubmenuActive(!submenuActive)}>
                    <img src={threedots}/>
                </div>

                <div className="menu_content">
                    <ul>
                        <li><Link>Редактировать</Link></li>
                        <li><Link>Деактивировать</Link></li>
                        <li><Link>Пригласить</Link></li>
                        <li><Link>Экспорт статистики</Link></li>
                    </ul>
                </div>
            </td>
        </PollTr>
    )
}

const MyPollsPage = (props) => {

    const mockPolls = [
        {
            id: 1238919,
            title: 'Устроить вечеринку?',
            publishedBy: 'Нео Бисов',
            createdDate: '1 Апреля, 2019',
            createdTime: '16:30',
            rating: 1000
        },

        {
            id: 89767389,
            title: 'Во что покарсить стену?',
            publishedBy: 'Нео Бисов',
            createdDate: '2 Апреля, 2019',
            createdTime: '12:40',
            rating: 918
        }
    ]


    useEffect(() => {
        props.changePage('Мои опросы')

        return () => {
            props.changePage('')
        }
    }, [])
    

    return (
        <MainContainer>
            <InnerTopBar/>

            <PollsContainer >
                <thead>
                    <tr>
                        <th>Детали опроса</th>
                        <th>Имя пользователя</th>
                        <th>Дата</th>
                        <th>Рейтинг</th>
                    </tr>
                </thead>
 

                <tbody>
                    {mockPolls.map(poll => 

                    <Poll key={poll.id} id={poll.id}>

                        <td className="poll_details">
                            <img src={profileImg}/>
                            <p>{poll.title}</p>
                        </td>

                        <td className="user">{poll.publishedBy}</td>

                        <td className="create_dates">
                            <div className="create_date">{poll.createdDate}</div>
                            <div className="create_time">{poll.createdTime}</div>
                        </td>

                        <td>
                            <div className="rating">{poll.rating}</div>
                        </td>
                    </Poll>)}
                </tbody>

            </PollsContainer>
            
        </MainContainer>
    )
}



export default connect(null, {changePage})(MyPollsPage)