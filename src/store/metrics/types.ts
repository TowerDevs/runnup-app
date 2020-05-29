import { Time } from "../utils/Time";

/* actions */
export const METRIC_EDIT = "METRIC_EDIT";
export const METRIC_CHANGED = "METRIC_CHANGED";

/* state */
export type MetricsState = {
    editing: boolean,
    lockedMetric: string | null, // FIXME: convert to metric name type
    lockedMetricType: string | null,
    metrics: {
      distance: number,
      elevation: number,
      pace: Time,
      duration: Time,
      calories: number,
    },
};

/* action interfaces */
interface editMetricAction {
    type: typeof METRIC_EDIT,
    editingMetric: string,
    editingMetricType: string
};

interface changeMetricAction {
    type: typeof METRIC_CHANGED,
    editingMetric: string,
    editingMetricValue: string | number
};

/* aggregated action interfaces */
export type MetricAction =
    editMetricAction |
    changeMetricAction
