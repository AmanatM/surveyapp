import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import setMetaTheme from '../../utils/setThemeColor'


import logo from '../../assets/imgs/logo_pure.svg'
import img404 from './404.svg'

import Container from '../../elements/Container'

const NotFoundSection = styled.section`
    background-color: ${props => props.windowed ? '#E5E5E5' : 'white'};
    border-radius: ${props => props.windowed ? '7px' : '0px'};
    margin-top: ${props => props.windowed ? '20px' : '0px'};
    color: #3F414A;
    text-align: center;  
    min-height: ${props => props.windowed ? '85vh' : '100vh'};;
    display: flex;

    .content {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        
        .logo {
            margin-bottom: 10px;
        }

        p {
            font-weight: bold;
            font-size: 1.2em;
            color: #1488C8;
            margin: 15px;
        }

        .returnSection {
            font-weight: bold;
            a {
                color: #5F76FF;
            }
        }
    }

`

const ContainerCustom = styled(Container)`
    margin: auto;
    padding: 20px;
`

const NotFound = ({windowed}) => {

    setMetaTheme('#ffffff')


    return (
        <NotFoundSection windowed={windowed}>
            <ContainerCustom windowed={windowed}>
                <div className="content">
                    <Link to="/"><img className="logo" src={logo} alt="Лого"/></Link>
                    <p>ОЙ, ОШИБОЧКА</p>
                    <img src={img404} alt="Ошибка 404"/>
                    <p>Увы,<br/>Ваша страничка не найдена</p>
                    <p>Возможно она устарела или была удалена</p>

                    <div className="returnSection">
                        Венуться на <Link to="/">Главную</Link>
                    </div>
                </div>
            </ContainerCustom>
        </NotFoundSection>
    )
}

export default NotFound