import {
    ROUTES_REQUESTED, ROUTES_ERROR,
    ROUTE_CREATED, ROUTES_FETCHED,
    ROUTE_READ, ROUTE_UPDATED, ROUTE_DELETED,
    RouteState, RouteActions
} from "../../types/routes";

const initialState = {
    isLoading: false,
    data: []
};

export default (state: RouteState = initialState, action: RouteActions) => {
    switch(action.type) {
        case ROUTES_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case ROUTES_ERROR:
            return {
                ...state,
                isLoading: false
            };
        case ROUTE_CREATED:
            return {
                ...state,
                isLoading: false,
                data: [...state.data, action.payload]
            };
        case ROUTES_FETCHED:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case ROUTE_READ:
            return {
                ...state,
                isLoading: false,
                data: state.data.map(route => {
                    const { _id } = action.payload;

                    if(route._id !== _id) return route;

                    return {
                        route: action.payload
                    };
                })
            };
        case ROUTE_UPDATED:
            return {
                ...state,
                isLoading: false,
                data: state.data.map(route => {
                    const { _id } = action.payload;

                    if(route._id !== _id) return route;

                    return {
                        ...state.data,
                        route: {

                        }
                    };
                })
            };
        case ROUTE_DELETED:
            return {
                ...state,
                isLoading: false,
                data: state.data.filter(route => route._id !== action.payload)
            };
        default:
            return state;
    }
};