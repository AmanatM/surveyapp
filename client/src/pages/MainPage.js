import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


const MainPage = (props) => {

    if(!props.user) {

        return <Redirect to="/login"/>
        
    } else {
        return <Redirect to="/main/my-polls"/>
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, null)(MainPage))