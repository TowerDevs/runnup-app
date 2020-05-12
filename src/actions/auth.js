import { AUTH_ERROR, USER_REQUESTED, USER_LOADED, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./types";
import { returnErrors } from "./errors";
import axios from 'axios';

/**
 * @desc Set the Auth branch to isLoading
 * @returns {Object} - loading async action type
 */
const setLoading = () => {
    return {
        type: USER_REQUESTED
    };
};

/**
 * @desc Create a new user account
 * @param  {Object} user - contains the user's name, email, and password
 * @param {function} dispatch - function to dispatch the action
 * @returns {Object} - the new User and the access token for automatic login upon registration
 */
export const registerUser = user => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.post("/api/v1/users", user, config)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAILED"))
            dispatch({ type: AUTH_ERROR });
        } else if(err.request) {
            dispatch(returnErrors(err.request.data, err.request.status, "REGISTER_FAILED"));
            dispatch({ type: AUTH_ERROR });
        }

        dispatch(returnErrors("An internal error occurred", 500, "REGISTER_FAILED"));
        dispatch({ type: AUTH_ERROR });
    });
};

/**
 * @desc Fetch the user's primary details
 * @param {function} dispatch - function for dispatching the action
 * @returns {Object} - returns the user's _id, name, email, etc.
 */
export const loadUser = () => dispatch => {
    dispatch(setLoading());

    axios.get("/api/v1/users")
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(returnErrors(err.response.data, err.response.status, "AUTH_ERROR"))
            dispatch({ type: AUTH_ERROR });
        } else if(err.request) {
            dispatch(returnErrors(err.request.data, err.request.status, "AUTH_ERROR"));
            dispatch({ type: AUTH_ERROR });
        }

        dispatch(returnErrors("An internal error occurred", 500, "AUTH_ERROR"));
        dispatch({ type: AUTH_ERROR });
    });
};

/**
 * @desc Create a new access token for the user's login
 * @param  {Object} credentials - contains the email and password of the attempted login
 * @param {function} dispatch - function to dispatch the action
 * @returns {Object} - contains the newly created access token for the login
 */
export const loginUser = credentials => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.post("/api/v1/users/access-token", credentials, config)
    .then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAILED"))
            dispatch({ type: AUTH_ERROR });
        } else if(err.request) {
            dispatch(returnErrors(err.request.data, err.request.status, "LOGIN_FAILED"));
            dispatch({ type: AUTH_ERROR });
        }

        dispatch(returnErrors("An internal error occurred", 500, "LOGIN_FAILED"));
        dispatch({ type: AUTH_ERROR });
    });
};

/**
 * @desc Delete the access token from asyncStorage and logout the user
 * @param {function} dispatch - function to dispatch the action Object
 * @returns {Object} - contains the action type
 */
export const logoutUser = () => dispatch => {
    axios.delete("/api/v1/users/access-token")
    .then(() => dispatch({
        type: LOGOUT_SUCCESS
    }))
    .catch(() => {
        dispatch({ type: AUTH_ERROR });
    });
};