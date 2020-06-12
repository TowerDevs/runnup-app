import { METRICS } from "../../constants/Metrics";

/* actions */
export const METRICS_CHANGED = "METRIC_CHANGED";

/* state */
export type RouteMetricsState = {
    distance: number;
    pace: number;
    duration: number;
    calories: number;
    locked: METRICS | null;
};

/* action interfaces */
interface changeMetricsAction {
    type: typeof METRICS_CHANGED
    metrics: RouteMetricsState
}

/* aggregated action interfaces */
export type MetricAction =
    changeMetricsAction;
