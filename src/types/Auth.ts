// actions
export const AUTH_ERROR = "AUTH_ERROR";

export const USER_REQUESTED = "USER_REQUESTED";
export const USER_LOADED = "USER_LOADED";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const DEREGISTER_SUCCESS = "DEREGISTER_SUCCESS";
export const DEREGISTER_FAILED = "DEREGISTER_FAILED";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const EMAIL_TOKEN_SENT = "EMAIL_TOKEN_SENT";
export const EMAIL_TOKEN_ERROR = "EMAIL_TOKEN_ERROR";
export const EMAIL_VERIFIED = "EMAIL_VERIFIED";

export const PASSWORD_TOKEN_SENT = "PASSWORD_TOKEN_SENT";
export const PASSWORD_TOKEN_ERROR = "PASSWORD_TOKEN_ERROR";
export const PASSWORD_TOKEN_VERIFIED = "PASSWORD_TOKEN_VERIFIED";

/* model interfaces */
export interface RegisterReq {
    first: string;
    last: string;
    email: string;
    password: string;
};

export interface LoginReq {
    email: string;
    password: string;
};

export interface TokenRes {
    token: string;
};

export interface UserRes {
    _id: string
};

// state interface
export interface AuthState {
    token: Promise<string | null>;
    isAuthenticated: null | boolean;
    isLoading: boolean;
    user: null | UserRes
};

// action interfaces
interface loadAuthAction {
    type: typeof USER_REQUESTED;
};

interface errorAuthActions {
    type: typeof AUTH_ERROR | typeof REGISTER_FAILED | typeof DEREGISTER_FAILED | typeof LOGIN_FAILED;
};

interface tokenErrorAction {
    type: typeof EMAIL_TOKEN_ERROR | typeof PASSWORD_TOKEN_ERROR;
};

interface registerAction {
    type: typeof REGISTER_SUCCESS
    payload: TokenRes;
};

interface loadUserAction {
    type: typeof USER_LOADED;
    payload: UserRes;
};

interface deregisterAction {
    type: typeof DEREGISTER_SUCCESS;
};

interface loginAction {
    type: typeof LOGIN_SUCCESS;
    payload: TokenRes;
};

interface logoutAction {
    type: typeof LOGOUT_SUCCESS;
};

interface emailAction {
    type: typeof EMAIL_TOKEN_SENT | typeof EMAIL_VERIFIED;
};

interface passwordAction {
    type: typeof PASSWORD_TOKEN_SENT | typeof PASSWORD_TOKEN_VERIFIED;
};

// aggregated action interfaces
export type AuthActions =
    loadAuthAction |
    errorAuthActions |
    tokenErrorAction |
    registerAction |
    loadUserAction |
    deregisterAction |
    loginAction |
    logoutAction |
    emailAction |
    passwordAction;