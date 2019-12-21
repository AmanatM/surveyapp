import styled from 'styled-components'


export const TopPanelSection = styled.div`
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

export const SearchBox = styled.div`

    position: relative;
    z-index: 999;

    form {
        height: 30px;
        display: flex;
        align-items: center;
        width: 430px;
        position: relative;
    }

    .results {
        position: absolute;
        top: 17px;
        left: 0;
        z-index: -2;
        border-bottom-left-radius: 21px;
        border-bottom-right-radius: 21px;
        box-shadow: 2px 5px 15px 0px rgba(0, 0, 0, 0.58);
        background-color: #DEDEDE;
        width: 100%;
        padding: 15px;
        color: black;
        display: none;
        padding-top: 30px;

        &.active {
            display: block;
        }

        li {
            list-style: none;
            padding: 10px;
            font-weight: bold;
            cursor: pointer;
        }

        .close_btn {
            border: none;
            width: 40px;
            height: 40px;
            background-color: #616161;
            position: absolute;
            border-radius: 50%;
            top: 15px;
            right: 15px;
            padding: 0 5px;
            text-align: center;


            div {
                height: 2px;
                background-color: white;
                width: 100%;


                &:first-child {
                    transform: rotate(45deg) translate(6px, -6px);
                }

                &:last-child {
                    transform: rotate(-45deg) translate(-5px, -5px);
                }
            }
        }

    }

    input {
        background-color: #DEDEDE;
        border: none;
        height: 100%;
        border-radius: 21px;
        width: 100%;
        padding-left: 15px;
        padding-bottom: 0px;
        padding-top: 3px;
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
        display: flex;

        &:disabled {
            background-color: grey;
        }

        .loader {
            width: 50px;
            height: 50px;
            margin: auto;
            position: relative;
            top: -15px;
        }
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

export const Notification = styled.div`
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
        width: 100%;
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

export const Divider = styled.div`
    height: 30px;
    width: 1px;
    background-color: white;
    margin: 0 20px;

    @media screen and (max-width: 780px) {
        height: 40px;
        margin: 0;
    }
`

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    min-width: 150px;
    justify-content: flex-end;
    cursor: pointer;
    position: relative;
    z-index: 20;

    p {
        margin-right: 20px;
        margin-left: 20px;
    }

    img {
        width: 50px;
        border-radius: 50%;
        position: relative;
        z-index: 21;
        border: 5px solid transparent;
    }

    div.submenu {
        display: none;
    }

    &.active {

        img {
            border-color: #8A9AF4;
        }   

        div.submenu {
            display: block;
            position: absolute;
            background-color: #8A9AF4; 
            padding: 10px 15px;
            z-index: 15;
            border-radius: 20px 0px 20px 20px;
            bottom: -210%;
            right: 20px;
            text-align: center;

            li {
                list-style: none;
                margin: 13px 0;
            }
        }
    }

    @media screen and (max-width: 780px) {

        width: 40%;
        margin: 0;
        display: flex;
        min-width: 0;
        margin-left: auto;

        p {
            white-space: nowrap;
        }


        img {

        }

        &:hover {
            animation: none;
        }

        &.active { 

            div.submenu {
                padding: 20px;
                border-radius: 20px;
                right: -50px;
                transform: translateX(-50%);
                bottom: -120px;
                min-width: 155px;
                max-width: 160px;

            }

        }
    }

`