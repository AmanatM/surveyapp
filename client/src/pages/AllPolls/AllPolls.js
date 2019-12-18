import React, { useEffect, useState } from 'react'
import  styled from 'styled-components'
import { connect } from 'react-redux'
import { changePage } from '../../reducers/currentPage'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { notify } from '../../reducers/popUp'




import InnerTopBar from '../../components/InnerTopBar/InnerTopBar'
import MainContainer from '../../elements/MainContainer'

import PollsContainer from '../../elements/PollsContainer'
import PollTr from '../../elements/PollTr'

import { getAllPolls } from '../../services/polls'

import Paginator from './Paginator'


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
    const [ loading, setLoading ] = useState(false)
    const [ count, setCount ] = useState(null)
    const [ offset, setOffset ] = useState(0)

    
    useEffect(() => {
        setLoading(true)
        
        getAllPolls(7)
        .then((data) => {
            setPollList(data.results)

            setLoading(false)
            setCount(data.count)
        })
        .catch((err) => {
            setLoading(false)
            props.notify({
                heading: 'Ошибка',
                type: 'error',
                text: 'Что-то пошло не так. Попробуйте позже.'
            })
        })
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


    return (
        <MainContainerCustom className={loading ? 'loading' : ''}>

            {loading ? <Loader className="loader" type="Oval" color="#5f76ff" height={120} width={120}/> : (
                <>
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
                                        <div className="user">-</div>
                                    </td>

                                    <td className="user">-</td>


                                    <td className="create_dates">
                                        <div className="create_date">{parseDate(poll.created)}</div>
                                        <div className="create_time">{parseTime(poll.created)}</div>
                                    </td>
                                </PollTrCustom>   
                            )}
                    </tbody>
                    
                </PollsContainerCustom>
                {pollList.length === 0 ? null : (
                    <Paginator setLoading={setLoading} count={count} offset={offset} setPollList={setPollList} getAllPolls={getAllPolls} setOffset={setOffset}></Paginator>
                )}
                </>
            )}
        </MainContainerCustom>
    )
}

export default connect(null, { changePage, notify })(AllPolls)