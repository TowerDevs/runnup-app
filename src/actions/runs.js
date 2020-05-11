import {
    RUNS_REQUESTED,
    RUN_CREATED, RUNS_FETCHED,
    RUN_READ, RUN_UPDATED, RUN_DELETED

} from "./types";
import { returnErrors } from "./errors";
import axios from 'axios';

const setLoading = () => {
    return {
        type: RUNS_REQUESTED
    };
};

export const createRun = run => dispatch => {
    dispatch(setLoading());

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.post("/api/v1/runs", run, config)
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

export const fetchRuns = () => dispatch => {
    dispatch(setLoading());

    axios.get("/api/v1/runs")
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

export const readRun = id => dispatch => {
    dispatch(setLoading());

    axios.get(`/api/v1/runs/${id}`)
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

export const updateRun = (id, run) => dispatch => {
    dispatch(setLoading());

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.put(`/api/v1/runs/${id}`, run, config)
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

export const deleteRun = id => dispatch => {
    dispatch(setLoading());

    axios.delete(`/api/v1/runs/${id}`)
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