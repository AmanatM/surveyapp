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

    .loader {
        position: absolute;
        top: 0;
        left: 0;
    }
`

const Paginator = ({setLoading, count, offset, setOffset, getMyPollList, setPollList}) => {

    const [ pageLoading, setPageLoading ] = useState(false)
    
    
    const handleBackward = () => {


        if(offset > 0) {
            setPageLoading(true)
            setLoading(true)

            getMyPollList(offset - 7)
            .then((res) => {
                console.log(res)
                setLoading(false)
                setPageLoading(false)
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
            setPageLoading(true)
            getMyPollList()
    
    
            getMyPollList(offset + 7)
            .then((res) => {
                console.log(res)
                setPageLoading(false)
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
            
            <div className="data">{offset + 1} - {offset + 7} из {count}</div>

            <div className="buttons">
                <button disabled={pageLoading}> <img className="left" onClick={handleBackward} src={arrow_left}/></button>
                <button disabled={pageLoading}> <img className="right" onClick={handleForward} src={arrow_left}/></button>
            </div>

     
        </PaginatorStyled>
    )
}

export default Paginator