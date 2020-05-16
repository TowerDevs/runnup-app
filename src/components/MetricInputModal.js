/**
 * MetricInputModal component
 * @module MetricInputModal
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, TextInput, StyleSheet } from 'react-native';

import STYLES from '../constants/Styles';
import METRICS from '../constants/Metrics';

const EDITABLE_METRICS = Object.keys(METRICS).filter((key) => METRICS[key].editable);

export default function MetricInputModal({ entering, value, onChangeText, onEndEditing }) {
  return (
    <Modal transparent={true}>
      <View style={STYLES.centeredView}>
        <View style={styles.modal}>
          <Text style={{ marginBottom: 10 }}>
            Enter a target {entering}
          </Text>
          <TextInput
            autoFocus={true}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            returnKeyType="done"
            onEndEditing={onEndEditing}
          />
        </View>
      </View>
    </Modal>
  )
}

MetricInputModal.propTypes = {
  entering: PropTypes.oneOf(EDITABLE_METRICS).isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onEndEditing: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
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
  }
});