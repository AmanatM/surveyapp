import styled from 'styled-components'


const PollListStyled = styled.div`
    background-color: #fff;
    flex: 1 0 50%;
    max-height: 70vh;
    height: 70vh;
    margin-right: 20px;
    overflow-y: scroll;

    @media screen and (max-width: 980px) {
        margin-right: 0;
        background-color: #EDEDED;
    }

    @media screen and (max-width: 650px) {

    }



    table {
        width: 100%;
        border-collapse: collapse;

        thead {
            td {
                color: #353C64;
                font-weight: bold;
                padding: 0 10px;
                padding-bottom: 20px;
                font-size: .85em;
                text-align: center;

                &:first-child {
                    text-align: left;
                }
            }
        }

        tbody {

            tr {
                height: 10px;
                cursor: pointer;
                transition: all .2s;
                outline: none;

                &.active {
                    background-color: #DEDEDE;
                }

                &:focus {
                    background-color: #DEDEDE;
                }

                @media (pointer: fine) {
                    &:hover {
                        background-color: #DEDEDE;
                    }
                }
               

                td {
                    font-size: .85em;
                    color: #1488C8;
                    text-align: center;
                    padding: 7px 10px;



                    &.name {
                        color: #00AC65;    
                        font-weight: bold; 
                        width: 50%;   
                        text-align: left;
                    }
                }
            }

        }
    }

`

export default PollListStyled