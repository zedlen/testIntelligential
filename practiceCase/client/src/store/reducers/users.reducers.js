import { USER_LOGGED, USER_PROFILE_LOADED, USER_NOT_LOGGED, USERS_LOADED, CLEAR_USERS } from "../constants";

const initialState = {
    token: null,
    isAuthenticated: false,
    permissions: [],
    name: null,
    tokenExp: null,
    load: true,
    usersList:[],
    usersLoaded: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED:
            return {
                ...state,
                isAuthenticated: true,
                token: action.token,
                load: false
            }
        case USER_PROFILE_LOADED:
            return {
                ...state,
                name: action.data.name,
                email: action.data.email,
                permissions: action.data.permissions,
                tokenExp: new Date(action.data.permissions * 1000)
            }
        case USER_NOT_LOGGED:
            return {
                ...state,
                load: false
            }
        case USERS_LOADED:
            return {
                ...state,
                usersList: action.data,
                usersLoaded: true
            }
        case CLEAR_USERS:
            return {
                ...state,
                usersList: [],
                usersLoaded: false
            }
        default:
            return state;
    }
}

export default userReducer;