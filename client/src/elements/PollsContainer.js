import styled from 'styled-components'

const PollsContainer = styled.table`
    margin-top: 40px;
    width: 100%;
    border-collapse: collapse;

    th {
        text-align: left;
        border: none;
        color: #353C64;
        padding-bottom: 30px;
        font-size: .85em;
    }

    td {
        border: none
    }

    @media screen and (max-width: 820px) {
        table, thead, tbody, th, td, tr { 
            display: block; 
        }

        thead tr { 
            display: none;
        }

        tbody tr {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: flex-start;
            border-bottom: 1px solid #9e9e9e;
            padding: 20px 0;

            &:last-child {
            border-bottom: none;
        }

        }

        td:nth-of-type(5) { 
            order: -2;
            width: 20%;
        }

        td.poll_details {
            width: 79%;
            order: -1;
        }


        td:before { 
            display: block;
            white-space: nowrap;
            font-weight: bold;
            margin-bottom: 5px;
        }
        

        td:nth-of-type(2):before { content: "Пользователь: "; }
        td:nth-of-type(3):before { content: "Дата: "; }
        td:nth-of-type(4):before { content: "Рейтинг: "; }


    }

    @media screen and (max-width: 600px) {

        tbody tr {
            justify-content: center;
        }
        td {
            width: 100%;
        }

        div {
            display: inline-block;
        }

        .rating {
            padding: 5px 10px !important;
        }

        div.create_time {
            margin-left: 10px !important;
        }

        td:before { 
            display: inline-block;
            white-space: nowrap;
            font-weight: bold;
            margin-right: 15px;
            margin-bottom: 0;
        }
    }


`

export default PollsContainer