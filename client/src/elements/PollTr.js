import styled from 'styled-components'

const PollTr = styled.tr`

    font-size: .85em;

    td {
        padding: 10px 0;
    }

    .poll_details {

        display: flex;
        align-items: center;
        
        img {
            width: 35px;
            border-radius: 50%;
            margin-right: 15px;
        }

        p {
            font-weight: bold;
        }
    }

    .rating {
        background-color: #353C64;
        color: white;
        border-radius: 100px;
        text-align: center;
        color: #C5C7CD;
        max-width: 60px;
        padding: 3px;
        font-size: .9em;
    }

    .create_dates {

        .create_time {
            color: #5F76FF;
            font-size: .9em; 
            margin-top: 5px;        
        }

    }

    .submenu {
        border: none;
        position: relative;
        text-align: center;


        div.toggle_btn {
            box-sizing: content-box;
            width: 25px;
            height: 25px;
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            transition: none;
            position: relative;
            z-index: 21;




            @media (pointer: fine) {

                transition: all .2s;

                &:hover {

                    background: #5F76FF;
                
                    img {
                        filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(5281%) hue-rotate(65deg) brightness(121%) contrast(109%);
                    }
                }
            }

        }


        div.menu_content {
            display: none;

            
            li {
                list-style: none;
            }

        }
    }



    &.active {

        div.toggle_btn {

                background: #5F76FF;
                
                img {
                    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(5281%) hue-rotate(65deg) brightness(121%) contrast(109%);
                }
            }

        .submenu {
            
            div.menu_content {
                display: block;
                position: absolute;
                background: #5F76FF;
                color: #EDEDED;
                z-index: 19;
                border-radius: 10px 0px 10px 10px;
                padding: 3px;

                left: -116px;
                bottom: -66px;




                li {
                    border-bottom: 1px solid #EDEDED;
                    padding: 3px 0;

                    &:last-child {
                        border-bottom: none;
                    }
                }

                @media screen and (max-width: 780px) {
                    border-radius: 0px 10px 10px 10px;
                    left: 35px;
                    bottom: -110px;

                    li {
                        padding: 7px 0;
                    }
                }

                @media screen and (max-width: 600px) {
                    left: 45px;
                    bottom: -120px;
                }

            }
        }

    }

`  
export default PollTr