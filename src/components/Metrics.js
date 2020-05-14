import React, { useState } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';

import Styles from '../constants/Styles';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import Time from '../utils/time';

// TODO: Remove and use store
const TEST_ROUTE_DATA = {
  distance: 3.67,
  elevation: 10,
  pace: new Time(4 * 60 + 32),
  duration: new Time(16 * 60 + 38),
  calories: 523
};
const CONTAINER_HEIGHT = Layout.window.height / 3.75;
const CONTAINER_WIDTH = Layout.window.width;
const METRIC_MARGIN_VERTICAL = 5;
const METRIC_MARGIN_HORIZONTAL = 5;
const METRIC_WIDTH = CONTAINER_WIDTH / 3 - METRIC_MARGIN_HORIZONTAL * 2;
const METRIC_VALUE_FONT_SIZE = 24;
const METRIC_LABEL_FONT_SIZE = 14;
const SAVE_BUTTON_WIDTH = CONTAINER_WIDTH / 1.5;

// Enum of editable fields
const EDITABLE = {
  PACE: "pace",
  DURATION: "duration",
  CALORIES: "calories"
};

// TODO: Rename to Metrics
export function MetricsContainer(props) {
  const [locked, setLocked] = useState(EDITABLE.PACE);
  const [entering, setEntering] = useState(null);
  const [inputValue, setInputValue] = useState("");

  function editMetric(field) {
    setEntering(field);
    setInputValue("");
  }

  function endEditMetric() {
    setLocked(entering)
    setEntering(null);
    setInputValue("");
  }

  let routeData = props.routeData || TEST_ROUTE_DATA;
  return (
    <View style={[props.style, styles.container]}>
      {/* Modal */}
      {
        entering !== null &&
        <View style={[Styles.centeredView, { position: "absolute" }]}>
          <Modal transparent={true}>
            <View style={Styles.centeredView}>
              <View style={styles.modal}>
                <Text style={{marginBottom: 10}}>
                  Enter a target {entering}
                </Text>
                <TextInput
                  autoFocus={true}
                  value={inputValue}
                  onChangeText={(val) => setInputValue(val)}
                  style={styles.input}
                  returnKeyType="done"
                  onEndEditing={() => endEditMetric()}
                />
              </View>
            </View>
          </Modal>
        </View>
      }

      {/* Metrics */}
      <View style={styles.row}>
        <Metric
          value={routeData.distance}
          label="Distance (km)"
          editable={false}
        />
        <Metric
          value={routeData.elevation}
          label="Elevation (m)"
          editable={false}
        />
      </View>
      <View style={styles.row}>
        <Metric
          value={routeData.pace.minuteString()}
          label="Pace (min/km)"
          editable={true}
          locked={locked === EDITABLE.PACE}
          onTouchStart={() => editMetric(EDITABLE.PACE)}
        />
        <Metric
          value={routeData.duration.minuteString()}
          label="Duration (min)"
          editable={true}
          locked={locked === EDITABLE.DURATION}
          onTouchStart={() => editMetric(EDITABLE.DURATION)}
        />
        <Metric
          value={routeData.calories}
          label="Calories"
          editable={true}
          locked={locked === EDITABLE.CALORIES}
          onTouchStart={() => editMetric(EDITABLE.CALORIES)}
        />
      </View>
      <View style={[styles.row, styles.buttonRow]}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={{ color: Colors.white }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

MetricsContainer.propTypes = {
  routeData: PropTypes.object,
  style: PropTypes.object
}

function Metric({ value, label, editable = false, locked = false, style = {}, ...props }) {
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  locked: PropTypes.bool
}

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
  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  input: {
    width: 200,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    borderRadius: 10
  },
  metric: {
    width: METRIC_WIDTH,
    marginHorizontal: METRIC_MARGIN_VERTICAL,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "#ddd",
    borderWidth: 2
  },
  metricTouchable: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: METRIC_WIDTH
  },
  metricValue: {
    fontSize: METRIC_VALUE_FONT_SIZE,
    fontWeight: "bold"
  },
  metricLabel: {
    fontSize: METRIC_LABEL_FONT_SIZE,
    fontWeight: "bold"
  },
  buttonRow: {
    height: Styles.button.height,
    flex: 0
  },
  saveButton: {
    ...Styles.button,
    backgroundColor: Colors.success,
    width: SAVE_BUTTON_WIDTH,
  }
});