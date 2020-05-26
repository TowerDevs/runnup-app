import { METRIC_SELECTED, METRIC_CHANGED } from "../../types/Map";

const initialState = {
  editing: false,
  metric: null,
  value: ""
};

export default (state = initialState, action) => {
  switch(action.type) {
      case METRIC_SELECTED:
        return {
          editing: true,
          metric: action.metric,
        }
      case METRIC_CHANGED:
        return {
          editing: false,
          metric: action.metric,
          value: action.value
        }
      default:
        return state;
  }
};