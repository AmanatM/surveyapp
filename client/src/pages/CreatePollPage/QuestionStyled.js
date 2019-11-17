import styled from 'styled-components'


const QuestionStyled = styled.div`

    .question_types {
        margin-top: 20px;
        display: flex;
        align-items: center;

        p {
            margin-right: 15px;
            color: #5F76FF;
            font-weight: bold;
            margin-bottom: 10px;
        }

        ul {
            display: flex;
            align-items: center;

            li {
                list-style: none;
                margin: 0 10px;

                button {
                    background-color: #8A9AF4;
                    color: white;
                    font-weight: bold;
                    padding: 5px 15px;
                    font-size: .85em;
                    border-radius: 10px;

                    &.active {
                        background-color: #5F76FF;
                    }
                }
            }

            @media screen and (max-width: 540px) {
                flex-wrap: wrap;

                li {
                    width: 40%;
                    margin-bottom: 20px;
                }
            }   
        }
    }

    input.question_name {

        color: #6A6A6A;
        background: transparent;
        border: none;
        border-bottom: 1px solid #6A6A6A;
        display: block;
        width: 100%;
        font-size: 1.1em;
        padding-bottom: 10px;
        margin-bottom: 20px;
        margin-top: 20px;
        outline: none;
        &::placeholder {
            color: #6A6A6A;
        }
    }
`

export default QuestionStyled