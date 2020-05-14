import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

import Layout from '../constants/Layout';
import { MetricsContainer } from '../components/Metrics'

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}/>
      <MetricsContainer 
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