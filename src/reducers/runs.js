import {
    RUNS_REQUESTED, RUNS_ERROR,
    RUN_CREATED, RUNS_FETCHED,
    RUN_READ, RUN_UPDATED, RUN_DELETED
} from "../actions/types";

const initialState = {
    isLoading: false,
    runs: []
};

export default (state = initialState, action) => {
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
                runs: [...state.runs, action.payload]
            };
        case RUNS_FETCHED:
            return {
                ...state,
                isLoading: false,
                runs: action.payload
            };
        case RUN_READ:
            return {
                ...state,
                isLoading: false,
                runs: state.runs.map(run => {
                    const { id } = action.payload;

                    if(run.id !== id) return run;

                    return {
                        run: action.payload
                    };
                })
            };
        case RUN_UPDATED:
            return {
                ...state,
                isLoading: false,
                runs: state.runs.map(run => {
                    const { id } = action.payload;

                    if(run.id !== id) return run;

                    return {
                        ...state.runs,
                        run: {

                        }
                    };
                })
            };
        case RUN_DELETED:
            return {
                ...state,
                isLoading: false,
                runs: state.runs.filter(run => run.id !== action.payload)
            };
        default:
            return state;
    }
};