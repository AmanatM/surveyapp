import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


import userReducer from './reducers/user'
import currentPage from './reducers/currentPage'

const reduce_all = combineReducers({
    user: userReducer,
    currentPage: currentPage
})

const store = createStore(reduce_all, composeWithDevTools(applyMiddleware(thunk)))

export default store