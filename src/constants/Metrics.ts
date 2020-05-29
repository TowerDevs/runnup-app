/**
 * Metrics constants
 * @module
 */

export enum METRIC_TYPES {
  TIME = "time",
  NUMBER = "number"
}

// TODO: Create Metric class and replace these objects
export default {
  elevation: {
    name: "elevation",
    editable: false,
    type: METRIC_TYPES.NUMBER
  },
  distance: {
    name: "distance",
    editable: false,
    type: METRIC_TYPES.NUMBER
  },
  pace: {
    name: "pace",
    editable: true,
    type: METRIC_TYPES.TIME
  },
  duration: {
    name: "duration",
    editable: true,
    type: METRIC_TYPES.TIME
  },
  calories: {
    name: "calories",
    editable: true,
    type:  METRIC_TYPES.NUMBER
  },
};