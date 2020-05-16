import { EDIT_METRIC, CHANGE_METRIC } from "../types";

export const editMetric = (metric) => {
  return {
    type: EDIT_METRIC,
    editing: true,
    metric
  }
}

export const changeMetric = (metric, value) => {
  return {
    type: CHANGE_METRIC,
    editing: false,
    metric,
    value
  }
}