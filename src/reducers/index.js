import { combineReducers } from "redux";

import error from "./errors";
import route from "./routes";
// import auth from "./auth";
// import run from "./runs";

export default combineReducers({
    error,
    route,
    // auth,
    // run
});