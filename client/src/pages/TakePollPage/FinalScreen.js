import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import smileImg from './smile.svg'
import fireworkImg from './firework.svg'

const FinaleScreenStyled = styled.div`
    margin-top: 7%;
    text-align: center;
    color: #353C64;
    display: flex;
    flex-direction: column;
    align-items: center;

    .heading {

        display: flex;
        margin-bottom: 20px;
        align-items: center;

        h1 {
            font-size: 2.5em;
            margin: 0 10px;
        }

        img {

            width: 50px;

            &:first-child {
                transform: scaleX(-1);   
            }
        }

  
    }


    .subheading {
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .smile_img {
        margin-bottom: 20px;
    }

    .about_poll {

        margin-bottom: 20px;

        .poll_number {
            margin: 0 10px;
            color: #1488C8;
            font-weight: bold;
        }
    }

    .btn {
        margin: 10px 0;
        font-size: .9em;
        text-decoration: none;
        color: white;
        font-weight: bold;
        background-color: #5F76FF;
        padding: 8px;
        border-radius: 21px;

        &:last-child {
            background-color: #8A9AF4;
        }
    }




    @media screen and (max-width: 500px) {

        .heading {
            h1 {
                font-size: 1.5em;
            }

            img {
                width: 30px; 
            }

        }

        
    }

    @media screen and (max-width: 340px) {
        .heading {
            h1 {
                font-size: 1.1em;
            }

            img {
                width: 30px; 
            }
        }

        .subheading {
            font-size: 1em;
        }
    }
    
`

const FinalScreen = ({poll}) => {


    return (
        <FinaleScreenStyled>
            <div className="heading">
                <img src={fireworkImg}/>
                <h1>ПОЗДРАВЛЯЕМ!</h1>
                <img src={fireworkImg}/>
            </div>
            <p className="subheading">Вы успешно прошли опрос!</p>
            <img className="smile_img" src={smileImg} />
            <p className="about_poll">Опрос состоял из <span className="poll_number">{poll.question_list.length}</span> пунктов!</p>
            <button className="btn">Поделиться опросом</button>
            <Link className="btn" to="/main/all-polls">На главную</Link>
            
        </FinaleScreenStyled>
    )
}

export default FinalScreen