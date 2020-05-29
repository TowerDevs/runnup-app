/**
 * MetricInputModal component
 * @module MetricInputModal
 */

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Picker, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

import STYLES from '../constants/Styles';
import COLORS from '../constants/Colors';
import { METRIC_TYPES } from '../constants/Metrics';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MINUTES = (
  () => {
    let ret = [];
    for (let i = 0; i < 60; i++) {
      ret.push(i);
    }
    return ret;
  }
)();

const SECONDS = (
  () => {
    let ret = [];
    for (let i = 0; i < 60; i++) {
      ret.push(i);
    }
    return ret;
  }
)();

type Props = {
  entering: string;
  initialValue: string;
  type: string;
  onEndEditing: (value: number) => void;
}

// FIXME: should be split into two modules depending on type
export default function MetricInputModal({ entering, initialValue, type, onEndEditing }: Props) {
  const [value, setValue] = useState<string>(initialValue);
  const [numMinutes, setNumMinutes] = useState<number>(0);
  const [numSeconds, setNumSeconds] = useState<number>(0);

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
          <View>
            <View style={styles.pickerRow}>
              <Text style={styles.pickerHeader}>Minutes</Text>
              <Text style={styles.pickerHeader}>Seconds</Text>
            </View>
            <View style={styles.pickerRow}>
              <Picker
                style={styles.picker}
                selectedValue={numMinutes}
                onValueChange={(itemValue) => { setNumMinutes(itemValue) }}
                >
                {MINUTES.map((n) => (
                  <Picker.Item key={n} value={n} label={String(n)} />
                  ))}
              </Picker>
              <Picker
                style={styles.picker}
                selectedValue={numSeconds}
                onValueChange={(itemValue) => { setNumSeconds(itemValue) }}
              >
                {SECONDS.map((n) => (
                  <Picker.Item key={n} value={n} label={String(n)} />
                ))}
              </Picker>
            </View>
            <View onTouchEnd={() => {
              onEndEditing(60 * numMinutes + numSeconds);
            }}>
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={{ color: COLORS.white }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        console.error(`${type} should be one of METRIC_TYPES`);
        break;
    }
  })(type);

  return (
    <Modal transparent={true}>
      <BlurView intensity={100} style={StyleSheet.absoluteFill}>
        <View style={STYLES.centeredView}>
          <View style={styles.modal}>
            <Text style={{ marginBottom: 10 }}>
              Enter a target {entering}
            </Text>
            {InputComponent}
          </View>
        </View>
      </BlurView>
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
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  picker: {
    width: 100,
  },
  pickerHeader: {
    fontWeight: "bold"
  },
  confirmButton: {
    ...STYLES.button,
    backgroundColor: COLORS.success
  }
});