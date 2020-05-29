/**
 * Metric component
 * @module Metric
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import { MetricField } from '../utils/metrics';

type Props = {
  field: MetricField;
  label: string;
  onTouchStart?: undefined | (() => void) | ((event: GestureResponderEvent) => void);
  editable?: boolean;
  locked?: boolean;
  style?: ViewStyle;
}

/**
 * Metric is a component for displaying a single metric. It can be specified to be editable
 * or locked with props.
 * @param {Object} props
 */
export default function Metric({ field, label, onTouchStart = undefined, editable = false, locked = false, style = {} }: Props) {
  let borderWidth = editable ? styles.metric.borderWidth : 0;
  let borderColor = locked ? "#fe5f55" : styles.metric.borderColor;

  return (
    <View
      style={[
        styles.metric,
        { borderColor, borderWidth },
        style
      ]}
      onTouchStart={onTouchStart}
    >
      <TouchableOpacity>
        <Text style={styles.metricValue}>{String(field.value)}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}

const METRIC_VALUE_FONT_SIZE = 24;
const METRIC_LABEL_FONT_SIZE = 14;

type Styles = {
  metric: ViewStyle;
  metricValue: TextStyle;
  metricLabel: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  metric: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "#ddd",
    borderWidth: 2
  },
  metricValue: {
    fontSize: METRIC_VALUE_FONT_SIZE,
    fontWeight: "bold",
    textAlign: "center"
  },
  metricLabel: {
    fontSize: METRIC_LABEL_FONT_SIZE,
    fontWeight: "bold",
    textAlign: "center"
  },
});