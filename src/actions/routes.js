import {
    
} from "./types";
import { routesRef } from "../config/firebase";


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

export const returnRoute = id => dispatch => {
    dispatch(setLoading());

};

export const updateRoute = (id, route) => dispatch => {
    dispatch(setLoading());

};

export const deleteRoute = id => dispatch => {
    dispatch(setLoading());

};