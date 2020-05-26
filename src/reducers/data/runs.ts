import {
    RUNS_REQUESTED, RUNS_ERROR,
    RUN_CREATED, RUNS_FETCHED,
    RUN_READ, RUN_UPDATED, RUN_DELETED,
    Run
} from "../../types/Run";

const initialState = {
    isLoading: false,
    data: []
};

interface State {
    isLoading: boolean,
    data: Run[]
}

interface Action {
    type: string,
    payload: string | Run[]
}

export default (state: State = initialState, action: Action) => {
    switch(action.type) {
        case RUNS_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case RUNS_ERROR:
            return {
                ...state,
                isLoading: false
            };
        case RUN_CREATED:
            return {
                ...state,
                isLoading: false,
                data: [...state.data, action.payload]
            };
        case RUNS_FETCHED:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case RUN_READ:
            return {
                ...state,
                isLoading: false,
                data: state.data.map(run => {
                    const { _id } = action.payload;

                    if(run._id !== _id) return run;

                    return {
                        run: action.payload
                    };
                })
            };
        case RUN_UPDATED:
            return {
                ...state,
                isLoading: false,
                data: state.data.map(run => {
                    const { _id } = action.payload;

                    if(run._id !== _id) return run;

                    return {
                        ...state.data,
                        run: {

                        }
                    };
                })
            };
        case RUN_DELETED:
            return {
                ...state,
                isLoading: false,
                data: state.data.filter(run => run._id !== action.payload)
            };
        default:
            return state;
    }
};