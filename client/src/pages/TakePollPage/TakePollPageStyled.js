import styled from 'styled-components'

const TakePollPageStyled = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
    color: #6A6A6A;
    display: flex;
    flex-direction: column;
    align-items: center;

 

    .poll_heading {
        text-align: center;
        margin-bottom: 40px;
        padding-top: 40px;

    }

    .poll_author {
        position: absolute;
        top: 25px;
        left: 20px;
        color: #353C64;
        font-weight: bold;
    }

    .question_numbers {

        margin-bottom: 20px;
        width: 100%;

        ul {
            display: flex;
            overflow-x: scroll;
            max-width: 100%;
            justify-content: center;

            li {
                list-style: none;
                margin: 0 5px;

                button {
                    border-radius: 50%;
                    background-color: #8A9AF4;
                    color: white;
                    width: 35px;
                    min-width: 35px;
                    height: 35px;
                    font-size: 1em;
                    display: flex;
                    justify-content: center;
                    align-content: center;

                    &:focus {
                        background-color: #5F76FF;
                    }

                    &.active {
                        background-color: #5F76FF;
                    }
                }
            }
        }
    }

    .question_instructions {
        color: #828282;
        font-weight: bold;
        text-align: center;
    }

    .switch_buttons {

        position: absolute;
        bottom: 20px;

        button {
            padding: 5px 15px;
            font-weight: bold;
            font-size: .85em;
            color: white;
            border-radius: 21px;
            margin: 0 10px;
            transition: all .2s;

 
            &.prev {
                background-color: #CC9E29;
            }

            &.next {
                background-color: #5F76FF;
            }

            &.submit {
                background-color: #29CC97;
            }

            &:disabled {
                background-color: grey;
            }

        }
    }
`

export default TakePollPageStyled