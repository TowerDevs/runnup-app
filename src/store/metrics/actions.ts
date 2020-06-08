import { METRICS_CHANGED, MetricAction } from "./types";
import { RouteMetrics } from "../../utils/metrics";

export const changeMetrics = (metrics: RouteMetrics): MetricAction => {
  console.log(metrics);
  console.log(metrics.toState);
  return {
    type: METRICS_CHANGED,
    metrics: metrics.toState()
  }
}