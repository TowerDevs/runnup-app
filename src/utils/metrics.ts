/**
 * Metrics utils
 * @module
 */

import { METRIC_TYPES } from "../constants/Metrics";
import { Time } from "./time";

/**
 * MetricField holds data regarding a metric.
 */
export class MetricField {
    name: string;
    editable: boolean;
    type: METRIC_TYPES;
    label: string;
    value: number | Time;
    
    /**
     * Initialize MetricField class
     */
    constructor(name: string, editable: boolean, type: METRIC_TYPES, label: string, value: number | Time) {
        this.name = name;
        this.editable = editable;
        this.type = type;
        this.label = label;
        this.value = value;
    }

    toString() {
        return String(this.value);
    }
}