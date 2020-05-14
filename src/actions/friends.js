import {
    FRIENDS_REQUESTED,
    FRIEND_ADDED, FRIENDS_FETCHED,
    FRIEND_READ, FRIEND_ACCEPTED, FRIEND_DELETED
} from "./types";
import { returnErrors } from "./errors";
import { tokenConfig } from "./auth";
import axios from "axios";

/**
 * @desc Sets the friends reducer state to "Loading.."
 * @returns {Object} - contains the action type
 */
export const setLoading = () => {
    return {
        type: FRIENDS_REQUESTED
    };
};

/**
 * @desc Send a friend request to the designated email address
 * @param {Object} friend - new friend's info
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const sendFriendRequest = friend => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/friends", friend, tokenConfig(getState))
    .then(res => dispatch({
        type: FRIEND_ADDED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "FRIENDS_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "FRIENDS_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "FRIENDS_ERROR"));
    });
};

/**
 * @desc Retrieve a list of the user's friends
 * @param {function} dispatch - function to dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const fetchFriends = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/friends", tokenConfig(getState))
    .then(res => dispatch({
        type: FRIENDS_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "FRIENDS_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "FRIENDS_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "FRIENDS_ERROR"));
    });
};

/**
 * @desc Return the details of a user's friend
 * @param {string} id - the ObjectId of the specified friend
 * @param {function} dispatch - function to dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const readFriend = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/friends${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: FRIEND_READ,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "FRIENDS_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "FRIENDS_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "FRIENDS_ERROR"));
    });
};

/**
 * @desc Accept the friend request from the specified friend
 * @param {string} id - the ObjectId of the specified friend
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const acceptFriendRequest = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/friends${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: FRIEND_ACCEPTED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "FRIENDS_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "FRIENDS_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "FRIENDS_ERROR"));
    });
};

/**
 * @desc Delete the friend with the specified ObjectId
 * @param {string} id - the ObjectId of the specified friend
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const deleteFriend = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/friends${id}`, tokenConfig(getState))
    .then(() => dispatch({
        type: FRIEND_DELETED,
        payload: id
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "FRIENDS_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "FRIENDS_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "FRIENDS_ERROR"));
    });
};
