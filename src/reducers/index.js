import { combineReducers } from "redux";

// import auth from "./auth";
import errors from "./errors";
import friends from "./friends";
import routes from "./routes";
import runs from "./runs";

export default combineReducers({
    // auth,
    errors,
    friends,
    routes,
    runs
});