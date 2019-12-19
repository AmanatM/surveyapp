import React, { useState } from 'react'
import styled from 'styled-components'
import PollTr from '../../elements/PollTr'
import noAvatarImg from '../../assets/imgs/no-avatar.png'
import threedots from './threedots-icon.svg'
import { editPollName } from '../../services/polls'


const PollTrCustom = styled(PollTr)`
.edit {
    input {
        border: none;
        padding: 5px;
        outline: none;
        background: transparent;
        border-bottom: 1px solid black;
    }

    button {
        padding: 4px;
        margin-left: 10px;
        margin-top: 20px;
        background-color: #29CC97;
        color: white;
        font-weight: bold;
        border-radius: 10px;
    }
}
`

const Poll = ({poll, notify, pollList, setPollList}) => {

    const [ submenuActive, setSubmenuActive] = useState(false)
    const [ editMode, setEditMode ] = useState(false)
    const [ newPollName, setNewPollName ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const handleMouseLeave = () => {
        setSubmenuActive(false)
    }

    const getPollById = (id) => {
        let poll = pollList.find((poll) => poll.id === id)
        return poll
    }


    const handleEditPoll = () => {
        setEditMode(true)
    }

    const handleInvite = (id) => {
        navigator.clipboard.writeText(`${document.location.origin}/main/all-polls/${id}`)
        notify({
            heading: 'Ссылка скопированна',
            text: `http://localhost:3000/main/all-polls/${id}`,
            type: 'success'
        })
    }

    const handleSubmit = (e, id) => {
        e.preventDefault()

        let poll = getPollById(id)
        
        if(newPollName !== '') {

            let data = {
                ...poll,
                title: newPollName
            }

            editPollName(id, data)
            .then((res) => {
                setPollList(pollList.map(poll => poll.id !== id ? poll : data))
                console.log(res)
                setEditMode(false)
                notify({
                    heading: 'Название обновлено',
                    type: 'success',
                    text: 'Название опроса сменено'
                })
                
            })
            .catch((err) => {
                console.log(err)
                setEditMode(false)
                notify({
                    heading: 'Что-то пошло нетак',
                    type: 'error',
                    text: 'Попробуйте еще раз'
                })

            })

        } else {
            notify({
                heading: 'Не оставляйте название опроса пустым!',
                type: 'error',
                text: ''
            })
        }
    }

    const parseDate = (stringDate) => {

        let date = new Date(stringDate)

        let month = date.getMonth()
        let day = date.getDate()
        let year = date.getFullYear()

        return day + '.' + month + '.' + year+','
    }   


    const parseTime = (time) => {
        let string = new Date(time).toLocaleTimeString("ru", {  
            hour: "numeric",  
            minute: "numeric",   
        });

        return string
    } 

    return (
        <PollTrCustom className={submenuActive ? 'active' : ''}>
            <td className="poll_details">
                <img src={noAvatarImg}/>
               
                {editMode ? (
                    <form onSubmit={(e) => handleSubmit(e, poll.id)} className="edit">
                        <input onChange={(e) => setNewPollName(e.target.value)} value={newPollName}/>
                        <button>Изменить</button>
                    </form>
                ) :  <p>{poll.title}</p>}
            
            </td>

            {/* <td className="user">{poll.publishedBy}</td> */}

            <td className="create_dates">
                <div className="create_date">{parseDate(poll.created)}</div>
                <div className="create_time">{parseTime(poll.created)}</div>
            </td>

            {/* <td>
                <div className="rating">{poll.rating}</div>
            </td> */}

            <td className="submenu" onMouseLeave={handleMouseLeave} >

                <div className="toggle_btn" onClick={() => setSubmenuActive(!submenuActive)}>
                    <img src={threedots}/>
                </div>

                <div className="menu_content">
                    <ul>
                        <li>
                            {editMode ? (<button onClick={() => setEditMode(false)}>Отмена</button>) 
                            : (<button onClick={(e) => handleEditPoll(e)}>Редактировать</button>)}
                        </li>
                        <li><a>Деактивировать</a></li>
                        <li><button onClick={() => handleInvite(poll.id)}>Поделиться</button></li>
                        <li><a>Экспорт статистики</a></li>
                    </ul>
                </div>
            </td>


        </PollTrCustom>
    )
}

export default Poll