import {
    RUNS_REQUESTED, RUNS_ERROR,
    RUN_CREATED, RUNS_FETCHED,
    RUN_READ, RUN_UPDATED, RUN_DELETED,
    RunReq, RunRes, RunActions
} from "./types";
import { returnErrors } from "../errors/actions";
import tokenConfig from "../../utils/tokenConfig";
import axios, { AxiosResponse, AxiosError } from "axios";

/**
 * @desc Sets the Run reducer state to "isLoading"
 * @returns {Object} - contains the action type
 */
const setLoading = ():RunActions => {
    return {
        type: RUNS_REQUESTED
    };
};

/**
 * @desc Create a new run for the user
 * @param {Object} run - properties for the new Run
 * @param {function} dispatch - dispatch the action Object
 * @returns {Object} - contains the action type and server payload
 */
export const createRun = (run: RunReq) => (dispatch: Function):void => {
    dispatch(setLoading());

    axios.post<RunRes>("/api/v1/runs", run, tokenConfig())
    .then((res: AxiosResponse<RunRes>) => dispatch({
        type: RUN_CREATED,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, RUNS_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, RUNS_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, RUNS_ERROR));
    });
};

/**
 * @desc Fetch a list of the user's runs
 * @param {function} dispatch - dispatch the action Object
 * @returns {Object} - contains the action type and server payload
 */
export const fetchRuns = () => (dispatch: Function):void => {
    dispatch(setLoading());

    axios.get<RunRes[]>("/api/v1/runs", tokenConfig())
    .then((res: AxiosResponse<RunRes[]>) => dispatch({
        type: RUNS_FETCHED,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, RUNS_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, RUNS_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, RUNS_ERROR));
    });
};

/**
 * @desc Return a single run to preview
 * @param {string} _id - ObjectId of the run to return
 * @param {function} dispatch - dispatch the action Object
 * @returns {Object} - contains the action type and server payload
 */
export const readRun = (_id: string) => (dispatch: Function):void => {
    dispatch(setLoading());

    axios.get<RunRes>(`/api/v1/runs/${_id}`, tokenConfig())
    .then((res: AxiosResponse<RunRes>) => dispatch({
        type: RUN_READ,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, RUNS_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, RUNS_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, RUNS_ERROR));
    });
};

/**
 * @desc Update an existing run
 * @param {string} _id - ObjectId of the run to update
 * @param {function} dispatch - dispatch the action Object
 * @param {Object} run - properties of the revised run
 * @param {function} getState - fetches the auth token from the reducer
 * @returns {Object} - contains the action type and server payload
 */
export const updateRun = (_id: string, run: RunReq) => (dispatch: Function,):void => {
    dispatch(setLoading());

    axios.put<RunRes>(`/api/v1/runs/${_id}`, run, tokenConfig())
    .then((res: AxiosResponse<RunRes>) => dispatch({
        type: RUN_UPDATED,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, RUNS_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, RUNS_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, RUNS_ERROR));
    });
};

/**
 * @desc Delete ane existing run
 * @param {string} _id - ObjectId of the run to delete
 * @param {function} dispatch - dispatch the action Object
 * @returns {Object} - contains the action type and server payload
 */
export const deleteRun = (_id: string) => (dispatch: Function,):void => {
    dispatch(setLoading());

    axios.delete<string>(`/api/v1/runs/${_id}`, tokenConfig())
    .then(() => dispatch({
        type: RUN_DELETED,
        payload: _id
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, RUNS_ERROR));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, RUNS_ERROR));

        dispatch(returnErrors("An internal error occurred", 500, RUNS_ERROR));
    });
};