import {
    RUNS_REQUESTED,
    RUN_CREATED, RUNS_FETCHED,
    RUN_READ, RUN_UPDATED, RUN_DELETED
} from "../types";
import { returnErrors } from "../errors";
import { tokenConfig } from "./auth";
import axios from 'axios';

/**
 * @desc Sets the Run reducer state to "isLoading"
 * @returns {Object} - contains the action type
 */
const setLoading = () => {
    return {
        type: RUNS_REQUESTED
    };
};

/**
 * @desc Create a new run for the user
 * @param {Object} run - properties for the new Run
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const createRun = run => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/runs", run, tokenConfig(getState))
    .then(res => dispatch({
        type: RUN_CREATED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "RUNS_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "RUNS_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "RUNS_ERROR"));
    });
};

/**
 * @desc Fetch a list of the user's runs
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const fetchRuns = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/runs", tokenConfig(getState))
    .then(res => dispatch({
        type: RUNS_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "RUNS_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "RUNS_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "RUNS_ERROR"));
    });
};

/**
 * @desc Return a single run to preview
 * @param {string} id - ObjectId of the run to return
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const readRun = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/runs/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: RUN_READ,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "RUNS_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "RUNS_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "RUNS_ERROR"));
    });
};

/**
 * @desc Update an existing run
 * @param {string} id - ObjectId of the run to update
 * @param {function} dispatch - dispatch the action Object
 * @param {Object} run - properties of the revised run
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const updateRun = (id, run) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/runs/${id}`, run, tokenConfig(getState))
    .then(res => dispatch({
        type: RUN_UPDATED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "RUNS_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "RUNS_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "RUNS_ERROR"));
    });
};

/**
 * @desc Delete ane existing run
 * @param {string} id - ObjectId of the run to delete
 * @param {function} dispatch - dispatch the action Object
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const deleteRun = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/runs/${id}`, tokenConfig(getState))
    .then(() => dispatch({
        type: RUN_DELETED,
        payload: id
    }))
    .catch(err => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "RUNS_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "RUNS_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "RUNS_ERROR"));
    });
};