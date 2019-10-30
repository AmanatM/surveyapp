import React from 'react'
import styled from 'styled-components'

import notificationIcon from './notification-icon.svg'
import profilePhoto from './demo-profile-img.jpg'

const TopPanelSection = styled.div`
    color: white;
    display: flex;
    align-items: center;

    h3 {
        margin-right: auto;
    }

    @media screen and (max-width: 950px) {
        h3 {
            margin-right: 20px;
        }
    }

    @media screen and (max-width: 780px) {

        h3 {
            width: 100%;
            order: 3;
            margin-top: 30px;
        }

        flex-wrap: wrap;
        justify-content: space-between;
    }
`

const SearchBox = styled.div`

    form {
        height: 30px;
        display: flex;
        align-items: center;
        width: 430px;
        position: relative;
    }

    input {
        background-color: #DEDEDE;
        border: none;
        height: 100%;
        border-radius: 21px;
        width: 100%;
        padding-left: 15px;
        padding-bottom: 3px;
        outline: none;

        &::placeholder {
            font-size: .8em;
            color: #6A6A6A;
        }


    }

    button {
        outline: none;
        height: 100%;
        background-color: #5F76FF;
        color: white;
        border-radius: 21px;
        position: absolute;
        right: 0;
        top: 0;
        font-size: .8em;
        padding: 5px 14px;

    }

    @media screen and (max-width: 950px) {
        
        margin-right: auto;
        width: 100%;


        form {
            width: auto;
        }
    }

    @media screen and (max-width: 780px) {

        width: 100%;
        order: 1;
        margin-top: 30px;
    }

`

const Notification = styled.div`
    margin-left: 45px;
    transform-origin: 50% 0;
    cursor: pointer;
    margin-right: 10px;

    img {
        min-width: 15px;
        width: 15px;
    }

    @keyframes notification {
        0% {
            transform: rotate(10deg);
        }

        30% {
            transform: rotate(-10deg);
        }

        60% {
            transform: rotate(10deg);
        }

        80% {
            transform: rotate(-10deg);
        }

        100% {
            transform: rotate(0);
        }
    }

    &:hover {
        animation: notification .5s;
    }

    @media screen and (max-width: 780px) {
        width: 40%;
        margin: 0;
        display: flex;
        


        img {
            margin: auto;
            min-width: 25px;
        }

        &:hover {
            animation: none;
        }
    }
`

const Divider = styled.div`
    height: 30px;
    width: 1px;
    background-color: white;
    margin: 0 20px;

    @media screen and (max-width: 780px) {
        height: 40px;
        margin: 0;
    }
`

const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    min-width: 150px;
    justify-content: flex-end;

    p {
        margin-right: 20px;
    }

    img {
        width: 33px;
        border-radius: 50%;
    }

    @media screen and (max-width: 780px) {

        width: 40%;
        margin: 0;
        display: flex;
        min-width: 0;

        p {
            display: none;
        }

        img {
            margin: auto;
        }

        &:hover {
            animation: none;
        }
    }

`

const TopPanel = () => {

    return (
        <TopPanelSection>
            <h3>Опросы</h3>

            <SearchBox>
                <form>
                    <input aria-label="Поиск" type="text" placeholder="Искать. Введите запрос или тег"/>
                    <button>Поиск</button>
                </form>
            </SearchBox>

            <Notification>
                <img src={notificationIcon}/>
            </Notification>

            <Divider/>

            <Profile>
                <p>Нео Бисов</p>
                <img alt="Фото профиля" src={profilePhoto}/>
            </Profile>

        </TopPanelSection>
    )
}

export default TopPanel