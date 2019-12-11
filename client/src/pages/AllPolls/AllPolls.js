import React, { useEffect, useState } from 'react'
import  styled from 'styled-components'
import { connect } from 'react-redux'
import { changePage } from '../../reducers/currentPage'
import { Link } from 'react-router-dom'


import InnerTopBar from '../../components/InnerTopBar/InnerTopBar'
import MainContainer from '../../elements/MainContainer'

import PollsContainer from '../../elements/PollsContainer'
import PollTr from '../../elements/PollTr'

import { getAllPolls } from '../../services/polls'


const PollsContainerCustom = styled(PollsContainer)`

    td.poll_details {
        display: flex;
        align-content: center;
        padding: 25px;
        height: 100%;



        /* img {
            width: 50px;
            border: 6px solid #676767;
            height: 50px;
            transition: all .1s;
        } */
    }
 
    @media screen and (max-width: 820px) {
        

        td.poll_details {
            width: 100%;
            text-align: center;
            font-size: 1.15em;
            cursor: pointer;
            
            img {
                margin-left: auto;
            }
        }

        td:nth-of-type(2):before { content: "Никнэйм: "; }
        td:nth-of-type(3):before { content: "Имя пользователя: "; }
        td:nth-of-type(4):before { content: "Дата: "; }

    }
`

const PollTrCustom = styled(PollTr)`
    transition: all .1s;


    @media (pointer: fine) and (min-width: 820px){

        &:hover {
            background-color: #8A9AF4;
            color: white;


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
    

    const [ pollList, setPollList ] = useState([])
    useEffect(() => {
        getAllPolls().then((data) => {
            setPollList(data)
        })
    }, [])


    return (
        <MainContainer>
            <InnerTopBar/>
            <PollsContainerCustom >
                <thead>
                    <tr>
                        <th>Название опроса</th>
                        <th>Никнэйм</th>
                        <th>Имя пользователя</th>
                        <th>Дата создания</th>
                    </tr>
                </thead>

                <tbody>
                        {pollList.map(poll => 
                        
                            <PollTrCustom key={poll.id}>
                                <td className="poll_details">
                                    <p><Link to={`/main/all-polls/${poll.id}`}>{poll.title}</Link></p>
                                </td>

                                <td>
                                    <div className="user">{poll.user.username}</div>
                                </td>

                                <td className="user">{poll.user.name} {poll.user.surname}</td>


                                <td className="create_dates">
                                    <div className="create_date">{poll.createdDate}</div>
                                    <div className="create_time">{poll.createdTime}</div>
                                </td>
                            </PollTrCustom>   
                        )}
                </tbody>
                
            </PollsContainerCustom>
        </MainContainer>
    )
}

export default connect(null, { changePage })(AllPolls)