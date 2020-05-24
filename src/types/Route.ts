/* actions */
export const ROUTES_REQUESTED = "ROUTES_REQUESTED";
export const ROUTES_ERROR = "ROUTES_ERROR";
export const ROUTE_CREATED = "ROUTE_CREATED";
export const ROUTES_FETCHED = "ROUTES_FETCHED";
export const ROUTE_READ = "ROUTE_READ";
export const ROUTE_UPDATED = "ROUTE_UPDATED";
export const ROUTE_DELETED = "ROUTE_DELETED";

/* model interface */
export interface Route {
    _id: string
    name: string,
    distance: number,
    duration: number,
    pace: number,
    calories: number
};

/* action interfaces */
export interface createRouteAction {
    type: typeof ROUTE_CREATED,
    payload: Route
}

export interface fetchRoutesAction {
    type: typeof ROUTES_FETCHED,
    payload: Route[]
};

export interface readRouteAction {
    type: typeof ROUTES_FETCHED,
    payload: Route
};

export interface updateRouteAction {
    type: typeof ROUTES_FETCHED,
    payload: Route
};

export interface deleteRouteAction {
    type: typeof ROUTES_FETCHED,
    payload: string
};

/* Aggregated action interface */
export type RouteActions =
    createRouteAction |
    fetchRoutesAction |
    readRouteAction |
    updateRouteAction |
    deleteRouteAction;