// actions
export const ERRORS_RETURNED = "ERRORS_RETURNED";
export const ERRORS_LOGGED = "ERRORS_LOGGED";
export const ERRORS_CLEARED = "ERRORS_CLEARED";

/* model interface */
export interface Error {
    message: string,
    status: number,
    id: string
};

/* action interfaces */
export interface returnErrorAction {
    type: typeof ERRORS_RETURNED,
    error: Error
};

export interface logErrorAction {
    type: typeof ERRORS_LOGGED
};

export interface clearErrorAction {
    type: typeof ERRORS_CLEARED
};

/* aggregated action interface */
export type ErrorActions =
    returnErrorAction |
    logErrorAction |
    clearErrorAction;