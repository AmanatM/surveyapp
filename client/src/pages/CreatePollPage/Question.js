import React from 'react'
import QuestionStyled from './QuestionStyled'


const Question = ({question, setQuestions, questions, activeQuestion}) => {

    const typeChange = (e) => {
        e.preventDefault()
        let type = e.target.id
        let newQuestion = {
            ...question,
            q_type: type      
        }
        let newQuestions = questions.map(questionObj => questionObj.number === activeQuestion + 1 ? newQuestion : questionObj)
        setQuestions(newQuestions)
    }

    const nameChange = (e) => {
        let newQuestion = {
            ...question,
            title: e.target.value
        }
        let newQuestions = questions.map(questionObj => questionObj.number === activeQuestion + 1 ? newQuestion : questionObj)
        setQuestions(newQuestions)
    }

    const addOption = (e) => {
        let newQuestion = {
            ...question,
            answer_list: [...question.answer_list, {body: e.target.value} ]
        }
        let newQuestions = questions.map(questionObj => questionObj.number === activeQuestion + 1 ? newQuestion : questionObj)
        setQuestions(newQuestions)
    }

    const deleteOption = (index) => {

        let newOptions = [
            ...question.answer_list.slice(0, index),
            ...question.answer_list.slice(index+1)
        ]

        let newQuestion = {
            ...question,
            answer_list: newOptions
        }

        let newQuestions = questions.map(questionObj => questionObj.number === activeQuestion + 1 ? newQuestion : questionObj)
        setQuestions(newQuestions)
    }



    const optionChange = (e, index) => {

        let newOptions = [...question.answer_list]
        newOptions[index] = {body: e.target.value}

        let newQuestion = {
            ...question,
            answer_list: newOptions
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
                        <li><button id="one_choice" onClick={typeChange} className={question.q_type === 'one_choice' ? 'active' : ''}>Вариант</button></li>
                        <li><button id="text" onClick={typeChange} className={question.q_type === 'text' ? 'active' : ''}>Текст</button></li>
                        <li><button id="date" onClick={typeChange} className={question.q_type === 'date' ? 'active' : ''}>Дата</button></li>
                        <li><button id="time" onClick={typeChange} className={question.q_type === 'time' ? 'active' : ''}>Время</button></li>
                    </ul>
                </div>
                <input onChange={nameChange} value={question.title} className="question_name" type="text" aria-label="Введите вопрос" placeholder="Введите вопрос"/>

                {question.q_type === 'one_choice' ? (
                    <div className="options">
                        <ul>
                            {question.answer_list.map((option, index) =>
                                 <li key={index}>
                                     <input placeholder={`Вариант ответа ${index+1}`} onChange={(e) => optionChange(e, index)} value={option.body}/>
                                     <button onClick={(e) => {e.preventDefault(); deleteOption(index)}} className="delete_option"></button>
                                 </li>)}
                            <li className="add"><button onClick={(e) => { e.preventDefault(); addOption(e)}}>ДОБАВИТЬ ВАРИАНТ ОТВЕТА</button></li>
                        </ul>

                    </div>
                ) : null}
            </QuestionStyled>
        )
    } else {
        return null
    }

}

export default Question