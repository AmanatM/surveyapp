import React from 'react'

import QuestionStyled from './QustionStyled'

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

const Input = ({type, question}) => {
    switch(type) {

        case 'option':
            return (
                <div className="options">
                    <ul>
                        {question.answers.map((answer, index) => (
                            <li key={index}><button>{answer}</button></li>
                        ))}
                    </ul> 
                </div>
            )


        case 'text':
            return (
                <div className="text">
                    <textarea placeholder="Введите ответ">
                    </textarea>
                </div>
            )

        case 'date':
            return (
                <div className="date">
                    <div className="day">
                        <label htmlFor="day">ДЕНЬ</label>
                        <input id="day"/>
                    </div>
                    <div className="month">
                        <label>МЕСЯЦ</label>
                        <div className="wrapper">
                            <p>Апрель</p>
                            <ul>
                                {months.map((month, index) => <li key={index}><button>{month}</button></li>)}
                                
                            </ul>
                        </div>

                    </div>
                    <div className="year">
                        <label htmlFor="year">ГОД</label>
                        <input id="year"/>
                    </div>
                </div>
            )

        case 'time':
            return (
                <div>
                    time
                </div>
            )
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