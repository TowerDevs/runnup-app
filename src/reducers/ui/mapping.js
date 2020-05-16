import { EDIT_METRIC, CHANGE_METRIC } from "../../actions/types";

const initialState = {
  editing: false,
  metric: null,
  value: ""
};

export default (state = initialState, action) => {
  switch(action.type) {
      case EDIT_METRIC:
        return {
          editing: true,
          metric: action.metric,
        }
      case CHANGE_METRIC:
        return {
          editing: false,
          metric: action.metric,
          value: action.value
        }
      default:
        return state;
  }
};