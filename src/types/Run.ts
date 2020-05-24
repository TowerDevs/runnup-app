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
export interface requestRunAction {
    type: typeof RUNS_REQUESTED
};

export interface createRunAction {
    type: typeof RUN_CREATED,
    run: Run
}

export interface fetchRunsAction {
    type: typeof RUNS_FETCHED,
    runs: Run[]
};

export interface readRunAction {
    type: typeof RUN_READ,
    run: Run
};

export interface updateRunAction {
    type: typeof RUN_UPDATED,
    run: Run
};

export interface deleteRunAction {
    type: typeof RUN_DELETED,
    _id: string
};

/* Aggregated action interface */
export type RunActionTypes = requestRunAction | createRunAction | fetchRunsAction | readRunAction |updateRunAction | deleteRunAction;