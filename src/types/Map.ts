/* actions */
export const METRIC_SELECTED = "METRIC_SELECTED";
export const METRIC_CHANGED = "METRIC_CHANGED";

/* model interface(s) */
export interface Map {

}

/* action interfaces */
export interface selectMetricAction {
    type: typeof METRIC_SELECTED,
};

export interface changeMetricAction {
    type: typeof METRIC_CHANGED,
};

/* aggregated action interfaces */
export type MapActions =
    selectMetricAction |
    changeMetricAction
