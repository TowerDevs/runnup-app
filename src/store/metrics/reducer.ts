import { METRICS_CHANGED, MetricAction, RouteMetricsState } from "./types";

type State = {
  metrics: RouteMetricsState
}

const initialState = {
  metrics: {
    distance: 0.0,
    elevation: 0.0,
    pace: 0.0,
    duration: 0.0,
    calories: 0.0,
    locked: null
  }
};

export default (state: State = initialState, action: MetricAction): State => {
  switch (action.type) {
    case METRICS_CHANGED: {
      return {
        ...state,
        metrics: action.metrics
      };
    }
    default:
      return state;
  }
};
