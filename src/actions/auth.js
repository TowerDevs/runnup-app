import { AUTH_ERROR, USER_REQUESTED, USER_LOADED, REGISTER_SUCCESS, DEREGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./types";
import { returnErrors } from "./errors";
import axios from 'axios';

const setLoading = () => {
    return {
        type: USER_REQUESTED
    };
};

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

export const deleteUser = () => dispatch => {
    axios.delete("/api/v1/users")
    .then(() => dispatch({
        type: DEREGISTER_SUCCESS
    }))
    .catch(err => {
        if(err.response) {
            dispatch(returnErrors(err.response.data, err.response.status, "DEREGISTER_FAILED"))
            dispatch({ type: AUTH_ERROR });
        } else if(err.request) {
            dispatch(returnErrors(err.request.data, err.request.status, "DEREGISTER_FAILED"));
            dispatch({ type: AUTH_ERROR });
        }

        dispatch(returnErrors("An internal error occurred", 500, "DEREGISTER_FAILED"));
        dispatch({ type: AUTH_ERROR });
    });
};

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

export const logoutUser = () => dispatch => {
    axios.delete("/api/v1/users/access-token")
    .then(() => dispatch({
        type: LOGOUT_SUCCESS
    }))
    .catch(() => {
        dispatch({ type: AUTH_ERROR });
    });
};