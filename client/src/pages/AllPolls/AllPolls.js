import React, { useEffect } from 'react'
import  styled from 'styled-components'
import { connect } from 'react-redux'
import { changePage } from '../../reducers/currentPage'
import { Link } from 'react-router-dom'


import InnerTopBar from '../../components/InnerTopBar/InnerTopBar'
import MainContainer from '../../elements/MainContainer'

import PollsContainer from '../../elements/PollsContainer'
import PollTr from '../../elements/PollTr'

import demoUser from './demo_user.jpg'


const PollsContainerCustom = styled(PollsContainer)`

    td.poll_details {
        padding-left: 10px;

        img {
            width: 50px;
            border: 6px solid #676767;
            height: 50px;
            transition: all .1s;
        }
    }
 
    @media screen and (max-width: 820px) {
        

        td.poll_details {
            width: 100%;
            text-align: center;
            font-size: 1.15em;
            padding-left: 0;
            cursor: pointer;
            
            img {
                margin-left: auto;
            }
        }

    }
`

const PollTrCustom = styled(PollTr)`
    transition: all .1s;


    @media (pointer: fine) and (min-width: 820px){

        &:hover {
            background-color: #1488C8;
            color: white;
            cursor: pointer;

            .rating {
                background-color: white;
                color: #1488C8;
            }

            .poll_details {
                img {
                    border-color: #29CC97;
                }
            }


            .create_dates {

                .create_time {
                    color: #C5C7CD;
                }
            }
        }
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
            width: 100%;
        }
    }

    .rating {
        background-color: #1488C8;
        color: white;
        transition: all .2s;
    }
`

const AllPolls = (props) => {

    useEffect(() => {
        props.changePage('Опросы')

        return () => {
            props.changePage('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const mockPolls = [
        {
            id: 1047810,
            title: 'Что лушче "Гиппопотам" или "Сметана"?',
            createdDate: '11 Мая, 2019',
            createdTime: '06:30',
            rating: 1000,
            user: {
                name: 'Том',
                surname: 'Круз',
                username: 'tomcr',
                userAvatar: demoUser
            }
        },

        {
            id: 1203971,
            title: 'Что подарить девушке?',
            createdDate: '12 Мая, 2019',
            createdTime: '8:43',
            rating: 700,
            user: {
                name: 'Джейсон',
                surname: 'Вурхиз',
                username: 'jasonloveman',
                userAvatar: demoUser
            }
        },
        {
            id: 2098741,
            title: 'Протеин или креатин?',
            createdDate: '31 Мая, 2019',
            createdTime: '12:33',
            rating: 700,
            user: {
                name: 'Алексей',
                surname: 'Буцилин',
                username: 'bitsuhaboy',
                userAvatar: demoUser
            }
        }
    ]

    return (
        <MainContainer>
            <InnerTopBar/>
            <PollsContainerCustom >
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
                            <PollTrCustom key={poll.id}>
                                <td className="poll_details">
                                    <img alt="Аватар пользователя" src={poll.user.userAvatar}/>
                                    <p><Link>{poll.title}</Link></p>
                                </td>

                                <td className="user">{poll.user.name} {poll.user.surname}</td>

                                <td className="create_dates">
                                    <div className="create_date">{poll.createdDate}</div>
                                    <div className="create_time">{poll.createdTime}</div>
                                </td>

                                <td>
                                    <div className="rating">{poll.rating}</div>
                                </td>
                            </PollTrCustom>   
                        )}
                </tbody>
                
            </PollsContainerCustom>
        </MainContainer>
    )
}

export default connect(null, { changePage })(AllPolls)