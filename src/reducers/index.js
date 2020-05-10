import { combineReducers } from "redux";

import auth from "./auth";
import error from "./errors";
import route from "./routes";
// import run from "./runs";

export default combineReducers({
    // auth, // disable auth during dev
    error,
    route,
    // run
});