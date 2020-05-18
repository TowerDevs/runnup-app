import {
    ROUTES_REQUESTED,
    ROUTE_CREATED, ROUTES_FETCHED,
    ROUTE_READ, ROUTE_UPDATED, ROUTE_DELETED
} from "../types";
import { returnErrors } from "../errors";
import { tokenConfig } from "./auth";
import axios from 'axios';

/**
 * @desc Set the Routes reducer to a loading state
 * @returns {Object} - contains the action type
 */
const setLoading = () => {
    return {
        type: ROUTES_REQUESTED
    };
};

/**
 * @desc Create a new route for the user
 * @param {Object} route - contains the new route properties
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const createRoute = route => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/routes", route, tokenConfig(getState))
    .then(res => dispatch({
        type: ROUTE_CREATED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "ROUTES_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "ROUTES_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "ROUTES_ERROR"));
    });
};

/**
 * @desc Fetch a list of the user's routes
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const fetchRoutes = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/routes", tokenConfig(getState))
    .then(res => dispatch({
        type: ROUTES_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "ROUTES_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "ROUTES_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "ROUTES_ERROR"));
    });
};

/**
 * @desc Return a single route to preview
 * @param {Object} id - ObjectId of the route to return
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const readRoute = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/routes/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: ROUTE_READ,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "ROUTES_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "ROUTES_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "ROUTES_ERROR"));
    });
};

/**
 * @desc Update an existing route
 * @param {Object} id - ObjectId of the route to update
 * @param {Object} route - properties of the revised route
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const updateRoute = (id, route) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/routes/${id}`, route, tokenConfig(getState))
    .then(res => dispatch({
        type: ROUTE_UPDATED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "ROUTES_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "ROUTES_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "ROUTES_ERROR"));
    });
};

/**
 * @desc Delete an existing route
 * @param {Object} id - ObjectId of the route to delete
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const deleteRoute = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/routes/${id}`, tokenConfig(getState))
    .then(() => dispatch({
        type: ROUTE_DELETED,
        payload: id
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "ROUTES_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "ROUTES_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "ROUTES_ERROR"));
    });
};