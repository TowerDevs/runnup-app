import {
    AUTH_ERROR,
    USER_REQUESTED, USER_LOADED,
    REGISTER_SUCCESS, REGISTER_FAILED,
    DEREGISTER_SUCCESS, DEREGISTER_FAILED,
    LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT_SUCCESS,
    EMAIL_TOKEN_SENT, EMAIL_TOKEN_ERROR, EMAIL_VERIFIED,
    PASSWORD_TOKEN_SENT, PASSWORD_TOKEN_ERROR, PASSWORD_TOKEN_VERIFIED,
    RegisterReq, LoginReq, TokenRes, UserRes, AuthActions
} from "../../types/Auth";
import tokenConfig, { Config } from "../../utils/tokenConfig";
import { returnErrors } from "../errors";
import axios, { AxiosResponse, AxiosError } from "axios";

/**
 * @desc Set the Auth branch to isLoading
 * @returns {Object} - loading async action type
 */
const setLoading = ():AuthActions => {
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
export const registerUser = (user: RegisterReq) => (
    dispatch: Function
):void => {
    const config: Config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.post<TokenRes>("/api/v1/users", user, config)
    .then((res: AxiosResponse<TokenRes>) => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) {
            dispatch(returnErrors(err.response.data, err.response.status, REGISTER_FAILED))
            dispatch({ type: AUTH_ERROR });
        } else if(err.request) {
            dispatch(returnErrors(err.request.data, err.request.status, REGISTER_FAILED));
            dispatch({ type: AUTH_ERROR });
        }

        dispatch(returnErrors("An internal error occurred", 500, REGISTER_FAILED));
        dispatch({ type: AUTH_ERROR });
    });
};

/**
 * @desc Delete the user's account
 * @param {function} dispatch - function for dispatching the action
 * @returns {Object} - returns the user's _id, name, email, etc.
 */
export const deleteUser = () => (
    dispatch: Function
):void => {
    axios.delete("/api/v1/users")
    .then(() => dispatch({
        type: DEREGISTER_SUCCESS
    }))
    .catch((err: AxiosError) => {
        if(err.response) {
            dispatch(returnErrors(err.response.data, err.response.status, DEREGISTER_FAILED))
            dispatch({ type: AUTH_ERROR });
        } else if(err.request) {
            dispatch(returnErrors(err.request.data, err.request.status, DEREGISTER_FAILED));
            dispatch({ type: AUTH_ERROR });
        }

        dispatch(returnErrors("An internal error occurred", 500, DEREGISTER_FAILED));
        dispatch({ type: AUTH_ERROR });
    });
};

export const loadUser = () => (
    dispatch: Function,
    getState: Function
):void => {
    dispatch(setLoading());

    axios.get<UserRes>("/api/v1/users", tokenConfig(getState))
    .then((res: AxiosResponse<UserRes>) => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) {
            dispatch(returnErrors(err.response.data, err.response.status, AUTH_ERROR))
            dispatch({ type: AUTH_ERROR });
        } else if(err.request) {
            dispatch(returnErrors(err.request.data, err.request.status, AUTH_ERROR));
            dispatch({ type: AUTH_ERROR });
        }

        dispatch(returnErrors("An internal error occurred", 500, AUTH_ERROR));
        dispatch({ type: AUTH_ERROR });
    });
};

/**
 * @desc Create a new access token for the user's login
 * @param  {Object} credentials - contains the email and password of the attempted login
 * @param {function} dispatch - function to dispatch the action
 * @returns {Object} - contains the newly created access token for the login
 */
export const loginUser = (credentials: LoginReq) => (
    dispatch: Function
):void => {
    const config: Config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.post<TokenRes>("/api/v1/users/access-token", credentials, config)
    .then((res: AxiosResponse<TokenRes>) => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) {
            dispatch(returnErrors(err.response.data, err.response.status, LOGIN_FAILED))
            dispatch({ type: AUTH_ERROR });
        } else if(err.request) {
            dispatch(returnErrors(err.request.data, err.request.status, LOGIN_FAILED));
            dispatch({ type: AUTH_ERROR });
        }

        dispatch(returnErrors("An internal error occurred", 500, LOGIN_FAILED));
        dispatch({ type: AUTH_ERROR });
    });
};

/**
 * @desc Delete the access token from asyncStorage and logout the user
 * @param {function} dispatch - function to dispatch the action Object
 * @returns {Object} - contains the action type
 */
export const logoutUser = () => (
    dispatch: Function
):void => {
    axios.delete("/api/v1/users/access-token")
    .then(() => dispatch({
        type: LOGOUT_SUCCESS
    }))
    .catch(() => {
        dispatch({ type: AUTH_ERROR });
    });
};

/**
 * @desc Send a token to the user's email to verify their email address
 * @param {function} dispatch - function to dispatch the action Object
 * @returns {Object} - contains the action type
 */
export const sendEmailToken = () => (
    dispatch: Function
):void => {
    axios.get("/v1/users/email/token")
    .then(() => dispatch({
        type: EMAIL_TOKEN_SENT
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, EMAIL_TOKEN_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, EMAIL_TOKEN_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, EMAIL_TOKEN_ERROR));
    });
};

/**
 * @desc Verify the email token sent to the user's email
 * @param {function} dispatch - function to dispatch the action Object
 * @returns {Object} - contains the action type
 */
export const verifyEmail = (token: string) => (
    dispatch: Function
):void => {
    axios.get(`/v1/users/email/token/${token}`)
    .then(() => dispatch({
        type: EMAIL_VERIFIED
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, EMAIL_TOKEN_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, EMAIL_TOKEN_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, EMAIL_TOKEN_ERROR));
    });
};

/**
 * @desc Send a token to the user's email to allow them to reset their password
 * @param {function} dispatch - function to dispatch the action Object
 * @returns {Object} - contains the action type
 */
export const requestNewPassword = () => (
    dispatch: Function
):void => {
    axios.get("/v1/users/password")
    .then(() => dispatch({
        type: PASSWORD_TOKEN_SENT
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, PASSWORD_TOKEN_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status,PASSWORD_TOKEN_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, PASSWORD_TOKEN_ERROR));
    });
};

/**
 * @desc Verify the token sent to the user's email for password reset
 * @param {function} dispatch - function to dispatch the action Object
 * @returns {Object} - contains the action type
 */
export const verifyPasswordToken = (token: string) => (
    dispatch: Function
):void => {
    axios.get(`/v1/users/password/${token}`)
    .then(() => dispatch({
        type: PASSWORD_TOKEN_VERIFIED
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, PASSWORD_TOKEN_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, PASSWORD_TOKEN_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, PASSWORD_TOKEN_ERROR));
    });
};