import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Loader from 'react-loader-spinner'

import { changePage } from '../../reducers/currentPage'


import MainContainer from '../../elements/MainContainer'
import getPoll from '../../services/polls'
import TakePollPageStyled from './TakePollPageStyled'

import Question from './Question'


const MainContainerCustom = styled(MainContainer)`
    padding-bottom: 70px;
`

const TakePollPage = (props) => {

    const [ poll, setPoll ] = useState(null)
    const [ activeQuestion, setActiveQuestion ] = useState(1)
    const [ answers, setAnswers ] = useState({})

    useEffect(() => {
        if(poll) {
            setAnswers([
                ...poll.questions.map(question => {
                    return {
                        questionNumber: question.number,
                        userResponse: ''
                    }
                })
            ])
        }
    }, [poll])


    const getQuestionByNumber = (number) => {
        if(poll) {
            return poll.questions.find(question => +question.number === +number)
        }
    }

    const changeActiveQuestion = (number) => {
        setActiveQuestion(number)
        setQuestion(getQuestionByNumber(number))
    }

    const [ question, setQuestion ] = useState(getQuestionByNumber(activeQuestion))


    useEffect(() => {
        props.changePage('Текущий опрос')

        getPoll(props.id).then((poll) => {
            setPoll(poll)
            if(poll) {
                setQuestion(poll.questions.find(question => +question.number === activeQuestion))
            }
        })

        return () => {
            props.changePage('')
        }
    }, [])


    const QuestionInstructions = ({type}) => {
        switch(type) {
            case 'option':
                return <p className="question_instructions">ВЫБЕРИТЕ ИЗ ПРЕДЛОЖЕННЫХ ВАРИАНТОВ</p>
            case 'text':
                return <p className="question_instructions">НАПИШИТЕ СВОЙ ВАРИАНТ</p>
            case 'date':
                return <p className="question_instructions">ВЫБЕРИТЕ ДАТУ</p>
            case 'time':
                return <p className="question_instructions">ВЫБЕРИТЕ ВРЕМЯ</p>
            default:
                return null;
        }
    }
    

    if(poll) {
        return (
            <MainContainerCustom>
                <TakePollPageStyled>
                    <h1 className="poll_heading">{poll.name}</h1>
                    <p className="poll_author">{poll.author}</p>

                    <div className="question_numbers">
                        <ul>
                                    
                            {poll.questions.map((question) => (

                                <li key={question.number}><button onClick={() => changeActiveQuestion(question.number)} className={activeQuestion === question.number ? 'active' : ''} >{question.number}</button></li>
            
                            ))}

                        </ul>
                    </div>

                    <QuestionInstructions type={question ? question.type : null}/>
                    <Question activeQuestion={activeQuestion} question={question} setAnswers={setAnswers} answers={answers}/>

                    <div className="switch_buttons">
                        <button disabled={activeQuestion === 1 ? true : false} 
                                onClick={() => activeQuestion > 1 ?  changeActiveQuestion(activeQuestion - 1) : false}
                                className="prev">

                            Назад
                        </button>

                        <button onClick={() => activeQuestion < poll.questions.length ? changeActiveQuestion(activeQuestion + 1) : false} 
                                className={`next ${activeQuestion === poll.questions.length ? 'submit' : ''}`}>

                            {activeQuestion === poll.questions.length ? 'Заврешить' : 'Далее'}
                        </button>
                    </div>
                </TakePollPageStyled>

            </MainContainerCustom>
        )  
    }

    return (
        <MainContainer style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Loader type="TailSpin" color="#5f76ff" height={100} width={100}/>
        </MainContainer>
    )

 
}

export default connect(null, { changePage })(TakePollPage)