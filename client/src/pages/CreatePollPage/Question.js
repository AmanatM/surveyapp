import React from 'react'
import QuestionStyled from './QuestionStyled'


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

    const addOption = (e) => {
        let newQuestion = {
            ...question,
            options: [...question.options, e.target.value ]
        }
        let newQuestions = questions.map(questionObj => questionObj.number === activeQuestion + 1 ? newQuestion : questionObj)
        setQuestions(newQuestions)
    }

    const deleteOption = (index) => {

        let newOptions = [
            ...question.options.slice(0, index),
            ...question.options.slice(index+1)
        ]

        let newQuestion = {
            ...question,
            options: newOptions
        }

        let newQuestions = questions.map(questionObj => questionObj.number === activeQuestion + 1 ? newQuestion : questionObj)
        setQuestions(newQuestions)
    }



    const optionChange = (e, index) => {

        let newOptions = [...question.options]
        newOptions[index] = e.target.value

        let newQuestion = {
            ...question,
            options: newOptions
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

                {question.type === 'option' ? (
                    <div className="options">
                        <ul>
                            {question.options.map((option, index) =>
                                 <li key={index}>
                                     <input placeholder={`Вариант ответа ${index+1}`} onChange={(e) => optionChange(e, index)} value={option}/>
                                     <button onClick={() => deleteOption(index)} className="delete_option"></button>
                                 </li>)}
                            <li className="add"><button onClick={addOption}>ДОБАВИТЬ ВАРИАНТ ОТВЕТА</button></li>
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