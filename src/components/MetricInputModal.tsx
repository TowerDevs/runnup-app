/**
 * MetricInputModal component
 * @module MetricInputModal
 */

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';

import STYLES from '../constants/Styles';
import { METRIC_TYPES } from '../constants/Metrics';

type Props = {
  entering: string;
  initialValue: string;
  type: string;
  onEndEditing: (value: number) => void;
}

export default function MetricInputModal({ entering, initialValue, type, onEndEditing }: Props) {
  const [value, setValue] = useState<string>(initialValue);

  const InputComponent = ((type) => {
    switch (type) {
      case METRIC_TYPES.NUMBER:
        return (
          <TextInput
            autoFocus={true}
            value={value}
            style={styles.input}
            returnKeyType="done"
            onChangeText={(text) => {
              const numericRegex = /^([0-9]{0,8})+$/
              if (numericRegex.test(text)) {
                setValue(text);
              }
            }}
            onEndEditing={() => { onEndEditing(parseInt(value)) }}
            keyboardType={'numeric'}
          />
        );
      case METRIC_TYPES.TIME:
        return (
          <View />
        );
      default:
        console.error(`${type} should be one of METRIC_TYPES`);
        break;
    }
  })(type);

  return (
    <Modal transparent={true}>
      <View style={STYLES.centeredView}>
        <View style={styles.modal}>
          <Text style={{ marginBottom: 10 }}>
            Enter a target {entering}
          </Text>
          {InputComponent}
        </View>
      </View>
    </Modal>
  )
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