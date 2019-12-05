import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactMinimalPieChart from 'react-minimal-pie-chart'
import { getPollList, getPollStatsById } from '../../services/polls'
import Loader from 'react-loader-spinner'



import MainContainer from '../../elements/MainContainer'
import PollListStyled from './PollListStyled'

const MainContainerCustom = styled(MainContainer)`
    background-color: #EDEDED;
    position: relative;

    h1 {
        text-align: center;
    }

    .content {
        display: flex;
        justify-content: center;
        margin-top: 30px;

        .column {
            padding: 15px;
        }
    }

    @media screen and (max-width: 980px) {
        
        .content {
            flex-direction: column;
        }
    }

    @media screen and (max-width: 650px) {
        padding-left: 0;
        padding-right: 0;
    }
`


const Stats = styled.div`
    background-color: #fff;
    flex: 0 1 50%;
    display: flex;
    position: relative;

    @media screen and (max-width: 980px) {
        position: absolute;
        display: none;
    }

    .inactive {
        margin: auto;
    }

    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    .stats_content {

    }
`

const StatisticsPage = () => {

    const [ pollList, setPollList ] = useState([])
    const [ activeStats, setActiveStats ] = useState(null)
    const [ loading, setLoading] = useState(false)


    useEffect(() => {
        getPollList().then((list) => {
            setPollList(list)
        }) 
    }, [])

    const handlePollClick = (id) => {

        setLoading(true)
        setActiveStats(null)

        getPollStatsById(id).then((poll) => {
            setLoading(false)
            setActiveStats(poll)

        })

    }

    return (
        <MainContainerCustom>
            <h1>Статистика</h1>

            <div className="content">
                <PollListStyled className="column">
                    <table>
                        <thead>
                            <tr>
                                <td>Название опроса</td>
                                <td>Никнейм</td>
                                <td>Дата создания </td>
                            </tr>
                        </thead>
                        <tbody>
                            {pollList.map(poll => (
                                <tr onClick={() => handlePollClick(poll.id)} key={poll.id}>

                                    <td className="name">{poll.name}</td>
                                    <td className="nickname">{poll.nickname}</td>
                                    <td className="create_date">{poll.createDate}</td>
                             
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </PollListStyled>


                <Stats className="column">
                    {!activeStats ? (loading ? null : <h1 className="inactive">Выберите опрос</h1>) : (
                        <div className="stats_content">
                            <h5>Страны</h5>
                            <div className="country">
                                {activeStats.countries.map((country) => (
                                    <p>{country}</p>
                                ))}
                            </div>

                            <h5>Возрастной рейтинг</h5>
                            <h5>Показатели по принадлежности к полуСтраны</h5>
                        </div>
                    )} 
                    {loading ? <Loader className="loader" type="ThreeDots" color="#5f76ff" height={100} width={100}/> : null}
                </Stats>
            </div>
        </MainContainerCustom>
    )
}

export default StatisticsPage