/* actions */
export const METRIC_CHANGED = "METRIC_CHANGED";

/* state */
export type MetricsState = {
    metrics: {
      distance: number,
      elevation: number,
      pace: number,
      duration: number,
      calories: number,
    },
};

/* action interfaces */
interface changeMetricAction {
    type: typeof METRIC_CHANGED,
    editingMetric: string,
    editingMetricValue: string | number
};

/* aggregated action interfaces */
export type MetricAction =
    changeMetricAction
