import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { changePage } from '../../reducers/currentPage'
import { notify } from '../../reducers/popUp'


import MainContainer from '../../elements/MainContainer'

import FormStyled from './FormStyled'
import Question from './Question'
import Loader from 'react-loader-spinner'


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
    const [ loading, setLoading ] = useState(false)


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
        setLoading(true)
        props.notify('')

        let data = {
            title: poll.title,
            description: poll.description,
            s_type: 'public',
            question_list: questions
        }

        let formattedQuestions = data.question_list

        formattedQuestions.forEach((item) => {
            delete item.number
        })


        let dataToSend = {
            ...data,
            question_list: formattedQuestions
        }

        console.log(dataToSend)
        

        postPoll(dataToSend)
        .then((res)=> {
            setLoading(false)
            props.notify({
                heading: 'Опрос успешно создан',
                type: 'success',
                text: 'Опрос был создан успешно, его можно увидеть на странице Мои опросы'
            })

        })
        .catch((err) => {
            setLoading(false)

            console.log(err)
            props.notify({
                heading: 'Ошибка',
                type: 'error',
                text: 'Что-то пошло не так, попробуйте еще раз'
            })
        })

    }



    const addQuestion = (e) => {

        const defaultQuestion = {
            number: questions.length + 1,
            title: '',
            q_type: 'one_choice',
            answer_list: [

            ]
        }
        
        setQuestions([...questions, defaultQuestion])
    }

    const deleteQuestion = (index, e) => {
        console.log(e)

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

    const handleLoad = (e) => {
        e.preventDefault()
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

    const handleReset = (e) => {
        e.preventDefault()
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
                <input value={poll.title} onChange={(e) => {props.notify(''); setPoll({...poll, title: e.target.value} )}} className="poll_name" placeholder="Название опроса"/>
                <textarea value={poll.description} onChange={(e) => setPoll({...poll, description: e.target.value} )} rows="3" className="poll_description" placeholder="Введите описание"></textarea>


                <Question activeQuestion={activeQuestion} questions={questions} question={questions[activeQuestion]} setQuestions={setQuestions}/>

                <div className="question_numbers">
                    <ul>
                        {questions.map((question, index) => 

                            <div key={index} className="number_container">
                                <li className={activeQuestion === index ? 'active' : ''} >
                                    <button onClick={(e) => {e.preventDefault(); setActiveQuestion(index)}}>{index+1}</button>
                                </li>
                                <button onClick={(e) => {e.preventDefault(); deleteQuestion(index, e)}} className={`delete_question ${activeQuestion === index ? 'active' : ''}`}></button>
                            </div>
                        )}

                        <div className="number_container"><li><button onClick={(e) => { e.preventDefault(); addQuestion()}} className="button">+</button></li></div>
                    </ul>
                </div>

                <div className="save_buttons">
                    <button onClick={handleReset} className="reset">Сбросить</button>
                    <button onClick={handleLoad} className="save_local">Сохранить в черновик</button>
                    <button className="save" disabled={loading} onClick={handleSubmit}>{loading ? <Loader color="#ffffff" width={15} height={15}/> : 'Опубликовать'}</button>
                </div>

            </FormStyled>
        </CreatePollPageSection>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { changePage, notify })(CreatePollPage)