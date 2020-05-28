import {
    FRIENDS_REQUESTED, FRIENDS_ERROR,
    FRIEND_ADDED, FRIENDS_FETCHED,
    FRIEND_READ, FRIEND_ACCEPTED, FRIEND_BLOCKED, FRIEND_DELETED,
    FriendState, FriendActions
} from "../../types/friends";

const initialState = {
    isLoading: false,
    data: []
};

export default (state: FriendState = initialState, action: FriendActions) => {
    switch(action.type) {
        case FRIENDS_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case FRIENDS_ERROR:
            return {
                ...state,
                isLoading: false
            };
        case FRIEND_ADDED:
            return {
                ...state,
                isLoading: false,
                data: [...state.data, action.payload]
            }
        case FRIENDS_FETCHED:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case FRIEND_READ:
            return {
                ...state,
                isLoading: false,
                data: state.data.map(friend => {
                    const { _id } = action.payload;

                    if(friend._id !== _id) return friend;

                    return {
                        friend: action.payload
                    };
                })
            };
        case FRIEND_ACCEPTED:
            return {
                ...state,
                isLoading: false,
                data: state.data.map(friend => {
                    const { _id } = action.payload;

                    if(friend._id != _id) return friend;

                    return {
                        ...state.data,
                        isPending: false
                    };
                })
            }
        case FRIEND_DELETED:
            return {
                ...state,
                isLoading: false,
                data: state.data.filter(friend => friend._id !== action.payload)
            };
        default:
            return state;
    }
};