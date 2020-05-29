import { METRIC_EDIT, METRIC_CHANGED, MetricAction } from "./types";

export const editMetric = (editingMetric: string, editingMetricType: string): MetricAction => {
  return {
    type: METRIC_EDIT,
    editingMetric,
    editingMetricType
  }
}

export const changeMetric = (editingMetric: string, editingMetricValue: string | number): MetricAction => {
  return {
    type: METRIC_CHANGED,
    editingMetric,
    editingMetricValue
  }
}