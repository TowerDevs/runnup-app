import { METRICS } from "../../constants/Metrics";

/* actions */
export const METRIC_CHANGED = "METRIC_CHANGED";

/* state */
export type RouteMetricsState = {
    distance: number;
    elevation: number;
    pace: number;
    duration: number;
    calories: number;
};

/* action interfaces */
interface changeMetricAction {
    type: typeof METRIC_CHANGED,
    editingMetric: METRICS,
    editingMetricValue: number
};

/* aggregated action interfaces */
export type MetricAction =
    changeMetricAction
