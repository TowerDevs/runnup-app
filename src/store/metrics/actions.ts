import { METRIC_CHANGED, MetricAction } from "./types";
import { METRICS } from "../../constants/Metrics";

export const changeMetric = (editingMetric: METRICS, editingMetricValue: number): MetricAction => {
  return {
    type: METRIC_CHANGED,
    editingMetric,
    editingMetricValue
  }
}