/**
 * Metrics component
 * @module Metrics
 */

import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { useDispatch } from "react-redux";

import STYLES from '../constants/Styles';
import LAYOUT from '../constants/Layout';
import COLORS from '../constants/Colors';
import { METRICS } from '../constants/Metrics';
import { changeMetrics } from '../store/metrics/actions';

import MetricInputModal from "./MetricInputModal";
import Metric from "./Metric";
import { Time } from '../utils/time';
import { RouteMetrics } from '../utils/metrics';
import { useTypedSelector } from "../store";
import { Route } from "../utils/mapping";

// TODO: Load from preferences, maybe a modal to pick a metric to lock when map screen is opened
const DEFAULT_PACE = Time.fromMinutes(6, 30);

const fields = new RouteMetrics();

type Props = {
  // Route date
  route: Route,
  // Additional styling for the container component
  style: object;
  // Callback when the save button is pressed
  onSave?: () => void;
};

// TODO: Make collapsable and fullscreenable
/**
 * Metrics is a component that displays and allows for the editing of route metrics.
 * @param {Object} props
 */
export default function Metrics(props: Props) {
  const dispatch = useDispatch();
  const metrics = useTypedSelector((state) => state.metrics.metrics);

  fields.loadState(metrics);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [entering, setEntering] = useState<METRICS>(METRICS.PACE);

  useEffect(() => {
    // TODO: Make util function for rounding to accuracy
    fields.update(METRICS.DISTANCE, Math.round((props.route.distance + Number.EPSILON) * 100) / 100 / 1000);
    dispatch(changeMetrics(fields));
  }, [dispatch, fields, props.route]);

  const editMetric = (metric: METRICS) => {
    setIsEditing(true);
    setEntering(metric);
  };

  const ChangeMetric = useCallback(
    () => dispatch(changeMetrics(fields)),
    [dispatch, fields]
  );

  return (
    <View style={[props.style, styles.container]}>
      {/* Modal */}
      {isEditing && (
        <View style={[STYLES.centeredView, { position: "absolute" }]}>
          <MetricInputModal
            entering={entering}
            onEndEditing={(value: number) => {
              setIsEditing(false);
              fields.update(entering, value);
              ChangeMetric();
            }}
            field={fields.get(entering)!}
          />
        </View>
      )}

      {/* Metrics */}
      <View style={styles.row}>
        <Metric
          field={fields.get(METRICS.DISTANCE)!}
          style={styles.metric}
        />
        <Metric
          field={fields.get(METRICS.CALORIES)!}
          style={styles.metric}
          locked={fields.getLocked()?.name === fields.get(METRICS.CALORIES)!.name}
          onTouchStart={() => editMetric(METRICS.CALORIES)}
        />
      </View>
      <View style={styles.row}>
        <Metric
          field={fields.get(METRICS.PACE)!}
          style={styles.metric}
          locked={fields.getLocked()?.name === fields.get(METRICS.PACE)!.name}
          onTouchStart={() => editMetric(METRICS.PACE)}
        />
        <Metric
          field={fields.get(METRICS.DURATION)!}
          style={styles.metric}
          locked={fields.getLocked()?.name === fields.get(METRICS.DURATION)!.name}
          onTouchStart={() => editMetric(METRICS.DURATION)}
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

const CONTAINER_HEIGHT = LAYOUT.window.height / 3.75;
const CONTAINER_WIDTH = LAYOUT.window.width;
const METRIC_MARGIN_VERTICAL = 5;
const METRIC_MARGIN_HORIZONTAL = 5;
const METRIC_WIDTH = CONTAINER_WIDTH / 3 - METRIC_MARGIN_HORIZONTAL * 2;
const SAVE_BUTTON_WIDTH = CONTAINER_WIDTH / 1.5;

interface Styles {
  container: ViewStyle;
  row: ViewStyle;
  metric: ViewStyle;
  buttonRow: ViewStyle;
  saveButton: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
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
