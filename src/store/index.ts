import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import errors from "./errors/reducer";

// import auth from "./data/auth";
import friends from "./friends/reducer";
import routes from "./routes/reducer";
import runs from "./runs/reducer";

import metrics from "./metrics/reducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
    // Data Reducers
    // auth,
    errors,
    friends,
    routes,
    runs,

    // UI Reducers
    metrics
});

export type AppState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;