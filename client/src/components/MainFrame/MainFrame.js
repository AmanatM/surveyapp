import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import setMetaTheme from '../../utils/setThemeColor'

import { TransitionGroup, CSSTransition } from "react-transition-group"

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

import SideNav from '../SideNav/SideNav'
import TopPanel from '../TopPanel/TopPanel'

import MyPollsPage from '../../pages/MyPollsPage/MyPollsPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import AllPolls from '../../pages/AllPolls/AllPolls'
import CreatePollPage from '../../pages/CreatePollPage/CreatePollPage'
import TakePollPage from '../../pages/TakePollPage/TakePollPage'
import StatisticsPage from '../../pages/StatisticsPage/StatisticsPage'

import NotFound from '../../components/NotFound/NotFound'


import backgroundImg from './general-bg.jpg'

const MainFrameSection = styled.section`
    min-height: 100vh;
    display: flex;
    
`

const Content = styled.div`
    padding: 20px;
    background: url(${backgroundImg}) #324841;
    background-size: cover;
    background-position: center;
    width: 100%;

    @media screen and (max-width: 760px) {
        padding: 20px 10px;
    }

`

const Demo = ({text}) => (<div style={{color:'white', margin: '20px'}}>{text}</div>)

const MainFrame = (props) => {

    setMetaTheme('#283e37')

    return (
        <MainFrameSection>
            <SideNav/>
            <Content>
                <TopPanel/>

                    <Switch>
                        <Route exact path="/main/my-polls" render={() => <MyPollsPage/>}/>
                        <Route exact path="/main/all-polls" render={() => <AllPolls/>}/>
                        <Route exact path="/main/all-polls/:id" render={({match}) => <TakePollPage id={match.params.id}/>}/>
                        <Route exact path="/main/create-poll" render={() => <CreatePollPage/>}/>
                        <Route exact path="/main/statistics" render={() => <StatisticsPage/>}/>
                        <Route path="/main/profile" render={() => <ProfilePage/>}/>
                        <Route render={() => <NotFound windowed={true}/>}/>

                        {/* <Route path="/main/users" render={() => <Demo text="Users"/>}/> */}
                        {/* <Route path="/main/settings" render={() => <Demo text="Settings"/>}/> */}
                    </Switch>

            </Content>
        </MainFrameSection>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, null)(MainFrame))