import React, { useState } from 'react'

import QuestionStyled from './QustionStyled'



const TypeOption = ({question}) => {
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

const TypeText = () => {
    return (
        <div className="text">
            <textarea placeholder="Введите ответ">
            </textarea>
        </div>
    )
}

const TypeDate = () => {

    const months = [
        'Январь',
        'Ферварль',
        'Март',
        'Апрель',
        'Март',
        'Апрель',
        'Май',
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

const TypeTime = () => {
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



const Input = ({type, question}) => {
    switch(type) {

        case 'option':
            return <TypeOption question={question}/>


        case 'text':
            return <TypeText/>


        case 'date':
            return <TypeDate/>


        case 'time':
            return <TypeTime/>
    }
}


const Question = ({question}) => {

    if(question) {
        return (
            <QuestionStyled>
                <h1>{question.name}</h1>
                <Input type={question.type} question={question}/>
            </QuestionStyled>
        )
    }

    return null


}

export default Question