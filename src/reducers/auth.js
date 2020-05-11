import {
    AUTH_ERROR,
    USER_REQUESTED, USER_LOADED,
    REGISTER_SUCCESS, REGISTER_FAILED,
    DEREGISTER_SUCCESS, DEREGISTER_FAILED,
    LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT_SUCCESS
} from "../actions/types";

const initialState = {
    // token: localStorage.getItem("token"), substitute for auth method being used
    isAuthenticated: null,
    isLoading: false,
    user: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                token: action.payload.token, // verify payload from backend
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case LOGOUT_SUCCESS:
        case DEREGISTER_SUCCESS:
        case DEREGISTER_FAILED:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
};