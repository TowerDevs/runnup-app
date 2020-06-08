import {
    FRIENDS_REQUESTED, FRIENDS_ERROR,
    FRIEND_ADDED, FRIENDS_FETCHED,
    FRIEND_READ, FRIEND_ACCEPTED, FRIEND_DELETED,
    FriendReq, FriendRes, FriendActions
} from "./types";
import tokenConfig from "../../utils/tokenConfig";
import { returnErrors } from "../errors/actions";
import axios, { AxiosResponse, AxiosError } from "axios";

/**
 * @desc Sets the friends reducer state to "Loading.."
 * @returns {Object} - contains the action type
 */
const setLoading = ():FriendActions => {
    return {
        type: FRIENDS_REQUESTED
    };
};

/**
 * @desc Send a friend request to the designated email address
 * @param {Object} friend - new friend's info
 * @param {function} dispatch - dispatch the action Object to the redux store
 * @returns {Object} - contains the action type and server payload
 */
export const sendFriendRequest = (friend: FriendReq) => (dispatch: Function):void => {
    dispatch(setLoading());

    axios.post<FriendRes>("/api/v1/friends", friend, tokenConfig())
    .then((res: AxiosResponse<FriendRes>) => dispatch({
        type: FRIEND_ADDED,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, FRIENDS_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, FRIENDS_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, FRIENDS_ERROR));
    });
};

/**
 * @desc Retrieve a list of the user's friends
 * @param {function} dispatch - dispatch the action Object to the redux store
 * @returns {Object} - contains the action type and server payload
 */
export const fetchFriends = () => (dispatch: Function):void => {
    dispatch(setLoading());

    axios.get<FriendRes[]>("/api/v1/friends", tokenConfig())
    .then((res: AxiosResponse<FriendRes[]>) => dispatch({
        type: FRIENDS_FETCHED,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, FRIENDS_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, FRIENDS_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, FRIENDS_ERROR));
    });
};

/**
 * @desc Return the details of a user's friend
 * @param {string} _id - the ObjectId of the specified friend
 * @param {function} dispatch - dispatch the action Object to the redux store
 * @returns {Object} - contains the action type and server payload
 */
export const readFriend = (_id: string) => (dispatch: Function):void => {
    dispatch(setLoading());

    axios.get(`/api/v1/friends${_id}`, tokenConfig())
    .then((res: AxiosResponse<FriendRes>) => dispatch({
        type: FRIEND_READ,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, FRIENDS_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, FRIENDS_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, FRIENDS_ERROR));
    });
};

/**
 * @desc Accept the friend request from the specified friend
 * @param {string} _id - the ObjectId of the specified friend
 * @param {function} dispatch - dispatch the action Object to the redux store
 * @returns {Object} - contains the action type and server payload
 */
export const acceptFriendRequest = (_id: string) => (dispatch: Function,):void => {
    dispatch(setLoading());

    axios.put<string>(`/api/v1/friends${_id}`, tokenConfig())
    .then(res => dispatch({
        type: FRIEND_ACCEPTED,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, FRIENDS_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, FRIENDS_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, FRIENDS_ERROR));
    });
};

/**
 * @desc Delete the friend with the specified ObjectId
 * @param {string} _id - the ObjectId of the specified friend
 * @param {function} dispatch - dispatch the action Object to the redux store
 * @returns {Object} - contains the action type and server payload
 */
export const deleteFriend = (_id: string) => (dispatch: Function,):void => {
    dispatch(setLoading());

    axios.delete<string>(`/api/v1/friends${_id}`, tokenConfig())
    .then(() => dispatch({
        type: FRIEND_DELETED,
        payload: _id
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, FRIENDS_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, FRIENDS_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, FRIENDS_ERROR));
    });
};
