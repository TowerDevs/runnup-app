import { combineReducers } from "redux";

// import auth from "./auth";
import errors from "./errors";
import friends from "./friends";
import routes from "./routes";
import runs from "./runs";

import mapping from "./ui/mapping";

export default combineReducers({
    // Data Reducers
    // auth,
    errors,
    friends,
    routes,
    runs,

    // UI Reducers
    mapping
});