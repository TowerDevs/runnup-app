/* actions */
export const ROUTES_REQUESTED = "ROUTES_REQUESTED";
export const ROUTES_ERROR = "ROUTES_ERROR";
export const ROUTE_CREATED = "ROUTE_CREATED";
export const ROUTES_FETCHED = "ROUTES_FETCHED";
export const ROUTE_READ = "ROUTE_READ";
export const ROUTE_UPDATED = "ROUTE_UPDATED";
export const ROUTE_DELETED = "ROUTE_DELETED";

/* model interface */
export interface RouteReq {

};

export interface RouteRes {
    _id: string
    name: string,
    distance: number,
    duration: number,
    pace: number,
    calories: number
};

/* state interface */
export interface RouteState {
    isLoading: boolean;
    data: RouteRes[]
};

/* action interfaces */
interface loadRouteAction {
    type: typeof ROUTES_REQUESTED;
};

interface errorRouteAction {
    type: typeof ROUTES_ERROR;
};

interface createRouteAction {
    type: typeof ROUTE_CREATED,
    payload: RouteRes
};

interface fetchRoutesAction {
    type: typeof ROUTES_FETCHED,
    payload: RouteRes[]
};

interface readRouteAction {
    type: typeof ROUTE_READ,
    payload: RouteRes
};

interface updateRouteAction {
    type: typeof ROUTE_UPDATED,
    payload: RouteRes
};

interface deleteRouteAction {
    type: typeof ROUTE_DELETED,
    payload: string
};

/* Aggregated action interface */
export type RouteActions =
    loadRouteAction |
    errorRouteAction |
    createRouteAction |
    fetchRoutesAction |
    readRouteAction |
    updateRouteAction |
    deleteRouteAction;