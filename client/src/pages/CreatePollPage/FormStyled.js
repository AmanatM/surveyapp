import styled from 'styled-components'


const FormStyled = styled.form`
    input.poll_name {
        color: #6A6A6A;
        background: transparent;
        border: none;
        border-bottom: 1px solid #6A6A6A;
        display: block;
        width: 100%;
        font-size: 1.4em;
        padding-bottom: 5px;
        margin-bottom: 20px;
        outline: none;

        &::placeholder {
            color: #6A6A6A;
        }
    }

    textarea.poll_description {
        font-family: inherit;
        color: #6A6A6A;
        border: none;
        background-color: #DEDEDE;
        border-radius: 10px;
        padding: 10px;
        width: 100%;
        font-size: .9em;
        outline: none;
        max-width: 100%;
        resize: none;
    }

    .question_numbers {

        position: absolute;
        bottom: 30px;
        left: 60px;
        width: 100%;

        @media screen and (max-width: 1000px){
            bottom: 60px;
            left: 20px;
        }

        ul {
            max-width: 100%;
            overflow-x: scroll;
            margin-right: 115px;
            height: 45px;
            display: flex;
            margin-right: 420px;


            @media screen and (max-width: 1000px) { 
                margin-right: 40px;
            }

            div.number_container {

                position: relative;
                display: flex;
                align-items: flex-end;
                margin-right: 13px;

                
                button.delete_question {
                        position: absolute;
                        top: 0px;
                        right: -7px;
                        width: 20px;
                        height: 20px;
                        color: white;
                        z-index: 999;
                        background-color: white;
                        border-radius: 50%;
                        display: none;


                        &.active {
                            display: block;
                        }   
                    }
            }

            li {
                cursor: pointer;
                list-style: none;
                background-color: rgba(95, 118, 255, 0.66);
                font-weight: bold;
                border-radius: 10px;
                position: relative;
                max-width: 35px;
                max-height: 35px;


    

                &.active {
                    background-color: #5F76FF;
                }

                button {
                    background-color: transparent;
                    color: white;
                    font-weight: bold;
                    font-size: 1em;
                    width: 35px;
                    min-width: 35px;
                    max-width: 35px;
                    min-height: 35px;
                    max-height: 35px;
                    height: 35px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 10px;
                    color: white;


                    &:focus {
                        background: #5F76FF;
                    }

                }
            }
        }
    }

    .save_buttons {
        position: absolute;
        bottom: 30px;
        right: 60px;

        @media screen and (max-width: 1000px){
            bottom: 12px;
            right: 20px;

        }

        button {
            color: white;
            border: none;
            border-radius: 10px;
            padding: 7px 2px;
            font-weight: bold;
            font-size: .85em;

            &.save_local {
                background-color: #ffc107;
                margin-right: 10px;
            }

            &.save {
                background-color: #29CC97;
            }
        }

    }

`

export default FormStyled