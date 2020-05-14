import {
    FRIENDS_REQUESTED, FRIENDS_ERROR,
    FRIEND_ADDED, FRIENDS_FETCHED,
    FRIEND_READ, FRIEND_ACCEPTED, FRIEND_DELETED
} from "../actions/types";

const initialState = {
    isLoading: false,
    data: []
};

export default (state = initialState, action) => {
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
                    const { id } = action.payload;

                    if(friend.id !== id) return friend;

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
                        ...state.friend,
                        isPending: false
                    };
                })
            }
        case FRIEND_DELETED:
            return {
                ...state,
                isLoading: false,
                data: state.data.filter(friend => friend.id !== action.payload)
            };
        default:
            return state;
    }
};