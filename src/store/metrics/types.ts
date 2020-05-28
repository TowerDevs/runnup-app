/* actions */
export const METRIC_EDIT = "METRIC_EDIT";
export const METRIC_CHANGED = "METRIC_CHANGED";

/* action interfaces */
interface editMetricAction {
    type: typeof METRIC_EDIT,
    metric: string
};

interface changeMetricAction {
    type: typeof METRIC_CHANGED,
    metric: string,
    value: string | number
};

/* aggregated action interfaces */
export type MetricAction =
    editMetricAction |
    changeMetricAction
