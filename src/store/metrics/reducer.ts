import { METRIC_CHANGED, MetricAction, MetricsState } from "./types";
import { Metrics, calculateMetrics } from '../../utils/metrics';

type State = {
  metrics: MetricsState
}

const initialState = {
  metrics: {
    distance: 0.0,
    elevation: 0.0,
    pace: 0.0,
    duration: 0.0,
    calories: 0.0
  }
};

export default (state: State = initialState, action: MetricAction): State => {
  switch (action.type) {
    case METRIC_CHANGED: {
      let newMetrics: Metrics = Metrics.fromState(state.metrics);
      newMetrics.update(action.editingMetric, action.editingMetricValue);
      return {
        ...state,
        metrics: {
          ...state.metrics,
          ...newMetrics.toState()
        }
      };
    }
    default:
      return state;
  }
};
