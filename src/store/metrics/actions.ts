import { METRIC_CHANGED, MetricAction } from "./types";

export const changeMetric = (editingMetric: string, editingMetricValue: number): MetricAction => {
  return {
    type: METRIC_CHANGED,
    editingMetric,
    editingMetricValue
  }
}