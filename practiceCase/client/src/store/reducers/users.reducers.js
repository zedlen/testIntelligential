import { USER_LOGGED, USER_PROFILE_LOADED } from "../constants";

const initialState = {
    token: null,
    isAuthenticated: false,
    permissions: [],
    name: null,
    tokenExp: null  
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED:
            return {
                ...state,
                isAuthenticated: true,
                token: action.token
            }
        case USER_PROFILE_LOADED:
            return {
                ...state,
                name: action.data.name,
                permissions: action.data.permissions,
                tokenExp: new Date(action.data.permissions * 1000)
            }
        default:
            return state;
    }
}

export default userReducer;