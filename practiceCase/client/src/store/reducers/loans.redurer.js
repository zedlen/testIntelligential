import { LOANS_LOADED, USER_LOANS_LOADED, CLEAR_LOANS } from "../constants";

const initialState = {
    loans:[],
    loaded: false,
    userLoans:[],
    userLoansLoaded: false    
}

const loansReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOANS_LOADED:
            return {
                ...state,
                loans: action.data,
                loaded: true
            }
        case USER_LOANS_LOADED:
            return { 
                ...state,
                userLoans: action.data,
                userLoansLoaded: true
            }
        case CLEAR_LOANS: {
            return {
                loans:[],
                loaded: false,
                userLoans: [],
                userLoansLoaded: false
            }
        }
        default:
            return state
    }
}

export default loansReducer