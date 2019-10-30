import React from 'react'
import styled from 'styled-components'

import sortIcon from './sort-icon.svg'
import filterIcon from './filter-icon.svg'

const BarSection = styled.div`

`

const InnerTopBar = ({titleText}) => {

    return (
        <BarSection>
           <h4>{titleText}</h4>
        </BarSection>
    )
}

export default InnerTopBar