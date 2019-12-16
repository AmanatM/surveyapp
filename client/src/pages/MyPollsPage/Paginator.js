import React, { useState } from 'react'
import styled from 'styled-components'
import arrow_left from '../../assets/imgs/arrow_left.svg'


const PaginatorStyled = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    align-items: center;
    position: absolute;
    bottom: 10px;
    right: 20px;

    .data {
        margin-right: 10px;
    }

    .buttons {

        display: flex;

        button {
            border-radius: 50%;
            width: 35px;
            height: 35px;
            background: transparent;

            img {
                padding: 5px;
                cursor: pointer;

                &.right {
                    transform: scaleX(-1);
                }

            }


            &:hover {
                background-color: #5F76FF;
                
                img {
                    filter: brightness(0) invert(1);
                }
            } 

            &:disabled:hover {
                
                background-color: grey;
                cursor: not-allowed;
                
                
            }

        }

        

    }
`

const Paginator = ({count, offset, setOffset, getMyPollList, setPollList}) => {

    const [ loading, setLoading ] = useState(false)
    
    
    const handleBackward = () => {

        //setLoading(true)

        if(offset > 0) {

            getMyPollList(offset - 7)
            .then((res) => {
                console.log(res)
                setLoading(false)
                setPollList(res.results)
                setOffset(offset - 7)
    
            })
            .catch((err) => {
                console.log(err)
            })
        }

    }

    const handleForward = () => {

        if(offset + 7 < count) {
            setLoading(true)
            getMyPollList()
    
    
            getMyPollList(offset + 7)
            .then((res) => {
                console.log(res)
                setLoading(false)
                setPollList(res.results)
                setOffset(offset + 7)

            })
            .catch((err) => {
                console.log(err)
            })
        }
        

    }

    return (
        <PaginatorStyled>
            <div className="data">{offset} - {offset + 7} из {count}</div>

            <div className="buttons">
                <button disabled={loading}> <img className="left" onClick={handleBackward} src={arrow_left}/></button>
                <button disabled={loading}> <img className="right" onClick={handleForward} src={arrow_left}/></button>
            </div>

     
        </PaginatorStyled>
    )
}

export default Paginator