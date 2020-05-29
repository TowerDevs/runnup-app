import { METRIC_EDIT, METRIC_CHANGED, MetricAction, MetricsState } from "./types";
import { Time } from "../../utils/Time";

const initialState: MetricsState = {
  editing: false,
  lockedMetric: null,
  lockedMetricType: null,
  metrics: {
    distance: 0.0,
    elevation: 0.0,
    pace: new Time(0),
    duration: new Time(0),
    calories: 0.0,
  },
};

export default (state = initialState, action: MetricAction) => {
  switch (action.type) {
    case METRIC_EDIT:
      return {
        ...state,
        editing: true,
        lockedMetric: action.editingMetric,
        lockedMetricType: action.editingMetricType
      };
    case METRIC_CHANGED:
      return {
        ...state,
        editing: false,
        lockedMetric: action.editingMetric,
        metrics: {
          ...state.metrics,
          [action.editingMetric]: action.editingMetricValue
        }
      };
    default:
      return state;
  }
};
