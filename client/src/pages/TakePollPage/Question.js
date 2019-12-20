import React, { useState, useEffect } from 'react'

import QuestionStyled from './QustionStyled'



const TypeOption = ({question, setAnswers, answers, activeQuestion}) => {

    const [ activeOption, setActiveOption] = useState(answers[activeQuestion-1].userResponse)


    const changeOption = (answer, index) => {
        setActiveOption(answer.body)

        let currentAnswer = {...answers[activeQuestion-1], userResponse: answer.body}
        
        let newAnswers = [
            ...answers.slice(0, activeQuestion-1),
            currentAnswer,
            ...answers.slice(activeQuestion)

        ]
        setAnswers(newAnswers)

    }

    return (
        <div className="options">
            <ul>
                {question.answer_list.map((answer, index) => (
                    <li key={answer.id}><button className={activeOption === answer.body ? 'active' : ''} onClick={(e) => {e.preventDefault(); changeOption(answer, index)}}>{answer.body}</button></li>
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

const TypeDate = ({question, setAnswers, answers, activeQuestion}) => {

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
    const [ month, setMonth ] = useState('')
    const [ day, setDay ] = useState('1')
    const [ year, setYear ] = useState('2019')



    useEffect(() => {
        let userAnswer = answers[activeQuestion-1].userResponse

        if(userAnswer) {
            let userMonth = userAnswer.match(/\D/gi)
            let userDay = userAnswer.match(/\d+\s/gi)
            let userYear = userAnswer.match(/\s\d+/gi)

            if(userMonth) setMonth(months[months.indexOf(userMonth.join('').trim())])
            if(userDay) setDay(userDay.join('').trim())
            if(userYear) setYear(userYear.join('').trim())

            
            
        } 
        

    }, [])


    const changeDay = (e) => {

        let currentAnswer
        if(+e.target.value > 31 && day.length < 2) {
            setDay('31')
            currentAnswer = {...answers[activeQuestion-1], userResponse: '31' + ' ' + month + ' ' + year}
        } else {
            setDay(e.target.value.slice(0, 2))
            currentAnswer = {...answers[activeQuestion-1], userResponse: e.target.value.slice(0, 2) + ' ' + month + ' ' + year}
        }

        let newAnswers = [
            ...answers.slice(0, activeQuestion-1),
            currentAnswer,
            ...answers.slice(activeQuestion)

        ]
        setAnswers(newAnswers)
    }
    
    const changeYear = (e) => {
        setYear(e.target.value.slice(0, 4))

        let currentAnswer = {...answers[activeQuestion-1], userResponse: day + ' ' + month + ' ' + e.target.value}
        let newAnswers = [
            ...answers.slice(0, activeQuestion-1),
            currentAnswer,
            ...answers.slice(activeQuestion)

        ]
        setAnswers(newAnswers)
    }



    const changeDate = (month) => {

        let currentAnswer = {...answers[activeQuestion-1], userResponse: day + ' ' + month + ' ' + year}
        let newAnswers = [
            ...answers.slice(0, activeQuestion-1),
            currentAnswer,
            ...answers.slice(activeQuestion)

        ]
        setAnswers(newAnswers)

    }

    const openMonths = () => {
        setActive(true)
    }

    const changeMonth = (monthInNumber) => {
        setMonth(months[monthInNumber])
        setActive(false)
        changeDate(months[monthInNumber])
    }
                
    return (
        <div className="date">
            <div className="day">
                <label htmlFor="day">ДЕНЬ</label>
                <input type="number" id="day" value={day} onChange={changeDay}/>
            </div>
            <div className="month" onMouseLeave={() => setActive(false)}>
                <label>МЕСЯЦ</label>
                <div className="wrapper" >
                    <p onClick={openMonths}>{month}</p>
                    <ul className={active ? 'active' : ''}>

                        {months.map((month, index) => <li key={index}><button onClick={(e) => {e.preventDefault(); changeMonth(index)}}>{month}</button></li>)}

                    </ul>
                </div>

            </div>
            <div className="year">
                <label htmlFor="year">ГОД</label>
                <input type="number" id="year" value={year} onChange={changeYear}/>
            </div>
        </div>
    )
}

const TypeTime = ({question, setAnswers, answers, activeQuestion}) => {

    const [ hours, setHours ] = useState('')
    const [ minutes, setMinutes ] = useState('')

    useEffect(() => {
        let userAnswer = answers[activeQuestion-1].userResponse

        if(userAnswer) {

            let userHours = userAnswer.match(/\d+\s/gi)
            let userMinutes = userAnswer.match(/\s\d+/gi)

            if(userHours) {
                setHours(userHours.join('').trim())
            }

            if(userMinutes) {
                setMinutes(userMinutes.join('').trim())
            }
            
        }
    }, [])



    const changeTime = (time) => {

        let currentAnswer = {...answers[activeQuestion-1], userResponse: time}
        let newAnswers = [
            ...answers.slice(0, activeQuestion-1),
            currentAnswer,
            ...answers.slice(activeQuestion)

        ]
        setAnswers(newAnswers)

    }

    const changeHours = (e) => {
        let time
        
        if(e.target.value.length > 2) {
            setHours(e.target.value.slice(0, 2))
            time = e.target.value.slice(0, 2) + ' : ' + minutes
        } else {
            setHours(e.target.value)
            time = e.target.value + ' : ' + minutes
        }

        changeTime(time)
    }

    const changeMinutes = (e) => {
        let time
        
        if(e.target.value.length > 2) {
            setMinutes(e.target.value.slice(0, 2))
            time = hours + ' : ' + e.target.value.slice(0, 2)
        } else {
            setMinutes(e.target.value)
            time = hours + ' : ' + e.target.value
        }

        changeTime(time)
    }

    return (
        <div className="time">
            <div className="time_item hours">

                <input value={hours} placeholder="HH" type="number" onChange={changeHours}/>

            </div>
            <div className="divider">:</div>
            <div className="time_item minutes">

                <input value={minutes} placeholder="MM" type="number" onChange={changeMinutes}/>

            </div>
        </div>
    )
}



const Input = ({type, question, setAnswers, answers, activeQuestion}) => {
    switch(type) {

        case 'one_choice':
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
                <h1>{question.text}</h1>
                <Input activeQuestion={activeQuestion} setAnswers={setAnswers} answers={answers} type={question.q_type} question={question}/>
            </QuestionStyled>
        )
    }

    return null


}

export default Question