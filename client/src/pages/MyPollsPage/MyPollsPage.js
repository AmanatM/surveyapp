import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import InnerTopBar from '../../components/InnerTopBar/InnerTopBar'
import MainContainer from '../../elements/MainContainer'
import profileImg from '../../assets/imgs/demo-profile-img.jpg'
import threedots from './threedots-icon.svg'


const PollsContainer = styled.table`
    margin-top: 40px;
    width: 100%;
    border-collapse: collapse;

    th {
        text-align: left;
        border: none;
        color: #353C64;
        padding-bottom: 30px;
        font-size: .85em;
    }

    td {
        border: none
    }

    @media screen and (max-width: 780px) {
            table, thead, tbody, th, td, tr { 
                display: block; 
            }
 
            thead tr { 
                display: none;
            }

            tbody tr {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                justify-content: space-around;
                align-items: flex-start;
                border-bottom: 1px solid grey;
                padding: 20px 0;

            }

            td:nth-of-type(5) { 
                order: -2;
                width: 20%;
            }

            td.poll_details {
                width: 79%;
                order: -1;

            }


            td:before { 
                display: block;
                white-space: nowrap;
                font-weight: bold;
                margin-bottom: 5px;
            }
            
    
            td:nth-of-type(2):before { content: "Пользователь: "; }
            td:nth-of-type(3):before { content: "Дата: "; }
            td:nth-of-type(4):before { content: "Рейтинг: "; }


        }

        @media screen and (max-width: 600px) {

            tbody tr {
                justify-content: center;
            }
            td {
                width: 100%;
            }

            div {
                display: inline-block;
            }

            .rating {
                padding: 5px 10px !important;
            }

            div.create_time {
                margin-left: 10px !important;
            }

            td:before { 
                display: inline-block;
                white-space: nowrap;
                font-weight: bold;
                margin-right: 15px;
                margin-bottom: 0;
            }
        }
    }

`

const PollTr = styled.tr`

    font-size: .85em;

    td {
        padding: 10px 0;
    }

    .poll_details {

        display: flex;
        align-items: center;
        
        img {
            width: 35px;
            border-radius: 50%;
            margin-right: 15px;
        }

        p {
            font-weight: bold;
        }
    }

    .rating {
        background-color: #353C64;
        color: white;
        border-radius: 100px;
        text-align: center;
        color: #C5C7CD;
        max-width: 60px;
        padding: 3px;
        font-size: .9em;
    }

    .create_dates {

        .create_time {
            color: #5F76FF;
            font-size: .9em; 
            margin-top: 5px;        
        }

    }

    .submenu {
        border: none;
        position: relative;
        text-align: center;


        div.toggle_btn {
            box-sizing: content-box;
            width: 25px;
            height: 25px;
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            transition: none;
            position: relative;
            z-index: 21;




            @media (pointer: fine) {

                transition: all .2s;

                &:hover {

                    background: #5F76FF;
                
                    img {
                        filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(5281%) hue-rotate(65deg) brightness(121%) contrast(109%);
                    }
                }
            }

        }


        div.menu_content {
            display: none;

            
            li {
                list-style: none;
            }

        }
    }



    &.active {

        div.toggle_btn {

                background: #5F76FF;
                
                img {
                    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(5281%) hue-rotate(65deg) brightness(121%) contrast(109%);
                }
            }

        .submenu {
            
            div.menu_content {
                display: block;
                position: absolute;
                background: #5F76FF;
                color: #EDEDED;
                z-index: 19;
                border-radius: 10px 0px 10px 10px;
                padding: 3px;

                left: -116px;
                bottom: -66px;




                li {
                    border-bottom: 1px solid #EDEDED;
                    padding: 3px 0;

                    &:last-child {
                        border-bottom: none;
                    }
                }

                @media screen and (max-width: 780px) {
                    border-radius: 0px 10px 10px 10px;
                    left: 35px;
                    bottom: -110px;

                    li {
                        padding: 7px 0;
                    }
                }

                @media screen and (max-width: 600px) {
                    left: 45px;
                    bottom: -120px;
                }

            }
        }

    }

`  

const Poll = ({children ,id}) => {

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

const MyPollsPage = () => {

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



    

    return (
        <MainContainer>
            <InnerTopBar titleText="Мои опросы"/>

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

export default MyPollsPage