
import { createStore, applyMiddleware } from 'redux'
import  thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import userReducer from './reducers/users.reducers'
const appReducer = combineReducers({
    user: userReducer
})

export const store = createStore(appReducer, applyMiddleware(thunk))