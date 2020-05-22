/**
 * Metrics component
 * @module Metrics
 */

import React, { useState, useCallback } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import STYLES from '../constants/Styles';
import LAYOUT from '../constants/Layout';
import COLORS from '../constants/Colors';
import METRICS from '../constants/Metrics';
import { Time } from '../utils/time';
import { editMetric, changeMetric } from '../actions/ui/mapping';

import MetricInputModal from './MetricInputModal';
import Metric from './Metric';

// TODO: Remove and use store
const TEST_ROUTE_DATA = {
  distance: 3.67,
  elevation: 10,
  pace: new Time(4 * 60 + 32),
  duration: new Time(16 * 60 + 38),
  calories: 523
};

// TODO: Modify for live-running
// TODO: Make collapsable and fullscreenable
/**
 * Metrics is a component that displays and allows for the editing of route metrics.
 * @param {Object} props
 */
export default function Metrics(props) {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const isEditing = useSelector(state => state.mapping.editing);
  const selectedMetric = useSelector(state => state.mapping.metric);

  const EditMetric = useCallback(
    (metric) => dispatch(editMetric(metric)),
    [dispatch]
  )

  const ChangeMetric = useCallback(
    () => dispatch(changeMetric(selectedMetric, inputValue)),
    [dispatch, selectedMetric, inputValue]
  )
  
  // TODO: Use store to get route data
  let routeData = TEST_ROUTE_DATA;
  return (
    <View style={[props.style, styles.container]}>
      {/* Modal */}
      {
        isEditing &&
        <View style={[STYLES.centeredView, { position: "absolute" }]}>
          <MetricInputModal
            entering={selectedMetric}
            value={inputValue}
            onChangeText={val => setInputValue(val)}
            onEndEditing={ChangeMetric}
          />
        </View>
      }

      {/* Metrics */}
      <View style={styles.row}>
        <Metric
          style={styles.metric}
          value={routeData.distance}
          label="Distance (km)"
          editable={false}
        />
        <Metric
          style={styles.metric}
          value={routeData.elevation}
          label="Elevation (m)"
          editable={false}
        />
      </View>
      <View style={styles.row}>
        <Metric
          style={styles.metric}
          value={routeData.pace.minuteString()}
          label="Pace (min/km)"
          editable={true}
          locked={selectedMetric === METRICS.PACE.name}
          onTouchStart={() => EditMetric(METRICS.PACE.name)}
        />
        <Metric
          style={styles.metric}
          value={routeData.duration.minuteString()}
          label="Duration (min)"
          editable={true}
          locked={selectedMetric === METRICS.DURATION.name}
          onTouchStart={() => EditMetric(METRICS.DURATION.name)}
        />
        <Metric
          style={styles.metric}
          value={routeData.calories}
          label="Calories"
          editable={true}
          locked={selectedMetric === METRICS.CALORIES.name}
          onTouchStart={() => EditMetric(METRICS.CALORIES.name)}
        />
      </View>
      <View style={[styles.row, styles.buttonRow]}>
        <TouchableOpacity style={styles.saveButton} onPress={props.onSave}>
          <Text style={{ color: COLORS.white }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

Metrics.propTypes = {
  // Additional styling for the container component
  style: PropTypes.object,
  // Callback when the save button is pressed
  onSave: PropTypes.func
}

const CONTAINER_HEIGHT = LAYOUT.window.height / 3.75;
const CONTAINER_WIDTH = LAYOUT.window.width;
const METRIC_MARGIN_VERTICAL = 5;
const METRIC_MARGIN_HORIZONTAL = 5;
const METRIC_WIDTH = CONTAINER_WIDTH / 3 - METRIC_MARGIN_HORIZONTAL * 2;
const SAVE_BUTTON_WIDTH = CONTAINER_WIDTH / 1.5;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: CONTAINER_HEIGHT,
    width: CONTAINER_WIDTH,
    backgroundColor: '#fff',
    bottom: 0,
    justifyContent: 'center',
    paddingVertical: METRIC_MARGIN_VERTICAL
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginVertical: METRIC_MARGIN_VERTICAL
  },
  metric: {
    width: METRIC_WIDTH,
    marginHorizontal: METRIC_MARGIN_HORIZONTAL
  },
  metricTouchable: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: METRIC_WIDTH
  },
  buttonRow: {
    height: STYLES.button.height,
    flex: 0
  },
  saveButton: {
    ...STYLES.button,
    backgroundColor: COLORS.success,
    width: SAVE_BUTTON_WIDTH,
  }
});