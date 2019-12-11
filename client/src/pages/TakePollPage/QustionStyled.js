import styled from 'styled-components'

const QuestionStyled = styled.div`
    margin-top: 20px;
    max-width: 100%;

    h1 {
        color: #5F76FF;
        margin-bottom: 15px;
        max-width: 100%;
        text-align: center;
    }

    & > div {
        
    }

    div.options {

        max-width: 100%;
        width: 350px;
        margin-top: 30px;

        ul {

            li {

                list-style: none;
                display: flex;
                justify-content: center;
                margin: 12px 0;
                width: 100%;

                button {
                    color: white;
                    background-color: #8A9AF4;
                    padding: 8px 15px;
                    border-radius: 10px;
                    max-width: 100%;
                    width: 100%;
                    font-size: .9em;
                    font-weight: bold;

                    &:active {
                        background: #5F76FF;
                    }

                    &.active {
                        background-color: #5F76FF; 
                    }
                }
            }
        }
    }

    div.text {
        margin-top: 30px;
        max-width: 400px;
        width: 100%;


        textarea {
            resize: none;
            background-color: #d2d2d2;
            border-radius: 10px;
            border: none;
            padding: 10px;
            font-size: .9em;
            outline: none;
            max-width: 100%;
            width: 400px;
            font-family: inherit;

            &::placeholder {
                color: #6A6A6A;

            }
        }

    }

    div.date {
        display: flex;
        max-width: 100%;

        div {
            display: flex;
            flex-direction: column;
            align-items: center;

            label {
                margin-bottom: 15px;
            }

            input {
                color: white;
                background-color: #828282;
                border: none;
                padding: 10px;
                outline: none;
                border-radius: 16px;
                height: 40px;
                font-weight: bold;
                text-align: center;

                &[type=number]::-webkit-inner-spin-button, 
                &[type=number]::-webkit-outer-spin-button { 
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    margin: 0; 
                }
            }

            &.day {

                width: 100px;

                label {
                    
                }
                input {
                    width: 50px;

                    @media screen and (max-width: 620px) {
                        width: 100%;
                    }
                }
            }   

            &.month {
                margin: 0 70px;

                @media screen and (max-width: 620px) {
                    margin: 0 10px;
                }

                .wrapper {
                    position: relative;
                    padding-bottom: 200px;

                    p {
                        color: white;
                        cursor: pointer;
                        background-color: #828282;
                        border: none;
                        padding: 10px 25px;
                        border-radius: 16px;
                        height: 40px;
                        font-weight: bold;
                        width: 150px;
                        text-align: center;
                        position: relative;
                        z-index: 10;

                        @media screen and (max-width: 620px) {
                            width: 110px;
                            padding: 10px 5px;
                        }

                    }

                    ul {
                        position: absolute;
                        width: 150px;
                        z-index: 5;
                        top: -100px;
                        left: 0;
                        width: 150px;
                        display: flex;
                        flex-direction: column;
                        background-color: #8A9AF4;
                        border-radius: 16px;
                        z-index: 999;
                        visibility: hidden;
                        transition: all .2s;
                        opacity: 0;

                        &.active {
                            visibility: visible;
                            opacity: 1;

                        }


                        @media screen and (max-width: 620px) {
                            width: 110px;
                        }
                        
                        li {

                            list-style: none;
                            width: 100%;

                            button {    
                                background-color: #8A9AF4;
                                color: white;
                                width: 100%;
                                font-size: .9em;
                                font-weight: bold;
                                padding: 5px 0;


                                &:focus {
                                    background-color: #5F76FF;
                                }

                            }


                            &:last-of-type {

                                button {
                                    border-bottom-left-radius: 16px;
                                    border-bottom-right-radius: 16px;
                                }
                                   
                            }

                            &:first-of-type {
                                button {
                                    border-top-left-radius: 16px;
                                    border-top-right-radius: 16px;
                                }
                            }
                        }
                    }

                }


            }

            &.year {

                width: 100px;

                input {
                    width: 100%;
                }
            }

        }

    }

    div.time {
        display: flex;
        justify-content: center;
        align-items: center;

        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            margin: 0; 
        }

        .divider {
            font-size: 2em;
            font-weight: bold;
            margin: 0 10px;
            padding-bottom: 5px;
        }

        .time_item {

            input {
                color: white;
                background-color: #828282;
                border: none;
                padding: 10px;
                max-width: 100%;
                width: 50px;
                outline: none;
                border-radius: 10px;
                font-weight: bold;
                text-align: center;

                &::placeholder {
                    color: #cbcbcb;
                }
            }

        }


    }
`

export default QuestionStyled