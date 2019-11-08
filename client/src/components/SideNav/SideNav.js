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

const NavSection = styled.div`

` 

const Nav = styled.nav`
    background-color: #EDEDED;
    min-width: 255px;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    

    @media screen and (max-width: 1100px) {
        min-width: 70px;
        width: 70px;
        transition: none;
    }   

    @media screen and (max-width: 780px) {
        box-shadow: -7px -1px 13px 10px rgba(0, 0, 0, .5);
        display: flex;
        min-width: 255px;
        width: auto;
        position: fixed;
        z-index: 9999;
        overflow: scroll;
        transform: translateX(-110%);
        transition: all .3s;
        padding-top: 60px;


        &.active {
            transform: translateX(0);
        }
    }

`

const ToggleBtn = styled.button`
    outline: none;
    width: 45px;
    height: 45px;
    background-color: #fff;
    display: none;
    border-radius: 50%;
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,.4);
    padding: 10px;
    align-items: center;
    justify-content: center;

    &:after, &:before {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: #353C64;
        transition: all .2s;

    }

    &::before {
        margin-bottom: 8px;
        width: 70%;
        transition: all .2s;
    }

    &:hover {
        &::before {
            width: 100%;
        }
    }

    @media screen and (max-width: 780px) {
        display: block;
        position: fixed;
        top: 20px;
        left: 10px;
        z-index: 99999;

        &.active {

            &::after, &::before {
                content: '';
                display: block;
                width: 100%;
                height: 2px;
                background-color: #353C64;
            }

            &::before {
                width: 100%;
                transform: rotate(45deg) translate(4px, 4px);
            }

            &::after {
                transform:rotate(-45deg) translate(3px,-3px);

            }
        }
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

    @media screen and (max-width: 780px) {
        a {
            padding: 0;
            display: flex;
            justify-content: flex-start;
            padding: 20px;

            img {
                margin-right: 20px;
            }

            span {
                display: block;
            }
        }
    }


`

const SideNav = () => {

    const [ menuActive, setMenuActive] = useState(false)

    let menuClass = menuActive ? 'active' : ''

    const toggleMenu = () => {
        setMenuActive(!menuActive)
    }

    const linkClick = () => {
        setMenuActive(false)
    }

    return (
        <NavSection>
           <ToggleBtn className={menuClass} onClick={toggleMenu}/>
            <Nav className={menuClass}>
                <NavLink to="/"><Logo src={logo}/></NavLink>
                <MenuList>
                    <MenuItem><NavLink onClick={linkClick} to="/main/my-polls" ><img alt="Мои Опросы" src={personIcon}/><span>Мои опросы</span></NavLink></MenuItem>
                    <MenuItem><NavLink onClick={linkClick} to="/main/all-polls"><img alt="Опросы" src={questionIcon}/><span>Опросы</span></NavLink></MenuItem>
                    <MenuItem><NavLink onClick={linkClick} to="/main/create-poll"><img alt="Создать Опрос" src={bulbIcon}/><span>Создать опрос</span></NavLink></MenuItem>
                    {/* <MenuItem><NavLink onClick={linkClick} to="/main/users"><img alt="Пользователи " src={membersIcon}/><span>Пользователи</span></NavLink></MenuItem> */}
                    <MenuItem><NavLink onClick={linkClick} to="/main/statistics"><img alt="Статистика" src={statsIcon}/><span>Статистика</span></NavLink></MenuItem>
                    { <MenuItem><NavLink onClick={linkClick} to="/main/profile"><img alt="Профиль" src={settingsIcon}/><span>Профиль</span></NavLink></MenuItem> }
                </MenuList>
            </Nav> 
        </NavSection>
    )
}

export default SideNav