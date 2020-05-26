import { BOOKS_LOADES, BOOK_SELECTED, BOOK_LOADED, BOOK_UPDATED, BOOK_CLEAR_SELECTED, CLEAR_BOOKS } from "../constants";

const initialState = {
    books: [],
    loaded: false,
    bookDetail: {
        name: "",
        author: "",
        editorial: "",
        publishDate: "",
        availableCopies: 0,
        description: "",
        loaded: false
    }
}

const bookReducer = ( state = initialState, action) => {
    switch (action.type) {
        case BOOKS_LOADES:
            return {
                ...state,
                books: action.data,
                loaded: true
            }
        case BOOK_SELECTED:
            return {
                ...state,
                bookDetail:{
                    ...initialState.bookDetail,
                    ...action.data,
                    loaded: true
                }
            }
        case BOOK_LOADED:
            return {
                ...state,
                bookDetail:{
                    ...initialState.bookDetail,
                    ...action.data,
                    loaded: true
                }
            }
        case BOOK_UPDATED:
            return {
                ...state,
                bookDetail:{
                    ...initialState.bookDetail,
                    ...action.data,
                    loaded: true
                }
            }
        case BOOK_CLEAR_SELECTED:
            return {
                ...state,
                bookDetail:{
                    ...initialState.bookDetail,                    
                }
            }
        case CLEAR_BOOKS:
            return{
                ...state,
                books: [],
                loaded: false
            }
        default:
            return state;
    }
}

export default bookReducer