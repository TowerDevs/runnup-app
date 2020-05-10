import {
    
} from "./types";

const setLoading = () => {
    return {
        type: ROUTES_REQUESTED
    };
};

export const createRoute = route => dispatch => {
    dispatch(setLoading());
};

export const fetchRoutes = () => dispatch => {
    dispatch(setLoading());
};

export const readRoute = id => dispatch => {
    dispatch(setLoading());
};

export const updateRoute = (id, route) => dispatch => {
    dispatch(setLoading());
};

export const deleteRoute = id => dispatch => {
    dispatch(setLoading());
};