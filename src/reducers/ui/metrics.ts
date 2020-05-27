import { METRIC_EDIT, METRIC_CHANGED, MetricAction } from "../../types/metrics";

const initialState = {
  editing: false,
  metric: null,
  value: ""
};

export default (state = initialState, action: MetricAction) => {
  switch(action.type) {
      case METRIC_EDIT:
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