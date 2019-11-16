import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { changePage } from '../../reducers/currentPage'


import MainContainer from '../../elements/MainContainer'


const CreatePollPageSection = styled(MainContainer)`
    
`

const Form = styled.form`

`

const CreatePollPage = (props) => {

    useEffect(() => {
        props.changePage('Создать опрос')

        return () => {
            props.changePage('')
        }
    }, [])

    
    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <CreatePollPageSection>
            <Form onSubmit={handleSubmit}>
                
            </Form>
        </CreatePollPageSection>
    )
}

export default connect(null, { changePage })(CreatePollPage)