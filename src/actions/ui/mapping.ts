import { METRIC_SELECTED, METRIC_CHANGED } from "../../types/Map";

export const editMetric = (metric) => {
  return {
    type: METRIC_SELECTED,
    editing: true,
    metric
  }
}

export const changeMetric = (metric, value) => {
  return {
    type: METRIC_CHANGED,
    editing: false,
    metric,
    value
  }
}