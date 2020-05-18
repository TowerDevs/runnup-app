/**
 * MappingScreen component
 * @module MappingScreen
 */

import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';

import Layout from '../constants/Layout';
import Metrics from '../components/Metrics'
import DebugValues from '../components/debug/DebugValues';

const INITIAL_LATITUDE_DELTA = 0.03

// Enum of the states that `hasLocation` can have
const HAS_LOCATION = {
  REQUESING: 0,
  DENIED: 1,
  GRANTED: 2
}

/**
 * MappingScreen is a screen component for mapping routes.
 */
export default function MappingScreen() {
  const [location, setLocation] = useState(null);
  const [hasLocation, setHasLocation] = useState(HAS_LOCATION.REQUESING);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setHasLocation(HAS_LOCATION.DENIED);
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setHasLocation(HAS_LOCATION.GRANTED);
    })();
  });

  // Calculate initial region
  let initialRegion = {};
  switch (hasLocation) {
    case HAS_LOCATION.GRANTED:
      if (location !== null) {
        initialRegion = {
          latitude: location.coords.latitude - 0.004, // FIXME: Fix the height of the map rather than moving the region center
          longitude: location.coords.longitude,
          latitudeDelta: INITIAL_LATITUDE_DELTA,
          longitudeDelta: INITIAL_LATITUDE_DELTA * (Layout.window.width / Layout.window.height)
        };
      }
      break;
    case HAS_LOCATION.DENIED:
      // TODO: Try to use IP to find approx location
      break;
    default:
      break;
  }

  return (
    <View style={styles.container}>
      <DebugValues
        values={{
          ...location?.coords,
          hasLocation
        }}
      />
      {hasLocation == HAS_LOCATION.REQUESING &&
        <Text>Requesting location...</Text>
      }
      {(hasLocation === HAS_LOCATION.GRANTED || hasLocation === HAS_LOCATION.DENIED) &&
        <MapView
          style={styles.mapStyle}
          initialRegion={initialRegion}
        />
      }
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