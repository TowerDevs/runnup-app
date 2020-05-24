export const RUNS_REQUESTED = "RUNS_REQUESTED";
export const RUNS_ERROR = "RUNS_ERROR";
export const RUN_CREATED = "RUN_CREATED";
export const RUNS_FETCHED = "RUNS_FETCHED";
export const RUN_READ = "RUN_READ";
export const RUN_UPDATED = "RUN_UPDATED";
export const RUN_DELETED = "RUN_DELETED";

/* model interface */
export interface Run {
    _id: string,
    timestamp: number, // convert to date on the UI
    route: string,
    avgPace: number,
    totalTime: number,
    distanceRan: number
};

/* action interfaces */
export interface createRunAction {
    type: typeof RUN_CREATED,
    payload: Run
}

export interface fetchRunsAction {
    type: typeof RUNS_FETCHED,
    payload: Run[]
};

export interface readRunAction {
    type: typeof RUN_READ,
    payload: Run
};

export interface updateRunAction {
    type: typeof RUN_UPDATED,
    payload: Run
};

export interface deleteRunAction {
    type: typeof RUN_DELETED,
    payload: string
};

/* Aggregated action interface */
export type RunActions =
    createRunAction |
    fetchRunsAction |
    readRunAction |
    updateRunAction |
    deleteRunAction;