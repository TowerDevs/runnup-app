/* actions */
export const RUNS_REQUESTED = "RUNS_REQUESTED";
export const RUNS_ERROR = "RUNS_ERROR";
export const RUN_CREATED = "RUN_CREATED";
export const RUNS_FETCHED = "RUNS_FETCHED";
export const RUN_READ = "RUN_READ";
export const RUN_UPDATED = "RUN_UPDATED";
export const RUN_DELETED = "RUN_DELETED";

/* model interfaces */
export interface RunReq {

};

export interface RunRes {
    _id: string,
    timestamp: number,
    route: string,
    avgPace: number,
    totalTime: number,
    distanceRan: number
};

/* state interface */
export interface RunState {
    isLoading: boolean;
    data: RunRes[];
};

/* action interfaces */
interface loadRunAction {
    type: typeof RUNS_REQUESTED;
};

interface errorRunAction {
    type: typeof RUNS_ERROR;
};

interface createRunAction {
    type: typeof RUN_CREATED,
    payload: RunRes
}

interface fetchRunsAction {
    type: typeof RUNS_FETCHED,
    payload: RunRes[]
};

interface readRunAction {
    type: typeof RUN_READ,
    payload: RunRes
};

interface updateRunAction {
    type: typeof RUN_UPDATED,
    payload: RunRes
};

interface deleteRunAction {
    type: typeof RUN_DELETED,
    payload: string
};

/* Aggregated action interface */
export type RunActions =
    loadRunAction |
    errorRunAction |
    createRunAction |
    fetchRunsAction |
    readRunAction |
    updateRunAction |
    deleteRunAction;