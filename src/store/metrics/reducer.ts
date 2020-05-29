import { METRIC_CHANGED, MetricAction, MetricsState } from "./types";

const initialState: MetricsState = {
  metrics: {
    distance: 0.0,
    elevation: 0.0,
    pace: 0.0,
    duration: 0.0,
    calories: 0.0,
  },
};

export default (state = initialState, action: MetricAction): MetricsState => {
  switch (action.type) {
    case METRIC_CHANGED:
      return {
        ...state,
        metrics: {
          ...state.metrics,
          [action.editingMetric]: action.editingMetricValue
        }
      };
    default:
      return state;
  }
};
