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
    console.log(activeStats)


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

        getPollStatsById(id)
        .then((res) => {
            setLoading(false)
            setActiveStats(res.statistics)
        })
        .catch((err) => {
            console.log(err)
        })
    }



    let colors = ['#F12B2C', '#ff9800', '#00AA8B', '#e91e63', '#03a9f4', '#8bc34a', '#795548', '#607d8b']

    let forData = []
    if(activeStats) {
        activeStats.countries_list.map((country, index) => {
            let obj = {
                title: country.title,
                value: country.amount,
                color: colors[index]
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


                <StatsStyled className="column"  style={!activeStats ? (windowWidth < 980 ? {backgroundColor: '#EDEDED'} : {})  : {}}>
                    {!activeStats ? (loading ? null : (windowWidth > 980 ? <h1 className="inactive">Выберите опрос</h1> : null)) : (
                        <div className="stats_content" >
                            <button className="close_stats" onClick={() => setActiveStats()}>
                                Закрыть
                            </button>
                            <h5>Страны</h5>
                            <div className="country info_box">
                                <ul>
                                    <li><div className="country_name">Cтраны: </div> <div className="country_number">{activeStats.countries_list.length}</div></li>
                                    {activeStats.countries_list.map((country, index) => (
                                        <li style={{color: colors[index]}} key={index}><div className="country_name">{country.title}:</div><div className="country_number">{country.amount}</div></li>
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
                                    {activeStats.age_list.map((item) => (
                                        <li key={item.title}><b>{item.title}</b>: <i>{item.percentage}%</i></li>
                                    ))}
                                </ul>
                            </div>


                            <h5>Показатели по принадлежности к полу</h5>
                            <div className="gender info_box">
                                <div className="content">

                                    <div className="data_container">
                                    
                                        <div className="data">
                                            <h5>{activeStats.gender_list[0].title === 'male' ? 'Мужчины' : 'Женщины'}</h5>
                                            <div className="amount">{activeStats.gender_list[0].amount}</div>
                                            <div className="percent">{activeStats.gender_list[0].percentage}%</div>
                                        </div>

                                        <div className="data">
                                            <h5>{activeStats.gender_list[1].title === 'female' ? 'Мужчины' : 'Женщины'}</h5>
                                            <div className="amount">{activeStats.gender_list[1].amount}</div>
                                            <div className="percent">{activeStats.gender_list[1].percentage}%</div>
                                        </div>

                                    </div>

                                    <div className="total">
                                        <h5>Всего:</h5>
                                        <div className="total">
                                            {+activeStats.gender_list[0].amount + +activeStats.gender_list[1].amount}
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
