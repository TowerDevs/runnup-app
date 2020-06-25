import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
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

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);