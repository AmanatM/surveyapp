import React from 'react'
import styled from 'styled-components'
import sortIcon from '../../components/InnerTopBar/sort-icon.svg'

const BarSection = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    position: absolute;
    top: 5px;
    left: 20px;

    @media screen and (max-width: 1060px)    {
        flex-wrap: wrap;
    }

    h4 {
        margin-right: 20px;
        white-space: nowrap;
    }
`

const Filters = styled.div`

    display: flex;
    font-weight: bold;
    justify-content: flex-start;
    font-size: .75em;

    .item {
        cursor: pointer;
        display: flex;

        img {
            margin-right: 4px;
            transition: all .2s;
            
            &.descending {
                transform: rotate(180deg);
            }
        }
    }

    .sort {
        margin-right: 10px;
    }
`


const InnerTopBar = ({loading, sorting, setSorting}) => {


    const handleSorting = () => {
        if(!loading) {
            setSorting(sorting === 'descending' ? 'ascending' : 'descending')
        }
    }

    return (
        
        <BarSection>
            <Filters>
                <div onClick={handleSorting} className="item sort">
                    <img className={`${sorting}`} alt="Сортировка" src={sortIcon}/><span>Сортировка: {sorting === 'descending' ? 'Сначала новые' : 'Сначала старые'}</span>
                </div>
            </Filters>
        </BarSection>
    )
}

export default InnerTopBar