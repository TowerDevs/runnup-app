/* actions */
export const FRIENDS_REQUESTED = "FRIENDS_REQUESTED";
export const FRIENDS_ERROR = "FRIENDS_ERROR";
export const FRIEND_ADDED = "FRIEND_ADDED";
export const FRIENDS_FETCHED = "FRIENDS_FETCHED";
export const FRIEND_READ = "FRIEND_READ";
export const FRIEND_ACCEPTED = "FRIEND_ACCEPTED"
export const FRIEND_BLOCKED = "FRIEND_BLOCKED";
export const FRIEND_DELETED = "FRIEND_DELETED";

/* model interfaces */
export interface FriendReq {
    _id: string,
    email: string
};

export interface FriendRes {
    _id: string
};

/* state interface */
export interface FriendState {
    isLoading: boolean;
    data: FriendRes[]
};

/* action interfaces */
interface loadFriendAction {
    type: typeof FRIENDS_REQUESTED;
};

interface errorFriendAction {
    type: typeof FRIENDS_ERROR;
};

interface addFriendAction {
    type: typeof FRIEND_ADDED,
    payload: FriendRes
};

interface fetchFriendsAction {
    type: typeof FRIENDS_FETCHED,
    payload: FriendRes[]
};

interface readFriendAction {
    type: typeof FRIEND_READ,
    payload: FriendRes
};

interface acceptFriendAction {
    type: typeof FRIEND_ACCEPTED,
    payload: string
};

interface blockFriendAction {
    type: typeof FRIEND_BLOCKED,
    payload: string
};

export interface deleteFriendAction {
    type: typeof FRIEND_DELETED,
    payload: string
};

/* Aggregated action interface */
export type FriendActions =
    loadFriendAction |
    errorFriendAction |
    addFriendAction |
    fetchFriendsAction |
    readFriendAction |
    acceptFriendAction |
    blockFriendAction|
    deleteFriendAction;