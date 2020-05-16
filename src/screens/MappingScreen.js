/**
 * MappingScreen component
 * @module MappingScreen
 */

import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

import Layout from '../constants/Layout';
import Metrics from '../components/Metrics'

/**
 * MappingScreen is a screen component for mapping routes.
 */
export default function MappingScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}/>
      <Metrics 
        style={styles.metricContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Layout.window.width,
    height: Layout.window.height,
  },
  metricContainer: {
    position: 'absolute'
  }
});