
import { createStore, applyMiddleware } from 'redux'
import  thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import userReducer from './reducers/users.reducers'
import bookReducer from './reducers/books.reducers'
import loansReducer from './reducers/loans.redurer'

const appReducer = combineReducers({
    user: userReducer,
    books: bookReducer,
    loans: loansReducer
})

export const store = createStore(appReducer, applyMiddleware(thunk))