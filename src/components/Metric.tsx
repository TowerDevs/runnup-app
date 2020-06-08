/**
 * Metric component
 * @module Metric
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';

import Colors from '../constants/Colors';
import { MetricField } from '../utils/metrics';

type Props = {
  field: MetricField;
  onTouchStart?: undefined | (() => void) | ((event: GestureResponderEvent) => void);
  locked?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * Metric is a component for displaying a single metric. It can be specified to be editable
 * or locked with props.
 * @param {Object} props
 */
export default function Metric({ field, onTouchStart = undefined, locked = false, disabled = false, style = {} }: Props) {
  let borderWidth = field.editable ? styles.metric.borderWidth : 0;
  let borderColor = locked ? Colors.primary : styles.metric.borderColor;
  let textColor = disabled ? Colors.lightGrey : Colors.offBlack;

  return (
    <View
      style={[
        styles.metric,
        { borderColor, borderWidth },
        style
      ]}
      onTouchStart={onTouchStart}
    >
      {/* TODO: Remove touchable opacity if not editable */}
      <TouchableOpacity>
        <Text style={[styles.metricValue, { color: textColor }]}>{String(field.value)}</Text>
        <Text style={styles.metricLabel}>{field.label}</Text>
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