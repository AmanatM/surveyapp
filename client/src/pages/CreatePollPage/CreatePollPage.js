import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { changePage } from '../../reducers/currentPage'


import MainContainer from '../../elements/MainContainer'

import FormStyled from './FormStyled'
import QuestionStyled from './QuestionStyled'


const CreatePollPageSection = styled(MainContainer)`
    padding: 30px 60px;
    background-color: #EDEDED;
    position: relative;
    overflow-x: hidden;

    @media screen and (max-width: 1000px){
        padding: 40px 20px;
    }
`


const Question = ({question, setQuestions, questions, activeQuestion}) => {

    const typeChange = (e) => {

        let type = e.target.id

        let newQuestion = {
            ...question,
            type: type      
        }

        let newQuestions = questions.map(questionObj => questionObj.number === activeQuestion + 1 ? newQuestion : questionObj)
        
        setQuestions(newQuestions)
    }

    const nameChange = (e) => {
        let newQuestion = {
            ...question,
            name: e.target.value
        }

        let newQuestions = questions.map(questionObj => questionObj.number === activeQuestion + 1 ? newQuestion : questionObj)

        setQuestions(newQuestions)
    }

    if(question) {

        return (
            <QuestionStyled>
                <div className="images_section"></div>
                <div className="question_types">
                    <p>Тип ответа:</p>
                    <ul>
                        <li><button id="option" onClick={typeChange} className={question.type === 'option' ? 'active' : ''}>Вариант</button></li>
                        <li><button id="text" onClick={typeChange} className={question.type === 'text' ? 'active' : ''}>Текст</button></li>
                        <li><button id="date" onClick={typeChange} className={question.type === 'date' ? 'active' : ''}>Дата</button></li>
                        <li><button id="time" onClick={typeChange} className={question.type === 'time' ? 'active' : ''}>Время</button></li>
                    </ul>
                </div>
                <input onChange={nameChange} value={question.name} className="question_name" type="text" aria-label="Введите вопрос" placeholder="Введите вопрос"/>
            </QuestionStyled>
        )
    } else {
        return null
    }

}


const CreatePollPage = (props) => {

    useEffect(() => {
        props.changePage('Создать опрос')
        addQuestion()

        return () => {
            props.changePage('')
        }
    }, [])

    const [ questions, setQuestions ] = useState([])

    const [ poll, setPoll ] = useState({
        name: '',
        description: ''
    })

    const [ activeQuestion, setActiveQuestion ] = useState(0)

    
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const addQuestion = (e) => {

        const defaultQuestion = {
            number: questions.length + 1,
            name: '',
            images: [],
            type: 'option',
            answers: [
                'Ответ 1',
                'Ответ 2'
            ]
        }

        setQuestions([...questions, defaultQuestion])
    }

    return (
        <CreatePollPageSection>
            <FormStyled onSubmit={handleSubmit}>
                <input value={poll.name} onChange={(e) => setPoll({...poll, name: e.target.value} )} className="poll_name" placeholder="Название опроса"/>
                <textarea value={poll.description} onChange={(e) => setPoll({...poll, description: e.target.value} )} rows="3" className="poll_description" placeholder="Введите описание"></textarea>


                <Question activeQuestion={activeQuestion} questions={questions} question={questions[activeQuestion]} setQuestions={setQuestions}/>

                <div className="question_numbers">
                    <ul>
                        {questions.map((question, index) => <li key={index} className={activeQuestion === index ? 'active' : ''} onClick={() => setActiveQuestion(index)}><button>{index+1}</button></li>)}

                        <li onClick={addQuestion}><button>+</button></li>
                    </ul>
                </div>
            </FormStyled>
        </CreatePollPageSection>
    )
}

export default connect(null, { changePage })(CreatePollPage)