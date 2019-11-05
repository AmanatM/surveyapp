import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import setMetaTheme from '../../utils/setThemeColor'

//import { TransitionGroup, CSSTransition } from "react-transition-group"

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

import SideNav from '../SideNav/SideNav'
import TopPanel from '../TopPanel/TopPanel'

import MyPollsPage from '../../pages/MyPollsPage/MyPollsPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'

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


/* 
        .fade-enter {
            opacity: 0.01;
        }

        .fade-enter.fade-enter-active {
            opacity: 1;
            transition: opacity 300ms ease-in;
        }

        .fade-exit {
            opacity: 1;
        }

        .fade-exit.fade-exit-active {
            opacity: 0.01;
            transition: opacity 300ms ease-in;
        } */

`

const Demo = ({text}) => (<div style={{color:'white', margin: '20px'}}>{text}</div>)

const MainFrame = (props) => {

    setMetaTheme('#283e37')



    return (
        <MainFrameSection>
            <SideNav/>
            <Content>
                <TopPanel/>

                {/* <section >
                    <TransitionGroup >
                        <CSSTransition key={location.key} timeout={{ enter: 300, exit: 300 }} classNames={'fade'}> */}
                            <Switch location={props.location}>

                                {/* {!props.user ? props.history.push('/login'): null} */}

                                <Route path="/main/my-polls" render={() => <MyPollsPage/>}/>
                                <Route path="/main/all-polls" render={() => <Demo text="All Polls"/>}/>
                                <Route path="/main/create-poll" render={() => <Demo text="Create Polls"/>}/>
                                <Route path="/main/statistics" render={() => <Demo text="Statistics"/>}/>
                                {/* <Route path="/main/users" render={() => <Demo text="Users"/>}/> */}
                                {/* <Route path="/main/settings" render={() => <Demo text="Settings"/>}/> */}
                                <Route path="/main/profile" render={() => <ProfilePage/>}/>

                                <Route render={() => <NotFound/>}/>

                            </Switch>
                        {/* </CSSTransition>
                    </TransitionGroup>
                </section> */}


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