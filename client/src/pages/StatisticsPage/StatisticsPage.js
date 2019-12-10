import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ReactMinimalPieChart from 'react-minimal-pie-chart'
import { getPollList, getPollStatsById } from '../../services/polls'
import Loader from 'react-loader-spinner'
import { changePage } from '../../reducers/currentPage'



import MainContainer from '../../elements/MainContainer'
import PollListStyled from './PollListStyled'
import StatsStyled from './StatsStyled'

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



const StatisticsPage = (props) => {

    const [ pollList, setPollList ] = useState([])
    const [ activeStats, setActiveStats ] = useState(null)
    const [ loading, setLoading] = useState(false)
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth) 


    window.addEventListener('resize', () => setWindowWidth(window.innerWidth))


    useEffect(() => {
        props.changePage('Статистика')
        return () => {
            props.changePage('')
        }
    }, [])


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



    let colors = ['#F12B2C', '#ff9800', '#00AA8B', '#e91e63', '#03a9f4', '#8bc34a']

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
                                <tr tabIndex="0" className={activeStats ? (activeStats.id === poll.id ? 'active' : '') : ''} onClick={() => handlePollClick(poll.id)} key={poll.id}>

                                    <td className="name">{poll.name}</td>
                                    <td className="nickname">{poll.nickname}</td>
                                    <td className="create_date">{poll.createDate}</td>
                             
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </PollListStyled>


                <StatsStyled className="column">
                    {!activeStats ? (loading ? null : (windowWidth > 980 ? <h1 className="inactive">Выберите опрос</h1> : null)) : (
                        <div className="stats_content" >
                            <button className="close_stats" onClick={() => setActiveStats()}>
                                Закрыть
                            </button>
                            <h5>Страны</h5>
                            {windowWidth}
                            <div className="country info_box">
                                <ul>
                                    <li><div className="country_name">Cтраны: </div> <div className="country_number">{activeStats.countries.length}</div></li>
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
                                        label={false}
                                        labelStyle={{
                                            fill: '#dedede',
                                            fontFamily: 'sans-serif',
                                            fontSize: '9px'
                                        }}
                                    />
                                </div>

                            </div>

      

                            <h5>Возрастной рейтинг</h5>
                            <div className="age info_box">
                                <h5>Интервал от:</h5>
                                <ul>
                                    <li>10-20: NnN%</li>
                                    <li>20-30: NnN%</li>
                                    <li>30-40: NnN%</li>
                                    <li>40-50: NnN%</li>
                                </ul>
                            </div>


                            <h5>Показатели по принадлежности к полу</h5>
                            <div className="gender info_box">
                                <div className="content">

                                    <div className="data_container">
                                    
                                        <div className="data">
                                            <h5>Мужчины</h5>
                                            <div className="amount">{activeStats.maleNumber}</div>
                                            <div className="percent">{Math.round(+activeStats.maleNumber / (+activeStats.maleNumber + +activeStats.femaleNumber) * 100)}%</div>
                                        </div>

                                        <div className="data">
                                            <h5>Женщины</h5>
                                            <div className="amount">{activeStats.femaleNumber}</div>
                                            <div className="percent">{Math.round(+activeStats.femaleNumber / (+activeStats.maleNumber + +activeStats.femaleNumber) * 100)}%</div>
                                        </div>

                                    </div>

                                    <div className="total">
                                        <h5>Всего:</h5>
                                        <div className="total">
                                            {+activeStats.maleNumber + +activeStats.femaleNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )} 
                    {loading ? <Loader className="loader" type="ThreeDots" color="#5f76ff" height={100} width={100}/> : null}
                </StatsStyled>
            </div>
        </MainContainerCustom>
    )
}

export default connect(null, {changePage})(StatisticsPage)
