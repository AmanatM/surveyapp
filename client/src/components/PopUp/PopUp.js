import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { notify } from '../../reducers/popUp'

const PopUpStyled = styled.div`

    width: 100%;
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
    min-height: 100px;
    bottom: 0;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: fixed;
    color: black;
    padding: 30px;
    z-index: 999999;
    box-shadow: 1px 2px 20px 0px rgba(0, 0, 0, 0.25);
    transition: all .4s;
    text-align: center;

    .close_btn {
        border: none;
        width: 40px;
        height: 40px;
        background-color: #616161;
        position: absolute;
        border-radius: 50%;
        top: 15px;
        right: 15px;
        padding: 0 5px;
        text-align: center;



        div {
            height: 2px;
            background-color: white;
            width: 80%;
            margin: 5px auto;

            &:first-child {
                transform: rotate(45deg) translate(3px, 2px);
            }

            &:last-child {
                transform: rotate(-45deg) translate(3px, -2px);
            }
        }
    }

    .confirmation_buttons {

        button {
            font-size: .85em;
            font-weight: bold;
            border: 2px solid grey;
            padding: 3px 5px;
            border-radius: 6px;
            margin: 20px 15px;
            background-color: #fff;
            transition: all .2s;

            &.ok {
                color: #29CC97;
                border: 2px solid #29CC97;

                &:hover {
                    color: white;
                    background-color: #29CC97;
                }
            }

            &.cancel {
                color: #ff5722;
                border: 2px solid #ff5722;

                &:hover {
                    color: white;
                    background-color: #ff5722;
                }
            }
        }

  
    }

    h4 {
        margin-bottom: 15px;
    }

    &.error {
        h4 {
            color: #ff5722;
        }
    }


    &.disappear {
        transition: all .2s;
        transform: translate(-50%, 100%);
    }


`


const PopUp = (props) => {

    const countDown = () => {
        let timer = setTimeout(() => {
            props.notify('')
        }, props.popUp.time)
    }

    const closePopUp = () => {
        props.notify('')
    }

    const handleOk = () => {
        props.popUp.ifOkFunction()

    }

    if(props.popUp.heading) {

        if(props.popUp.timed) {
            countDown()
        }

        return (
            <PopUpStyled className={props.popUp.type}>
                <button onClick={closePopUp} className="close_btn">
                    <div></div>
                    <div></div>
                </button>
                <h4>{props.popUp.heading}</h4>
                <p>{props.popUp.text}</p>

                {props.popUp.type === 'confirmation' ? (
                    <div className="confirmation_buttons">
                        <button onClick={handleOk} className="ok">{props.popUp.okButtonText || 'Продолжить'}</button>
                        <button onClick={closePopUp} className="cancel">{props.popUp.cancelButtonText || 'Отмена'}</button>
                    </div>
                ) : null}
            </PopUpStyled>
        )
        
    } else {
                
        return (
            <PopUpStyled className="disappear">

            </PopUpStyled>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        popUp: state.popUp
    }
}

export default connect(mapStateToProps, {notify})(PopUp)