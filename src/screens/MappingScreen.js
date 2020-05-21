/**
 * MappingScreen component
 * @module MappingScreen
 */

import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import MapView, { Marker, MAP_TYPES, PROVIDER_DEFAULT, PROVIDER_GOOGLE, UrlTile } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";

import Layout from '../constants/Layout';
import Metrics from '../components/Metrics'
import DebugValues from '../components/debug/DebugValues';
import { getLocation } from '../utils/location';

// Sets the zoom, see: 
const INITIAL_LATITUDE_DELTA = 0.03

// Enum of the states that `hasLocation` can have
const HAS_LOCATION = {
  REQUESTING: 0,
  DENIED: 1,
  GRANTED: 2
}

/**
 * MappingScreen is a screen component for mapping routes.
 */
export default function MappingScreen() {
  /** State */
  const [location, setLocation] = useState(null);
  const [hasLocation, setHasLocation] = useState(HAS_LOCATION.REQUESTING);
  const [region, setRegion] = useState(null); // eslint-disable-line no-unused-vars
  const [initialRegion, setInitialRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  

  /** Effects */
  // Update location every update
  useEffect(() => {
    (async () => {
      let { status, location } = await getLocation();
      if (status !== "granted") {
        console.log("Location not granted...");
        setHasLocation(HAS_LOCATION.DENIED);
      }

      setLocation(location)
      setHasLocation(HAS_LOCATION.GRANTED)
    })();
  }, []);

  // Set the region to the current location when granted
  // TODO: Move to separate map component, this should be the default functionality
  // FIXME: Currently the initial region is not centered because the map goes under the metrics component
  useEffect(() => {
    if (hasLocation == HAS_LOCATION.GRANTED) {
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LATITUDE_DELTA * (Layout.window.width / Layout.window.height)
      });
    } else if (hasLocation == HAS_LOCATION.DENIED) {
      // TODO: If location is denied try to use IP to estimate location
      // Currently focuses on Toronto
      setInitialRegion({
        latitude: 43.6532,
        longitude: 79.3832,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LATITUDE_DELTA * (Layout.window.width / Layout.window.height)
      });
    }
  }, [hasLocation]);

  // TODO: Use layout effect to resize map depending on the height of the metrics drawer
  // useLayoutEffect(() => {
  // }, []);

  /** Methods */
  const addMarker = ({ nativeEvent }) => {
    setMarkers([...markers, {
      coordinate: nativeEvent.coordinate
    }]);
  }
  
  const removeMarker = (i) => {
    setMarkers(markers.filter((_, index) => i !== index ));
  }

  return (
    <View style={styles.container}>
      <DebugValues
        values={{
          ...location?.coords,
          hasLocation
        }}
      />
      {hasLocation == HAS_LOCATION.REQUESTING &&
        <Text>Requesting location...</Text>
      }
      {((hasLocation === HAS_LOCATION.GRANTED || hasLocation === HAS_LOCATION.DENIED) && initialRegion !== null) &&
        <MapView
          style={styles.mapStyle}
          initialRegion={initialRegion}
          // showsUserLocation={true}
          onPress={addMarker}
          rotateEnabled={false}
          pitchEnabled={false}
          zoomTapEnabled={false}
        >
          <UrlTile
            urlTemplate={"http://b.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            shouldReplaceMapContent={true}
          />
          {/* Location marker */}
          <Marker
            coordinate={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude
            }}
            image={require("../assets/images/person-icon-50x50.png")}
          />

          {/* Route markers */}
          {markers.map((marker, index) => (
            <Marker
              draggable
              key={index}
              coordinate={marker.coordinate}
              onPress={e => {
                e.stopPropagation(); 
                removeMarker(index); 
              }}
            />
          ))}
        </MapView>
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
    width: "100%",
    height: "100%",
  },
  metricContainer: {
    position: 'absolute'
  }
});