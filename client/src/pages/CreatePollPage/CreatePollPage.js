import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { changePage } from '../../reducers/currentPage'
import { notify } from '../../reducers/popUp'


import MainContainer from '../../elements/MainContainer'

import FormStyled from './FormStyled'
import Question from './Question'


import { postPoll, postQuestions } from '../../services/polls'

const CreatePollPageSection = styled(MainContainer)`
    padding: 30px 60px;
    background-color: #EDEDED;
    position: relative;
    overflow-x: hidden;

    @media screen and (max-width: 1000px){
        padding: 40px 20px;
        padding-bottom: 80px;
    }

    @media screen and (max-width: 400px) {
        padding-bottom: 120px;
    }   
`


const CreatePollPage = (props) => {

    const [ questions, setQuestions ] = useState([])

    const [ poll, setPoll ] = useState({
        title: '',
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

        let data = {
            title: poll.title,
            description: poll.description,
            owner: '2',
            duration: '00:10:00',
            s_type: 'public'
        }

        postPoll(data)
        .then((res)=> {
            let pollId = res.id 
            

        })
        .catch((err) => {
            console.log(err)
        })

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
        setActiveQuestion(-1) // To unfocus from active question(to prevent accidental deletion) 
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

    const handleReset = () => {

        const resetPoll = () => {

            setQuestions([])
            setPoll({
                title: '',
                description: ''
            })

            window.localStorage.removeItem('questions')
            window.localStorage.removeItem('poll')


            props.notify({
                heading: 'Опрос сброшен!',
                text: 'Ваши данные об опросе успешно сброшенны',
                ifOkFunction: resetPoll
            })
        }

        props.notify({
            heading: 'Вы уверены?',
            text: 'Ваши данные об опросе будут удалены',
            type: 'confirmation',
            ifOkFunction: resetPoll
        })


    }

    return (
        <CreatePollPageSection>
            <FormStyled onSubmit={handleSubmit}>
                <input value={poll.title} onChange={(e) => setPoll({...poll, title: e.target.value} )} className="poll_name" placeholder="Название опроса"/>
                <textarea value={poll.description} onChange={(e) => setPoll({...poll, description: e.target.value} )} rows="3" className="poll_description" placeholder="Введите описание"></textarea>


                <Question activeQuestion={activeQuestion} questions={questions} question={questions[activeQuestion]} setQuestions={setQuestions}/>

                <div className="question_numbers">
                    <ul>
                        {questions.map((question, index) => 

                            <div key={index} className="number_container">
                                <li className={activeQuestion === index ? 'active' : ''} onClick={() => setActiveQuestion(index)}>
                                    <button>{index+1}</button>
                                </li>
                                <button onClick={() => deleteQuestion(index)} className={`delete_question ${activeQuestion === index ? 'active' : ''}`}></button>
                            </div>
                        )}

                        <div className="number_container"><li onClick={addQuestion}><button>+</button></li></div>
                    </ul>
                </div>

                <div className="save_buttons">
                    <button onClick={handleReset} className="reset">Сбросить</button>
                    <button onClick={handleLoad} className="save_local">Сохранть в черновик</button>
                    <button className="save">Опубликовать</button>
                </div>

            </FormStyled>
        </CreatePollPageSection>
    )
}

export default connect(null, { changePage, notify })(CreatePollPage)