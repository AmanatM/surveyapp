import styled from 'styled-components'

const StatsStyled = styled.div`
    background-color: #fff;
    flex: 0 1 50%;
    display: flex;
    position: relative;



    @media screen and (max-width: 980px) {

        .stats_content {
            background-color: #fff;
            position: absolute;
            top: -20%;
            left: 0;
            width: 100%;
            z-index: 999;
            color: white;
            background-color: rgba(0, 0, 0, .6);

        }

        .inactive {
            color: white;
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

            ul {

                li {
                    color: #4F4F4F;
                    font-size: .85em;
                    margin: 7px 0;
                }
            }
        }

        .gender {

        }
    }
`
export default StatsStyled