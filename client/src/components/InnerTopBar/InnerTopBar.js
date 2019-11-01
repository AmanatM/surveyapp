import React from 'react'
import styled from 'styled-components'

import sortIcon from './sort-icon.svg'
import filterIcon from './filter-icon.svg'



const BarSection = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 1060px)    {
        flex-wrap: wrap;
    }

    h4 {
        margin-right: 20px;
        white-space: nowrap;
    }
`

const HashField = styled.div`
    border: 2px solid #5F76FF;
    border-radius: 21px;
    display: flex;
    padding: 3px;
    margin-right: 20px;
    width: auto;
    flex: 30% 1 0;

    @media screen and (max-width: 1060px)    {
        flex: 100% 1 0;
        margin-top: 20px;
    }


    div {
        color: #5F76FF;
        border: 2px solid #5F76FF;
        border-radius: 54px;
        font-size: .8em;
        padding: 0 4px;
        margin-right: 4px;

        &:last-child {
            margin-right: 0;
        }
    }
`

const SearchBox = styled.div`

    flex: 30% 1 0;
    margin-right: 20px;


    form {
        height: 30px;
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
    }

    label {
        display: none;
        font-size: .8em;
        font-style: italic;
    }

    input {
        background-color: #DEDEDE;
        border: none;
        height: 100%;
        border-radius: 21px;
        width: 100%;
        padding-left: 15px;
        outline: none;
        border: 2px solid #5F76FF;

        &::placeholder {
            font-size: .8em;
            color: #6A6A6A;
        }
    }

    button {
        outline: none;
        height: 100%;
        background-color: #5F76FF;
        color: white;
        border-radius: 21px;
        position: absolute;
        right: 0;
        top: 0;
        font-size: .8em;
        padding: 5px 14px;

    }


    @media screen and (max-width: 1060px)    {
        flex: 100% 1 0;
        margin: 20px 0;
        flex-wrap: wrap;

        label {
            display: block;
            flex: 100% 1 0;
            margin-bottom: 5px;
        }

        input {


            &::placeholder {
                color: rgba(0, 0, 0, 0);
            }
        }

  
    }

`

const Filters = styled.div`

    display: flex;
    margin: auto;
    font-weight: bold;
    justify-content: center;
    font-size: .75em;

    .item {
        cursor: pointer;
        display: flex;

        img {
            margin-right: 4px;
        }
    }

    .sort {
        margin-right: 10px;
    }
`


const InnerTopBar = ({titleText}) => {

    return (
        
        <BarSection>
           <h4>{titleText}</h4>

           <HashField>
               <div>Отдых</div>
               <div>Мероприятие</div>
           </HashField>

            <SearchBox>
                <label htmlFor="searchPolls">Введи ник или тег . Например: @neobis или $tag</label>
                <form>
                    <input aria-label="Поиск" id="searchPolls" type="text" placeholder="Введи ник или тег . Например: @neobis или $tag"/>
                    <button>Поиск</button>
                </form>
            </SearchBox> 

            <Filters>
                <div className="item sort">
                    <img src={sortIcon}/><span>Сортировка</span>
                </div>

                <div className="item filter">
                    <img src={filterIcon}/><span>Фильтры</span>
                </div>
            </Filters>

        </BarSection>



    )
}

export default InnerTopBar