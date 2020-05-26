import { ERRORS_RETURNED, ERRORS_LOGGED, ERRORS_CLEARED, ErrorState, ErrorActions } from "../types/Error";

const initialState = {
    message: null,
    status: null,
    id: null
};

export default (state: ErrorState = initialState, action: ErrorActions) => {
    switch(action.type) {
        case ERRORS_RETURNED:
            return {
                message: action.payload.message, // object is subject to api payload
                status: action.payload.status,
                id: action.payload.id
            };
        case ERRORS_LOGGED:
            return {
                message: action.payload
            };
        case ERRORS_CLEARED:
            return {
                message: null,
                status: null,
                id: null
            };
        default:
            return state;
    }
};