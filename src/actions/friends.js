import {
    FRIENDS_REQUESTED,
    FRIEND_ADDED, FRIENDS_FETCHED,
    FRIEND_READ, FRIEND_ACCEPTED, FRIEND_DELETED
} from "./types";
import { returnErrors } from "./errors";
import { tokenConfig } from "./auth";
import axios from "axios";

export const setLoading = () => {
    return {
        type: FRIENDS_REQUESTED
    };
};

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
