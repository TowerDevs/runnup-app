/**
 * Metrics component
 * @module Metrics
 */

import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import STYLES from '../constants/Styles';
import LAYOUT from '../constants/Layout';
import COLORS from '../constants/Colors';
import METRICS from '../constants/Metrics';
import { editMetric, changeMetric } from '../store/metrics/actions';

import MetricInputModal from "./MetricInputModal";
import Metric from "./Metric";
import { Time } from '../utils/Time';

// TODO: Load from preferences, maybe a modal to pick a metric to lock when map screen is opened
const DEFAULT_PACE = Time.fromMinutes(6, 30);

// TODO: Make collapsable and fullscreenable
/**
 * Metrics is a component that displays and allows for the editing of route metrics.
 * @param {Object} props
 */
export default function Metrics(props) {
  const dispatch = useDispatch();
  const metrics = useSelector((state) => state.metrics.metrics);
  const isEditing = useSelector((state) => state.metrics.editing);
  const lockedMetric = useSelector((state) => state.metrics.lockedMetric);
  const lockedMetricType = useSelector((state) => state.metrics.lockedMetricType);

  useEffect(() => {
    dispatch(changeMetric(METRICS.pace.name, DEFAULT_PACE));
  }, [dispatch]);

  const EditMetric = useCallback(
    (metric) => {
      dispatch(editMetric(metric, METRICS[metric].type));
    },
    [dispatch]
  );

  // const ChangeMetric = useCallback(
  //   () => dispatch(changeMetric(lockedMetric, inputValue)),
  //   [dispatch, lockedMetric, inputValue]
  // );

  return (
    <View style={[props.style, styles.container]}>
      {/* Modal */}
      {isEditing && (
        <View style={[STYLES.centeredView, { position: "absolute" }]}>
          <MetricInputModal
            value={""}
            entering={lockedMetric}
            onEndEditing={({ nativeEvent }) => console.log(nativeEvent)}
            type={lockedMetricType}
          />
        </View>
      )}

      {/* Metrics */}
      <View style={styles.row}>
        <Metric
          style={styles.metric}
          value={metrics.distance}
          label="Distance (km)"
          editable={false}
        />
        {/* <Metric
          style={styles.metric}
          value={metrics.elevation}
          label="Elevation (m)"
          editable={false}
        /> */}
      </View>
      <View style={styles.row}>
        <Metric
          style={styles.metric}
          value={metrics.pace}
          label="Pace (min/km)"
          editable={true}
          locked={lockedMetric === METRICS.pace.name}
          onTouchStart={() => EditMetric(METRICS.pace.name)}
        />
        <Metric
          style={styles.metric}
          value={metrics.duration}
          label="Duration (min)"
          editable={true}
          locked={lockedMetric === METRICS.duration.name}
          onTouchStart={() => EditMetric(METRICS.duration.name)}
        />
        <Metric
          style={styles.metric}
          value={metrics.calories}
          label="Calories"
          editable={true}
          locked={lockedMetric === METRICS.calories.name}
          onTouchStart={() => EditMetric(METRICS.calories.name)}
        />
      </View>
      <View style={[styles.row, styles.buttonRow]}>
        <TouchableOpacity style={styles.saveButton} onPress={props.onSave}>
          <Text style={{ color: COLORS.white }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Metrics.propTypes = {
  // Additional styling for the container component
  style: PropTypes.object,
  // Callback when the save button is pressed
  onSave: PropTypes.func,
};

const CONTAINER_HEIGHT = LAYOUT.window.height / 3.75;
const CONTAINER_WIDTH = LAYOUT.window.width;
const METRIC_MARGIN_VERTICAL = 5;
const METRIC_MARGIN_HORIZONTAL = 5;
const METRIC_WIDTH = CONTAINER_WIDTH / 3 - METRIC_MARGIN_HORIZONTAL * 2;
const SAVE_BUTTON_WIDTH = CONTAINER_WIDTH / 1.5;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: CONTAINER_HEIGHT,
    width: CONTAINER_WIDTH,
    backgroundColor: "#fff",
    bottom: 0,
    justifyContent: "center",
    paddingVertical: METRIC_MARGIN_VERTICAL,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    marginVertical: METRIC_MARGIN_VERTICAL,
  },
  metric: {
    width: METRIC_WIDTH,
    marginHorizontal: METRIC_MARGIN_HORIZONTAL,
  },
  metricTouchable: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: METRIC_WIDTH,
  },
  buttonRow: {
    height: STYLES.button.height,
    flex: 0,
  },
  saveButton: {
    ...STYLES.button,
    backgroundColor: COLORS.success,
    width: SAVE_BUTTON_WIDTH,
  },
});
