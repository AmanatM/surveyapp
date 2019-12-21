import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ReactMinimalPieChart from 'react-minimal-pie-chart'
import { getStatsList, getPollStatsById } from '../../services/polls'
import Loader from 'react-loader-spinner'
import { changePage } from '../../reducers/currentPage'
import { notify } from '../../reducers/popUp'




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
    const [ listLoading, setListLoading ] = useState(false)




    window.addEventListener('resize', () => setWindowWidth(window.innerWidth))


    useEffect(() => {
        props.changePage('Статистика')
        props.notify('')

        
        return () => {
            props.changePage('')
            props.notify('')
        }
    }, [])


    useEffect(() => {
        setListLoading(true)

        getStatsList(0)
        .then((data) => {
            setPollList(data.results)
            setListLoading(false)


        }) 
        .catch((err) => {
            setListLoading(false)
            props.notify({
                heading: 'Ошибка',
                type: 'error',
                text: 'Попробуйте попытку позже.'
            })
        })
    }, [])


    const handlePollClick = (id) => {
        props.notify('')
        setLoading(true)
        setActiveStats(null)

        getPollStatsById(id)
        .then((res) => {
            console.log(res)
            setLoading(false)
            setActiveStats(res.statistics)
        })
        .catch((err) => {
            setLoading(false)
            props.notify({
                heading: 'Слишком мало данных',
                type: 'info',
                text: 'Не достатчно данных для отображения статистики'
            })
            
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


    const parseDate = (stringDate) => {

        let date = new Date(stringDate)

        let month = date.getMonth()
        let day = date.getDate()
        let year = date.getFullYear()

        return day + '.' + month + '.' + year+''
    }  


    return (
        <MainContainerCustom>
            <h1>Статистика</h1>

            <div className="content">

                <PollListStyled className={`column ${listLoading ? 'loading': ''}`}>
                    {listLoading ? <Loader className="loader" type="TailSpin" color="#5f76ff" height={90} width={90}/> : (
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

                                        <td className="name">{poll.title}</td>
                                        <td className="nickname">{props.user.username}</td>
                                        <td className="create_date">{parseDate(poll.created)}</td>
                                
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
   
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

                                        {activeStats.gender_list[1] ? (
                                            <div className="data">
                                                <h5>{activeStats.gender_list[1].title === 'female' ? 'Мужчины' : 'Женщины'}</h5>
                                                <div className="amount">{activeStats.gender_list[1].amount}</div>
                                                <div className="percent">{activeStats.gender_list[1].percentage}%</div>
                                            </div>
                                        ) : null}

                                    </div>

                                    <div className="total">
                                        <h5>Всего:</h5>
                                        <div className="total">
                                            {activeStats.gender_list[1] ? +activeStats.gender_list[0].amount + +activeStats.gender_list[1].amount : +activeStats.gender_list[0].amount}
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

const mapStateToProps = (state) => {

    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {changePage, notify})(StatisticsPage)
