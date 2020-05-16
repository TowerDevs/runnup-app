/**
 * Metric component
 * @module Metric
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Metric is a component for displaying a single metric. It can be specified to be editable
 * or locked with props.
 * @param {Object} props
 */
export default function Metric({ value, label, editable = false, locked = false, style = {}, ...props }) {
  let borderWidth = editable ? styles.metric.borderWidth : 0;
  let borderColor = locked ? "#fe5f55" : styles.metric.borderColor;

  return (
    <View
      style={[
        styles.metric,
        { borderColor, borderWidth },
        style
      ]}
      {...props}
    >
      <TouchableOpacity style={styles.metricTouchable}>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}

Metric.propTypes = {
  // Value to display in the metric
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // Metric label
  label: PropTypes.string.isRequired,
  // Make the metric editable
  editable: PropTypes.bool,
  // Lock the metric
  locked: PropTypes.bool
}

const METRIC_VALUE_FONT_SIZE = 24;
const METRIC_LABEL_FONT_SIZE = 14;

const styles = StyleSheet.create({
  metric: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "#ddd",
    borderWidth: 2
  },
  metricValue: {
    fontSize: METRIC_VALUE_FONT_SIZE,
    fontWeight: "bold"
  },
  metricLabel: {
    fontSize: METRIC_LABEL_FONT_SIZE,
    fontWeight: "bold"
  },
});