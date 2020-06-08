/**
 * Metrics utils
 * @module
 */

import { METRIC_TYPES, METRICS } from "../constants/Metrics";
import { RouteMetricsState } from "../store/metrics/types";
import { Route } from "./mapping";

/**
 * MetricField holds data regarding a metric.
 */
export class MetricField {
  name: METRICS;
  editable: boolean;
  type: METRIC_TYPES;
  label: string;
  locked: boolean;
  value: number;

  /**
   * Initialize MetricField class
   */
  constructor(
    name: METRICS,
    editable: boolean,
    type: METRIC_TYPES,
    label: string,
    locked: boolean = false,
    value: number = 0
  ) {
    this.name = name;
    this.editable = editable;
    this.type = type;
    this.label = label;
    this.locked = locked;
    this.value = value;
  }

  toString() {
    return String(this.value);
  }
}

/**
 * Metrics is a container for metrics.
 */
export abstract class Metrics {
  public metrics: Map<METRICS, MetricField>;

  constructor() {
    this.metrics = new Map<METRICS, MetricField>();
  }

  public addField(field: MetricField) {
    this.metrics.set(field.name, field);
  }

  get(metric: METRICS) {
    if (this.metrics.has(metric)) {
      return this.metrics.get(metric);
    } else {
      throw Error(`${metric} not a metric`);
    }
  }

  getAll(): MetricField[] {
    return Array.from(this.metrics.values());
  }

  getEditable(): MetricField[] {
    return Array.from(this.metrics.values()).filter(
      (field: MetricField) => field.editable
    );
  }

  getLocked(): MetricField | null {
    for (const field of this.metrics.values()) {
      if (field.locked === true) return field;
    }
    return null;
  }

  setLocked(metric: METRICS | null) {
    if (metric != null) {
      if (this.metrics.has(metric)) {
        this.getEditable().forEach((field: MetricField) => {
          if (metric === field.name) {
            field.locked = true;
          } else {
            field.locked = false;
          }
        });
      } else {
        throw Error(`${metric} is not a metric`);
      }
    }
  }

  setValue(metric: METRICS, value: number) {
    if (this.metrics.has(metric)) {
      this.metrics.get(metric)!.value = value;
    } else {
      throw Error(`${metric} not a metric`);
    }
  }

  abstract update(metric: METRICS, value: number): void;
}

/**
 * RouteMetrics holds the data used for routing a run and calculates
 * values.
 * 
 * Units:
 *   distance -> km
 *   pace -> sec / km
 *   duration -> sec
 *   calories -> kcal
 */
export class RouteMetrics extends Metrics {
  constructor() {
    super();

    this.addField(
      new MetricField(
        METRICS.DISTANCE,
        false,
        METRIC_TYPES.NUMBER,
        "Distance (km)"
      )
    );
    this.addField(
      new MetricField(
        METRICS.CALORIES,
        true,
        METRIC_TYPES.NUMBER,
        "Calories",
        false,
        0.0
      )
    );
    this.addField(
      new MetricField(
        METRICS.PACE,
        true,
        METRIC_TYPES.TIME,
        "Pace (min/km)",
        false,
        0.0
      )
    );
    this.addField(
      new MetricField(
        METRICS.DURATION,
        true,
        METRIC_TYPES.TIME,
        "Duration (h:m:s)",
        false,
        0.0
      )
    );
  }

  loadState(state: RouteMetricsState) {
    this.setValue(METRICS.DISTANCE, state.distance);
    this.setValue(METRICS.DURATION, state.duration);
    this.setValue(METRICS.PACE, state.pace);
    this.setValue(METRICS.CALORIES, state.calories);

    this.setLocked(state.locked);
  }

  toState(): RouteMetricsState {
    return {
      distance: this.distance,
      pace: this.pace,
      duration: this.duration,
      calories: this.calories,
      locked: this.getLocked()?.name || null
    };
  }

  public get distance() {
    return this.get(METRICS.DISTANCE)!.value;
  }

  public get pace() {
    return this.get(METRICS.PACE)!.value;
  }

  public get duration() {
    return this.get(METRICS.DURATION)!.value;
  }

  public get calories() {
    return this.get(METRICS.CALORIES)!.value;
  }

  update(metric: METRICS, value: number) {
    // Check that the metric is valid
    if (!this.metrics.has(metric)) {
      throw Error(`${metric} is not a valid metric`);
    }

    // Update the field with the value given
    this.setValue(metric, value);

    // Lock the selected value if it's editable
    this.getEditable().forEach((field) => {
      if (field.editable && field.name === metric) {
        field.locked = true;
      } else{ 
        field.locked = false;
      }
    });

    // If there is a locked field, calculate all unlocked-editable fields
    const field = this.getLocked();
    if (field !== null) {
      switch (field.name) {
        case METRICS.PACE:
          this.setValue(METRICS.DURATION, this.distance * this.pace);
          this.setValue(METRICS.CALORIES, this.pace * this.duration / 1000);
          break;

        case METRICS.DURATION:
          this.setValue(METRICS.PACE, this.duration / this.distance);
          this.setValue(METRICS.CALORIES, this.pace * this.duration / 1000);
          break;

        case METRICS.CALORIES:
          this.setValue(METRICS.PACE, this.calories / this.distance);
          this.setValue(METRICS.DURATION, this.distance * this.pace);
          break;

        default:
          break;
      }
    }
  }
}
