import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
    text-align: center;
    padding: 20px 0;
    width: 100%;
    
    ul {
        display: flex;
        justify-content: center;

        li {
            list-style: none;
            font-weight: bold;
            font-size: .8em;
            margin: 0 10px;
            a.green {
                color: #29CC97;
                text-decoration: none;
            }
        }
    }

`

const PageFooter = () => {
    return (
        <Footer>
            <ul>
                <li><a href="https://neobis.kg" className="green">Neobis.kg</a></li>
                <li>ASU design</li>
                <li>2019</li>
            </ul>
        </Footer>
    )
}

export default PageFooter