import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { notify } from '../../reducers/popUp'
import InnerTopBar from '../../components/InnerTopBar/InnerTopBar'
import MainContainer from '../../elements/MainContainer'
import threedots from './threedots-icon.svg'

import { connect } from 'react-redux'
import { changePage } from '../../reducers/currentPage'

import PollsContainer from '../../elements/PollsContainer'
import PollTr from '../../elements/PollTr'
import Paginator from './Paginator'

import { getMyPollList } from '../../services/polls'

import noAvatarImg from '../../assets/imgs/no-avatar.png'


const MainContainerCustom = styled(MainContainer)`
    .empty_info {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        a {
            background-color: #5F76FF;
            color: white;
            font-weight: bold;
            border-radius: 21px;
            margin-top: 10px;
            padding: 4px 20px;
        }
    }

    &.loading {
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .loader {
        height: 120px;
    }
`

const PollsContainerCustom = styled(PollsContainer)`



    @media screen and (max-width: 820px) {
        td:nth-of-type(2):before { content: "Дата: " ; }
        td:nth-of-type(3):before { content: ""; }
        td:nth-of-type(4):before { content: ": "; }


        td:nth-of-type(3) { 
            order: -1;
            width: 20%;

            .toggle_btn {
                margin-left: auto !important;
            }
        }

        td.poll_details {
            width: 79%;
            order: -2;
        }

        td.create_dates {
            width: 100%;
            display: inline-block;

            div {
                display: inline-block;

                &.create_date {
                    margin-right: 10px;
                }
            }
        }

        td:before { 
            display: inline-block;
            white-space: nowrap;
            font-weight: bold;
            margin-right: 15px;
            margin-bottom: 0;
        }


    }

`

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

    const [ pollList, setPollList ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ count, setCount ] = useState(null)
    const [ offset, setOffset ] = useState(0)


    useEffect(() => {
        setLoading(true)

        getMyPollList(0)
        .then((data) => {
            setPollList(data.results)
            setLoading(false)
            setCount(data.count)

        })
        .catch((err) => {
            setLoading(false)
            console.log(err)

            props.notify({
                heading: 'Что-то пошло не так',
                type: 'error',
                text: 'Попробуйте еще раз'
            })
        })
    }, [])

    useEffect(() => {


        return () => {
            props.notify('')
        }
    }, [])

    const parseDate = (stringDate) => {

        let date = new Date(stringDate)

        let month = date.getMonth()
        let day = date.getDate()
        let year = date.getFullYear()

        return day + '.' + month + '.' + year+','
    }   


    const parseTime = (time) => {
        let string = new Date(time).toLocaleTimeString("ru", {  
            hour: "numeric",  
            minute: "numeric",   
        });

        return string
    } 

    useEffect(() => {
        props.changePage('Мои опросы')

        return () => {
            props.changePage('')
        }
    }, [])
    

    return (
        <MainContainerCustom className={loading ? 'loading' : ''}>



                {loading ? <Loader className="loader" type="Oval" color="#5f76ff" height={120} width={120}/> : (
                <>
                <InnerTopBar/>
                
    
                <PollsContainerCustom >
                    <thead>
                        <tr>
                            <th>Детали опроса</th>
                            {/* <th>Имя пользователя</th> */}
                            <th>Дата</th>
                            {/* <th>Рейтинг</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        {pollList.map(poll => 

                            <Poll key={poll.id} id={poll.id}>

                                <td className="poll_details">
                                    <img src={noAvatarImg}/>
                                    <p>{poll.title}</p>
                                </td>

                                {/* <td className="user">{poll.publishedBy}</td> */}

                                <td className="create_dates">
                                    <div className="create_date">{parseDate(poll.created)}</div>
                                    <div className="create_time">{parseTime(poll.created)}</div>
                                </td>

                                {/* <td>
                                    <div className="rating">{poll.rating}</div>
                                </td> */}

                            </Poll>
                        )}
                        
                    </tbody>

                </PollsContainerCustom>

                {pollList.length === 0 ? (
                    <div className="empty_info">
                        <h3>У вас нет опросов</h3>
                        <Link to="/main/create-poll">Создать опрос</Link>
                    </div>
                ) : null}

                {pollList.length === 0 ? null : (
                    <Paginator setLoading={setLoading} count={count} offset={offset} setPollList={setPollList} getMyPollList={getMyPollList} setOffset={setOffset}></Paginator>
                )}

                

                </>
                )}

            
        </MainContainerCustom>
    )
}



export default connect(null, {changePage, notify})(MyPollsPage)