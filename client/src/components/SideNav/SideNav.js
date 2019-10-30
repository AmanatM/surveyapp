import React, { useState } from 'react'
import logo from './logo-dark.svg'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import personIcon from './person-icon.svg'
import questionIcon from './question-icon.svg'
import bulbIcon from './bulb-icon.svg'
import membersIcon from './members-icon.svg'
import statsIcon from './stats-icon.svg'
import settingsIcon from './settings-icon.svg'

const Nav = styled.nav`
    background-color: #EDEDED;
    min-width: 255px;
    min-height: 100vh;
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    @media screen and (max-width: 1100px) {
        min-width: 70px;
        width: 70px;
    }

`

const Logo = styled.img`
    width: 200px;
    display: block;
    margin: 0 auto;
    margin-top: 35px;
`

const MenuList = styled.ul`
    margin-top: 50px;
    color: #353C64;
`

const MenuItem = styled.li`


    a {
        display: block;
        padding: 15px 0;
        padding-left: 30px;
        transition: all .2s;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0,0,0,0);

        &.active {
            background: rgba(63, 65, 74, 0.08);
            text-decoration: none;
            border-left: 3px solid #5F76FF;
            color: #5F76FF;

            img {
                filter: invert(42%) sepia(43%) saturate(3129%) hue-rotate(216deg) brightness(102%) contrast(101%);
            }
        }

        &:hover {
            background: rgba(63, 65, 74, 0.08);
            text-decoration: none;
            border-left: 3px solid #5F76FF;
            color: #5F76FF;

            img {
                filter: invert(42%) sepia(43%) saturate(3129%) hue-rotate(216deg) brightness(102%) contrast(101%);
            }
        }
    }

    img {
        margin-right: 20px;
    }

    @media screen and (max-width: 1100px) { 
        a {
            padding: 0;
            display: flex;
            justify-content: center;
            align-content: center;
            padding: 20px;

            img {
                margin: 0;
                width: 20px;
            }

            span {
                display: none;
            }
        }
    }
`

const SideNav = () => {

    const [ activePage, setActivePage] = useState('')

    const handleLink = () => {
        setActivePage('')
    }

    return (
        <Nav>
            <NavLink to="/"><Logo src={logo}/></NavLink>
            <MenuList>
                <MenuItem><NavLink to="/main/my-polls" ><img alt="Мои Опросы" src={personIcon}/><span>Мои опросы</span></NavLink></MenuItem>
                <MenuItem><NavLink to="/main/all-polls" onClick={handleLink}><img alt="Опросы" src={questionIcon}/><span>Опросы</span></NavLink></MenuItem>
                <MenuItem><NavLink to="/main/create-poll"><img alt="Создать Опрос" src={bulbIcon}/><span>Создать опрос</span></NavLink></MenuItem>
                <MenuItem><NavLink to="/main/users"><img alt="Пользователи " src={membersIcon}/><span>Пользователи</span></NavLink></MenuItem>
                <MenuItem><NavLink to="/main/statistics"><img alt="Статистика" src={statsIcon}/><span>Статистика</span></NavLink></MenuItem>
                <MenuItem><NavLink to="/main/settings"><img alt="Настройки" src={settingsIcon}/><span>Настройки</span></NavLink></MenuItem>
            </MenuList>
        </Nav>  
    )
}

export default SideNav