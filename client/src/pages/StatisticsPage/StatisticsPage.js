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

        .stats_content {
            background-color: #fff;
            position: absolute;
            top: -20%;
            left: 0;
            width: 100%;
            z-index: 999;
            color: white;
            background-color: rgba(0, 0, 0, .6);

        }

        .inactive {
            color: white;
        }

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
        width: 100%;

        h5 {
            margin-bottom: 10px;
        }

        .info_box {
            background-color: #DEDEDE;
            width: 100%;
            padding: 10px;
        
        }
        .country {

            display: flex;
            align-items: center;
            justify-content: center;

            ul {

                margin-right: 20%;

                li {
                    list-style: none;
                    font-size: .9em;
                    color: #353C64;
                    font-weight: bold;
                    display: flex;
                    width: 150px;
                    margin: 10px 0;

                    .country_name {
                        margin-right: auto;
                    }
                }
            }

            .diagram {
                width: 150px;
            }
        }
    }
`

const StatisticsPage = () => {

    const [ pollList, setPollList ] = useState([])
    const [ activeStats, setActiveStats ] = useState(null)
    const [ loading, setLoading] = useState(false)
    const [ chartData, setChartData ] = useState(null)

    let windowWidth = window.innerWidth



    useEffect(() => {
        getPollList().then((list) => {
            setPollList(list)
        }) 

        // getPollStatsById(34543).then((poll) => {
        //     setLoading(false)
        //     setActiveStats(poll)
        // })

    }, [])


    const handlePollClick = (id) => {

        setLoading(true)
        setActiveStats(null)

        getPollStatsById(id).then((poll) => {
            setLoading(false)
            setActiveStats(poll)  
        })
    }

    let colors = ['#F12B2C', '#676666', '#00AA8B', '#e91e63', '#03a9f4']

    let forData = []
    if(activeStats) {
        activeStats.countries.map((country, index) => {
            let obj = {
                title: country.name,
                value: country.number,
                color: colors[index],
                percentage: country.number / 100
            }
            forData.push(obj)
        })
    }


    console.log(forData)

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
                    {!activeStats ? (loading ? null : (windowWidth > 980 ? <h1 className="inactive">Выберите опрос</h1> : null)) : (
                        <div className="stats_content">
                            <h5>Страны</h5>
                            <div className="country info_box">
                                <ul>
                                    <li><div className="country_name">Все страны: </div> <div className="country_number">{activeStats.countries.length}</div></li>
                                    {activeStats.countries.map((country, index) => (
                                        <li style={{color: colors[index]}} key={index}><div className="country_name">{country.name}:</div><div className="country_number">{country.number}</div></li>
                                    ))}
                                </ul>

                                <div className="diagram">
                                    <ReactMinimalPieChart
                                        data={forData}
                                        style={{
                                            height: '100%',
                                            width: '100%'
                                        }}
                                        animate={true}
                                        animationDuration={500}
                                        animationEasing="ease-in-out"
                                        label
                                        labelStyle={{
                                            fill: '#dedede',
                                            fontFamily: 'sans-serif',
                                            fontSize: '13px'
                                        }}
                                    />
                                </div>

                            </div>

                            <h5>Возрастной рейтинг</h5>
                            <h5>Показатели по принадлежности к полу</h5>
                        </div>
                    )} 
                    {loading ? <Loader className="loader" type="ThreeDots" color="#5f76ff" height={100} width={100}/> : null}
                </Stats>
            </div>
        </MainContainerCustom>
    )
}

export default StatisticsPage