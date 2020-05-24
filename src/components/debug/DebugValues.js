/**
 * DebugValues component
 * @module DebugValues
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

/**
 * DebugValues is a floating, untouchable view for showing debug values.
 * @param {object} props 
 */
export default function DebugValues({ values, style }) {
  return (
    <View style={[styles.container, style]} pointerEvents={"box-none"}>
      {Object.keys(values).map((key, index) => (
        <Text key={index} pointerEvents={"none"}>
          {`${key}: ${JSON.stringify(values[key])}`}
        </Text>
      ))}
    </View>
  )
}

DebugValues.propTypes = {
  values: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 99
  }
});