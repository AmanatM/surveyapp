import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { changePage } from '../../reducers/currentPage'
import { notify } from '../../reducers/popUp'


import MainContainer from '../../elements/MainContainer'

import FormStyled from './FormStyled'
import Question from './Question'


const CreatePollPageSection = styled(MainContainer)`
    padding: 30px 60px;
    background-color: #EDEDED;
    position: relative;
    overflow-x: hidden;

    @media screen and (max-width: 1000px){
        padding: 40px 20px;
        padding-bottom: 80px;
    }
`


const CreatePollPage = (props) => {

    const [ questions, setQuestions ] = useState([])
    console.log(questions)

    const [ poll, setPoll ] = useState({
        name: '',
        description: ''
    })


    useEffect(() => {
        props.changePage('Создать опрос')
        addQuestion()


        if(window.localStorage.getItem('questions')) {

            props.notify({
                heading: 'Внимание',
                timed: false,
                text: 'Данные опроса автоматически заполнены с последнего локального сохранения.',
                type: 'info'
            })

            setQuestions(JSON.parse(localStorage.getItem('questions')))
            setPoll(JSON.parse(localStorage.getItem('poll')))
        }


        return () => {
            props.changePage('')
            props.notify('')
        }
    }, [])


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
            options: []
        }

        setQuestions([...questions, defaultQuestion])
    }

    const deleteQuestion = (index) => {
        
        let newQuestions = [
            ...questions.slice(0, index),
            ...questions.slice(index+1)
        ]
        let newCounter = 1

        newQuestions.forEach((question) => {
            question.number = newCounter++
        })

        setQuestions(newQuestions)
    }

    const handleLoad = () => {

        const saveLocally = () => {
            window.localStorage.setItem('questions', JSON.stringify(questions))
            window.localStorage.setItem('poll', JSON.stringify(poll))

            props.notify({
                heading: 'Успешно сохраненно',
                text: 'Данные успешно сохранены в локальном хранилище'
            })
        }
        
        props.notify({
            heading: 'Ваши данные будут сохранены',
            timed: false,
            text: 'Данные опроса будут сохранены локально, их можно будет загрузить при повторном посещении данной страницы(Только с токого же устройства)',
            type: 'confirmation',
            okButtonText: 'Сохранить',
            ifOkFunction: saveLocally
        })

    }

    return (
        <CreatePollPageSection>
            <FormStyled onSubmit={handleSubmit}>
                <input value={poll.name} onChange={(e) => setPoll({...poll, name: e.target.value} )} className="poll_name" placeholder="Название опроса"/>
                <textarea value={poll.description} onChange={(e) => setPoll({...poll, description: e.target.value} )} rows="3" className="poll_description" placeholder="Введите описание"></textarea>


                <Question activeQuestion={activeQuestion} questions={questions} question={questions[activeQuestion]} setQuestions={setQuestions}/>

                <div className="question_numbers">
                    <ul>
                        {questions.map((question, index) => 

                            <div key={index} className="number_container">
                                <li className={activeQuestion === index ? 'active' : ''} onClick={() => setActiveQuestion(index)}>
                                    <button>{index+1}</button>
                                </li>
                                <button onClick={() => deleteQuestion(index)} className={`delete_question ${activeQuestion === index ? 'active' : ''}`}>x</button>
                            </div>
                        )}

                        <div className="number_container"><li onClick={addQuestion}><button>+</button></li></div>
                    </ul>
                </div>

                <div className="save_buttons">
                    <button onClick={handleLoad} className="save_local">Сохранть в черновик</button>
                    <button className="save">Опубликовать</button>
                </div>

            </FormStyled>
        </CreatePollPageSection>
    )
}

export default connect(null, { changePage, notify })(CreatePollPage)