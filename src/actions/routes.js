import {
    ROUTES_REQUESTED,
    ROUTE_CREATED, ROUTES_FETCHED,
    ROUTE_READ, ROUTE_UPDATED, ROUTE_DELETED
} from "./types";
import { returnErrors } from "./errors";
import axios from 'axios';

const setLoading = () => {
    return {
        type: ROUTES_REQUESTED
    };
};

export const createRoute = route => dispatch => {
    dispatch(setLoading());

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.post("/api/v1/routes", route, config)
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

export const fetchRoutes = () => dispatch => {
    dispatch(setLoading());

    axios.get("/api/v1/routes")
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

export const readRoute = id => dispatch => {
    dispatch(setLoading());

    axios.get(`/api/v1/routes/${id}`)
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

export const updateRoute = (id, route) => dispatch => {
    dispatch(setLoading());

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.put(`/api/v1/routes/${id}`, route, config)
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

export const deleteRoute = id => dispatch => {
    dispatch(setLoading());

    axios.delete(`/api/v1/routes/${id}`)
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