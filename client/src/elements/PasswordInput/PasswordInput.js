import React, { useState } from 'react'
import styled from 'styled-components'


const Eye = styled.div`
    width: 20px;
    height: 20px;
    border: solid 2px #3E3E3E;
    border-radius:  75% 15%;
    position: relative;
    transform: rotate(45deg);
    pointer-events: none;
    transition: all .3s;

    &::before {
        content: '';
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border: solid 2px #3E3E3E;
        border-radius: 50%;
        left: 2px;
        top: 2px;
        opacity: 1;
        transition: all .3s;

    }

    &::after {
        content: '';
        display: block;
        position: absolute;
        width: 25px;
        height: 3px;
        transition: all .2s;
        background-color: #3E3E3E;
        right: -4px;
        top: 7px;
        transform: rotate(70deg);
        transition: all .2s;
        opacity: 0;
    }

    &.invisible {
        &:before {
            opacity: 0;
        }

        &:after {
            opacity: 1;
        }
    }
`


const PasswordVisibilityToggler = ({toggle, eyeClass}) => {

    return (
        <button onClick={toggle} aria-label="password visibiliy toggle">
            <Eye className={eyeClass}></Eye>
        </button>
    )
}

const PasswordContainer = styled.div`

    display: flex;
    align-items: center;
    max-width: 100%;


    input {
        flex: 80% 1 0;
        max-width: 80%;

        border-radius: 8px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border: none;
        height: ${props => props.height ? props.height : '40px'};
        outline: none;


        &::placeholder {
            color: ${props => props.placeholderColor ? props.placeholderColor : 'grey'}
        }
    }
    
    button {
        flex: 20% 0 1;

        -webkit-tap-highlight-color: rgba(0,0,0,0);
        outline: none;
        border-radius: 8px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        background-color: ${props => props.bgColor ? props.bgColor : 'white'};
        border: none;
        min-width: 45px;
        text-align: center;
        display: flex;
        justify-content: flex-end;
        padding-right: 15px;
        height: ${props => props.height ? props.height : '40px'};

    }
`

const PassWordInput = ({children, bgColor, placeholderColor, height, handleInput}) => {

    const [ visible, setVisible ] = useState(false)

    const toggle = (e) => {
        e.preventDefault()
        setVisible(!visible)
    }


    const eyeClass = visible ? '' : 'invisible'
    const inputType = visible ? 'text' : 'password'

    return (
        <PasswordContainer bgColor={bgColor} onChange={handleInput} placeholderColor={placeholderColor} height={height}>
            {React.cloneElement(children, {type: inputType})}<PasswordVisibilityToggler toggle={toggle} eyeClass={eyeClass}/>
        </PasswordContainer>
    )
}



export default PassWordInput