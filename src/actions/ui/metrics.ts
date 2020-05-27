import { METRIC_EDIT, METRIC_CHANGED, MetricAction } from "../../types/metrics";

export const editMetric = (metric: string): MetricAction => {
  return {
    type: METRIC_EDIT,
    metric
  }
}

export const changeMetric = (metric: string, value: string | number): MetricAction => {
  return {
    type: METRIC_CHANGED,
    metric,
    value
  }
}