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

    div.options {

        max-width: 100%;
        min-width: 350px;
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
                    width: 100%;
                    font-size: .9em;
                    font-weight: bold;
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
            width: 100%;

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
            }

            &.day {

                width: 100px;
                
                input {
                    width: 50px;
                }
            }   

            &.month {
                margin: 0 70px;

                .wrapper {
                    position: relative;

                    p {
                        color: white;
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

                    }

                    ul {
                        width: 150px;
                        position: relative;
                        z-index: 5;
                        top: 0;
                        left: 0;
                        width: 150px;
                        display: flex;
                        flex-direction: column;
                        background-color: #8A9AF4;
                        padding-top: 40px;
                        top: -40px;
                        border-radius: 16px;
                        
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
`

export default QuestionStyled