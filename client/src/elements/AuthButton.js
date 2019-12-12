import styled from 'styled-components'

let AuthButton = styled.button`
    background-color: grey;
    background-color: ${props => props.red ? '#FF473A' : '#3a71ff'};
    color: white;
    font-size: inherit;
    color: white;
    padding: 10px;
    font-size: 14px;
    justify-content: center;
    display: flex;
    align-items: center;
    margin: 2px 0;
    border-radius: 0px;

    &:disabled {
        background: grey;
        cursor: not-allowed;
    }
`

export default AuthButton