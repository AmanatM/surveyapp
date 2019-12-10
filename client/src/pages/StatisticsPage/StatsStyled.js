import styled from 'styled-components'

const StatsStyled = styled.div`
    background-color: #fff;
    flex: 0 1 50%;
    display: flex;
    position: relative;
    overflow-y: scroll;
    height: 70vh;
    max-height: 70vh;

    .close_stats {
        display: none;
    }



    @media screen and (max-width: 980px) {

        .stats_content {
            background-color: #fff;
            position: fixed;
            height: 100vh;
            padding-top: 60px;
            padding-left: 15px;
            padding-right: 15px;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 999;
            color: white;
            background-color: rgba(0, 0, 0, .8);
            overflow-y: scroll;
            padding-bottom: 30px;
        }

        .inactive {
            color: white;
        }

        .close_stats {
            display: block;
            position: fixed;
            font-size: .9em;
            top: 30px;
            right: 17px;
            cursor: pointer;
            font-weight: bold;
            background-color: white;
            color: black;
            padding: 5px 10px;
            border-radius: 8px;
            box-shadow: 7px 4px 20px 0px rgba(0,0,0,.5);
            transition: all .2s;
            
            &:active {
                background-color: #9f9f9f;
            }

            @media (pointer: fine) {
                &:hover {
                    background-color: #d1d1d1;
                }
            }
        }

    }

    .inactive {
        margin: auto;
    }

    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }



    .stats_content {
        width: 100%;


        h5 {
            margin-bottom: 10px;
        }

        .info_box {
            background-color: #DEDEDE;
            width: 100%;
            padding: 15px;

            margin: 0 auto;

            li {
                list-style: none;
            }
        
        }

        .country {

            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;

            ul {

                margin-right: 20%;

                li {
                    list-style: none;
                    font-size: .9em;
                    color: #353C64;
                    font-weight: bold;
                    display: flex;
                    width: 150px;
                    margin: 10px 0;

                    .country_name {
                        margin-right: auto;
                    }
                }
            }

            .diagram {
                width: 150px;
            }
        }

        .age {
            margin-bottom: 20px;

            h5 {
                color: #353C64;
            }

            ul {

                li {
                    color: #4F4F4F;
                    font-size: .85em;
                    margin: 7px 0;
                }
            }
        }

        .gender {
            margin-bottom: 20px;

            .content {
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                max-width: 330px;

                .data_container {

                    display: flex;
                    justify-content: center;

                    .data {
                        color: white;
                        margin: 0 15px;
                        text-align: center;

                        h5 {
                            color: #353C64;
                            font-weight: bold;
                        }

                        .amount {
                            background-color: #454545;
                            width: 80px;
                            padding: 3px;
                            text-align: center;
                            margin: 0 auto;
                        }

                        .percent {
                            background-color: #717171;
                            width: 80px;
                            padding: 3px;
                            text-align: center;
                            margin: 0 auto;

                        }
                    }

                }

                .total {
                    width: 100%;
                    padding: 3px;

                    h5 {
                        text-align: center;
                        margin-top: 15px;
                        color: #353C64;
                    }

                    div {
                        background-color: #454545;
                        color: white;
                        text-align: center;
                    }
                }
            }
        }
    }
`
export default StatsStyled