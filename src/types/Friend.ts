/* actions */
export const FRIENDS_REQUESTED = "FRIENDS_REQUESTED";
export const FRIENDS_ERROR = "FRIENDS_ERROR";
export const FRIEND_ADDED = "FRIEND_ADDED";
export const FRIENDS_FETCHED = "FRIENDS_FETCHED";
export const FRIEND_READ = "FRIEND_READ";
export const FRIEND_ACCEPTED = "FRIEND_ACCEPTED"
export const FRIEND_BLOCKED = "FRIEND_BLOCKED";
export const FRIEND_DELETED = "FRIEND_DELETED";

/* model interface */
export interface Friend {
    _id: string,
    email: string
};

/* action interfaces */
export interface requestFriendAction {
    type: typeof FRIENDS_REQUESTED
};

export interface addFriendAction {
    type: typeof FRIEND_ADDED,
    friend: Friend
};

export interface fetchFriendsAction {
    type: typeof FRIENDS_FETCHED,
    friend: Friend[]
};

export interface readFriendAction {
    type: typeof FRIEND_READ,
    friend: Friend
};

export interface acceptFriendAction {
    type: typeof FRIEND_ACCEPTED,
    _id: string
};

export interface blockFriendAction {
    type: typeof FRIEND_BLOCKED,
    _id: string
};

export interface deleteFriendAction {
    type: typeof FRIEND_DELETED,
    _id: string
};

/* Aggregated action interface */
export type FriendActionTypes = requestFriendAction | addFriendAction | fetchFriendsAction | readFriendAction | acceptFriendAction | blockFriendAction| deleteFriendAction;