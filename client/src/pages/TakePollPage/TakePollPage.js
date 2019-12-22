import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Loader from 'react-loader-spinner'

import { changePage } from '../../reducers/currentPage'
import { notify } from '../../reducers/popUp'

import MainContainer from '../../elements/MainContainer'
import { getPoll, postUserResponse } from '../../services/polls'
import TakePollPageStyled from './TakePollPageStyled'
import FinalScreen from './FinalScreen'

import Question from './Question'


const MainContainerCustom = styled(MainContainer)`
    padding-bottom: 70px;
`

const TakePollPage = (props) => {

    const [ poll, setPoll ] = useState(null)
    const [ activeQuestion, setActiveQuestion ] = useState(1)
    const [ answers, setAnswers ] = useState({})
    const [ questions, setQuestions ] = useState([])
    const [ pollPassed, setPollPassed ] = useState(false)

    useEffect(() => {
        props.changePage('Текущий опрос')
        props.notify('')

        return () => {
            props.changePage('')
            props.notify('')
        }
    })

    useEffect(() => {

        getPoll(props.id)
        .then((poll) => {
            setPoll(poll)

            let questionsLocal = []
            poll.question_list.map((question, index) => {
                question.number = index+1
                questionsLocal.push(question)
            })

            setQuestions(questionsLocal)
            let answersLocal = []

            poll.question_list.map((question, index) => {

                answersLocal.push({
                    questionNumber: index+1,
                    userResponse: ''
                })
            })

            setAnswers(answersLocal)

        })  
        .catch((err) => {
            console.log(err)
            props.notify({
                heading: 'Что-то пошло не так',
                type: 'error',
                text: 'Ошибка. Попробуйте еще раз'
            })
        })

    }, [])

    const [ question, setQuestion ] = useState(questions.find(question => +question.number === 1))


    const getQuestionByNumber = (number) => {
        if(poll) {
            return questions.find(question => +question.number === +number)
        }
    }

    const changeActiveQuestion = (number) => {
        setActiveQuestion(number)
        setQuestion(getQuestionByNumber(number))
    }

    useEffect(() => {
        changeActiveQuestion(1)
    }, [questions])

    const QuestionInstructions = ({type}) => {
        switch(type) {
            case 'one_choice':
                return <p className="question_instructions">ВЫБЕРИТЕ ИЗ ПРЕДЛОЖЕННЫХ ВАРИАНТОВ</p>
            case 'text':
                return <p className="question_instructions">НАПИШИТЕ СВОЙ ВАРИАНТ</p>
            case 'date':
                return <p className="question_instructions">ВЫБЕРИТЕ ДАТУ</p>
            case 'time':
                return <p className="question_instructions">ВЫБЕРИТЕ ВРЕМЯ</p>
            default:
                return null
        }
    }

    const handleNextSubmit = (e) => {
        e.preventDefault()
        if(activeQuestion < poll.question_list.length) {
            changeActiveQuestion(activeQuestion + 1)
        } else {
            

            let data = {
                survey_id: poll.id,
                user_id: props.user.user_id
            }
            console.log(data)
            postUserResponse(data)
            .then((res) => {
                setPollPassed(true)
            })
            .catch((err) => {
                props.notify({
                    heading: 'Ошибка',
                    type: 'error',
                    text: 'Что-то пошло не так. Попробуйте еще раз'
                })
            })
        }
    }

    const handlePrevSubmit = (e) => {
        e.preventDefault()

        if(activeQuestion > 1) {
            changeActiveQuestion(activeQuestion - 1)
        } 
    }
    

    if(poll) {
        return (
            <MainContainerCustom>

                {pollPassed ? ( <FinalScreen poll={poll}></FinalScreen>) : (<TakePollPageStyled>
                    <h1 className="poll_heading">{poll.title}</h1>
                    <p className="poll_author">{poll.owner.username}</p>

                    <div className="question_numbers">
                        <ul>
                                    
                            {questions.map((question) => (

                                <li key={question.number}><button onClick={(e) => {e.preventDefault(); changeActiveQuestion(question.number)}} className={activeQuestion === question.number ? 'active' : ''} >{question.number}</button></li>
            
                            ))}

                        </ul>
                    </div>

                    <QuestionInstructions type={question ? question.q_type : null}/>
                    
                    <Question activeQuestion={activeQuestion} question={question} setAnswers={setAnswers} answers={answers}/>

                    <div className="switch_buttons">
                        <button disabled={activeQuestion === 1 ? true : false} 
                                onClick={handlePrevSubmit}
                                className="prev">
                            Назад
                        </button>

                        <button onClick={handleNextSubmit} 
                                className={`next ${activeQuestion === questions.length ? 'submit' : ''}`}>

                            {activeQuestion === questions.length ? 'Завершить' : 'Далее'}
                        </button>
                    </div>
                </TakePollPageStyled>)}

            </MainContainerCustom>
        )  
    }

    return (
        <MainContainer style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Loader type="Grid" color="#5f76ff" height={100} width={100}/>
        </MainContainer>
    )

 
}

const mapStateToProps = (state) => {

    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { changePage, notify })(TakePollPage)