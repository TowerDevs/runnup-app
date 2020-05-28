import { ERRORS_RETURNED, ERRORS_LOGGED, ERRORS_CLEARED, Error, ErrorActions} from "./types";
import axios, { AxiosResponse, AxiosError } from "axios";

/**
 * @desc Show error details to user
 * @param  {string} message - error message
 * @param  {number} status - HTTP status code
 * @param  {string} id - error action type
 * @returns {Object} - error details for client/user
 */
export const returnErrors = (message: string, status: number, id: string | null = null): ErrorActions => {
    return {
        type: ERRORS_RETURNED,
        payload: { message, status, id }
    };
};

/**
 * @desc Log errors to the backend
 * @param  {Object} error - contains error properties
 * @param  {string} dispatch - function to dispatch action
 * @returns {string} - confirmation message from backend service
 */
export const logErrors = (error:Error) => (
    dispatch: Function
):void => {
    axios.post<Error>("/api/v1/errors", error)
    .then((res: AxiosResponse<Error>) => dispatch({
        type: ERRORS_LOGGED,
        payload: res.data
    }))
    .catch((err: AxiosError) => {
        if(err.response) dispatch(returnErrors(err.response.data, err.response.status, "LOGGING_ERROR"));

        else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, "LOGGING_ERROR"));

        dispatch(returnErrors("An internal error occurred", 500, "LOGGING_ERROR"));
    });
};

/**
 * @desc Clear errors from UI
 * @returns {Object} - contains action type
 */
export const clearErrors = ():ErrorActions => {
    return {
        type: ERRORS_CLEARED
    };
};