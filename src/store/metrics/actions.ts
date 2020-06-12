import { METRICS_CHANGED, MetricAction } from "./types";
import { RouteMetrics } from "../../utils/metrics";

export const changeMetrics = (metrics: RouteMetrics): MetricAction => {
  return {
    type: METRICS_CHANGED,
    metrics: metrics.toState()
  }
}