import {
    ROUTES_REQUESTED, ROUTES_ERROR,
    ROUTE_CREATED, ROUTES_FETCHED,
    ROUTE_READ, ROUTE_UPDATED, ROUTE_DELETED,
    RouteReq, RouteRes, RouteActions
} from "./types";
import { tokenConfig } from "../../AuthManager";
import { returnErrors } from "../errors/actions";
import axios, { AxiosResponse, AxiosError } from "axios";

/**
 * @desc Set the Routes reducer to a loading state
 * @returns {Object} - contains the action type
 */
const setLoading = ():RouteActions => {
    return {
        type: ROUTES_REQUESTED
    };
};

/**
 * @desc Create a new route for the user
 * @param {Object} route - contains the new route properties
 * @param {function} dispatch - dispatch the action Object
 * @returns {Object} - contains the action type and server payload
 */
export const createRoute = (route: RouteReq) => (dispatch: Function):void => {
    dispatch(setLoading());

    axios.post<RouteRes>("/api/v1/routes", route, tokenConfig())
    .then((res: AxiosResponse<RouteRes>) => dispatch({
        type: ROUTE_CREATED,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, ROUTES_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, ROUTES_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, ROUTES_ERROR));
    });
};

/**
 * @desc Fetch a list of the user's routes
 * @param {function} dispatch - dispatch the action Object
 * @returns {Object} - contains the action type and server payload
 */
export const fetchRoutes = () => (dispatch: Function):void => {
    dispatch(setLoading());

    axios.get<RouteRes[]>("/api/v1/routes", tokenConfig())
    .then((res: AxiosResponse<RouteRes[]>) => dispatch({
        type: ROUTES_FETCHED,
        payload: res.data
    }))
    .catch((err: AxiosError)=> {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, ROUTES_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, ROUTES_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, ROUTES_ERROR));
    });
};

/**
 * @desc Return a single route to preview
 * @param {Object} _id - ObjectId of the route to return
 * @param {function} dispatch - dispatch the action Object
 * @returns {Object} - contains the action type and server payload
 */
export const readRoute = (_id: string) => (dispatch: Function,):void => {
    dispatch(setLoading());

    axios.get<RouteRes>(`/api/v1/routes/${_id}`, tokenConfig())
    .then((res: AxiosResponse<RouteRes>) => dispatch({
        type: ROUTE_READ,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, ROUTES_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, ROUTES_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, ROUTES_ERROR));
    });
};

/**
 * @desc Update an existing route
 * @param {Object} _id - ObjectId of the route to update
 * @param {Object} route - properties of the revised route
 * @param {function} dispatch - dispatch the action Object
 * @returns {Object} - contains the action type and server payload
 */
export const updateRoute = (_id: string, route: RouteReq) => (dispatch: Function,):void => {
    dispatch(setLoading());

    axios.put<RouteRes>(`/api/v1/routes/${_id}`, route, tokenConfig())
    .then((res: AxiosResponse<RouteRes>) => dispatch({
        type: ROUTE_UPDATED,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, ROUTES_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, ROUTES_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, ROUTES_ERROR));
    });
};

/**
 * @desc Delete an existing route
 * @param {Object} _id - ObjectId of the route to delete
 * @param {function} dispatch - dispatch the action Object
 * @returns {Object} - contains the action type and server payload
 */
export const deleteRoute = (_id: string) => (dispatch: Function):void => {
    dispatch(setLoading());

    axios.delete<string>(`/api/v1/routes/${_id}`, tokenConfig())
    .then(() => dispatch({
        type: ROUTE_DELETED,
        payload: _id
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, ROUTES_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, ROUTES_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, ROUTES_ERROR));
    });
};