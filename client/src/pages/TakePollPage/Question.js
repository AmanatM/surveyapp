import React, { useState } from 'react'

import QuestionStyled from './QustionStyled'



const TypeOption = ({question, setAnswers, answers}) => {

    return (
        <div className="options">
            <ul>
                {question.answers.map((answer, index) => (
                    <li key={index}><button>{answer}</button></li>
                ))}
            </ul> 
        </div>
    )
}

const TypeText = ({question, setAnswers, answers, activeQuestion}) => {


    const changeText = (e) => {
        let currentAnswer = {...answers[activeQuestion-1], userResponse: e.target.value}

        let newAnswers = [
            ...answers.slice(0, activeQuestion-1),
            currentAnswer,
            ...answers.slice(activeQuestion)

        ]

        setAnswers(newAnswers)

    }

    return (
        <div className="text">
            <textarea placeholder="Введите ответ" onChange={changeText} value={answers[activeQuestion-1].userResponse}></textarea>
        </div>
    )
}

const TypeDate = ({question, setAnswers, answers}) => {

    const months = [
        'Январь',
        'Ферварль',
        'Март',
        'Апрель',
        'Мая',
        'Июнь',
        'Июль',
        'Август',
        'Сеньябрь',
        'Окрябрь',
        'Ноябрь',
        'Декабрь',
    ]

    const [ active, setActive ] = useState(false)
    const [ month, setMonth ] = useState(months[0])

    const openMonths = () => {
        setActive(true)
    }

    const changeMonth = (monthInNumber) => {
        setMonth(months[monthInNumber])
        setActive(false)
    }
                
    return (
        <div className="date">
            <div className="day">
                <label htmlFor="day">ДЕНЬ</label>
                <input type="number" id="day"/>
            </div>
            <div className="month">
                <label>МЕСЯЦ</label>
                <div className="wrapper">
                    <p onClick={openMonths}>{month}</p>
                    <ul className={active ? 'active' : ''}>

                        {months.map((month, index) => <li key={index}><button onClick={(() => changeMonth(index))}>{month}</button></li>)}

                    </ul>
                </div>

            </div>
            <div className="year">
                <label htmlFor="year">ГОД</label>
                <input type="number" id="year"/>
            </div>
        </div>
    )
}

const TypeTime = ({question, setAnswers, answers}) => {
    return (
        <div className="time">
            <div className="time_item hours">

                <input placeholder="HH" type="number"/>

            </div>
            <div className="divider">:</div>
            <div className="time_item minutes">

                <input placeholder="MM" type="number"/>

            </div>
        </div>
    )
}



const Input = ({type, question, setAnswers, answers, activeQuestion}) => {
    switch(type) {

        case 'option':
            return <TypeOption question={question} setAnswers={setAnswers} answers={answers} activeQuestion={activeQuestion}/>


        case 'text':
            return <TypeText setAnswers={setAnswers} answers={answers} activeQuestion={activeQuestion}/>


        case 'date':
            return <TypeDate setAnswers={setAnswers} answers={answers} activeQuestion={activeQuestion}/>


        case 'time':
            return <TypeTime setAnswers={setAnswers} answers={answers} activeQuestion={activeQuestion}/>
    }
}


const Question = ({question, setAnswers, answers, activeQuestion}) => {

    if(question) {
        return (
            <QuestionStyled>
                <h1>{question.name}</h1>
                <Input activeQuestion={activeQuestion} setAnswers={setAnswers} answers={answers} type={question.type} question={question}/>
            </QuestionStyled>
        )
    }

    return null


}

export default Question