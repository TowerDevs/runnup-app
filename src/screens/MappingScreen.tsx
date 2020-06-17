/**
 * MappingScreen component
 * @module MappingScreen
 */

import React, { useEffect, useState, useLayoutEffect } from 'react';
import MapView, { Marker, MapEvent, Geojson } from 'react-native-maps';
import { StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  MAPBOX_PUBLIC_TOKEN,
  MAPBOX_SECRET_KEY
} from "react-native-dotenv";

import Layout from '../constants/Layout';
import Metrics from '../components/Metrics';
import Styles from '../constants/Styles';
import DebugValues from '../components/debug/DebugValues';
import { getLocation } from '../utils/location';
import { MapBoxMapper, Route } from '../utils/mapping';
import { LocationData } from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sets the zoom, see: 
const INITIAL_LATITUDE_DELTA = 0.01

// Enum of the states that `hasLocation` can have
const HAS_LOCATION = {
  REQUESTING: 0,
  DENIED: 1,
  GRANTED: 2
}

const mapper = new MapBoxMapper(MAPBOX_PUBLIC_TOKEN, MAPBOX_SECRET_KEY);

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

/**
 * MappingScreen is a screen component for mapping routes.
 */
export default function MappingScreen() {
  /** State */
  const [metricsCollapsed, setMetricsCollapsed] = useState(false);
  const [metricsHeight, setMetricsHeight] = useState(0.0);
  const [location, setLocation] = useState<LocationData>();
  const [hasLocation, setHasLocation] = useState(HAS_LOCATION.REQUESTING);
  const [initialRegion, setInitialRegion] = useState<Region>();
  const [route, setRoute] = useState(new Route());

  /** Effects */
  // Get user location on mount
  useEffect(() => {
    getLocation()
      .then(({ status, location }) => {
        if (status !== "granted") {
          console.log("Location not granted...");
          setHasLocation(HAS_LOCATION.DENIED);
        }

        setLocation(location)
        setHasLocation(HAS_LOCATION.GRANTED)
      });
  }, []);

  // Set the region to the current location when granted
  // TODO: Move to separate map component, this should be the default functionality
  // FIXME: Currently the initial region is not centered because the map goes under the metrics component
  useEffect(() => {
    if (location !== undefined) {
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
    }
  }, [hasLocation, location]);

  // Resize map depending on the height of the metrics drawer
  useLayoutEffect(() => {

  }, []);

  /** Methods */
  const addMarker = async ({ nativeEvent }: MapEvent) => {
    try {
      const newRoute = await mapper.route([
        ...route.waypoints, {
          ...nativeEvent.coordinate
        }
      ]);
      setRoute(newRoute);
    } catch (e) {
      // FIXME: Flash error message
      console.log("Mapper error: ", e);
    }
  }

  const removeMarker = async (i: number) => {
    const newWaypoints = route.waypoints.filter((_, index) => i !== index);
    if (newWaypoints.length > 0) {
      try {
        const newRoute = await mapper.route(newWaypoints);
        setRoute(newRoute);
      } catch (e) {
        // FIXME: Flash error message
        console.log("Mapper error: ", e);
      }
    } else {
      setRoute(new Route());
    }
  }

  const moveMarker = async ({ nativeEvent }: MapEvent, i: number) => {
    try {
      const newWaypoints = route.waypoints.map((val, index) => {
        if (index == i) {
          return {
            ...nativeEvent.coordinate
          }
        }
        return val;
      });
      const newRoute = await mapper.route(newWaypoints);
      setRoute(newRoute);
    } catch (e) {
      // FIXME: Flash error message
      console.log("Mapper error: ", e);
    }
  }

  return (
    <View style={styles.container}>
      <DebugValues
        values={{
          ...location?.coords,
          hasLocation,
          waypoints: route.waypoints
        }}
      />
      {hasLocation == HAS_LOCATION.REQUESTING &&
        <Text>Requesting location...</Text>
      }
      {((hasLocation === HAS_LOCATION.GRANTED || hasLocation === HAS_LOCATION.DENIED) && initialRegion !== null) &&
        <View style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}>
          <MapView
            style={[styles.mapStyle]}
            initialRegion={initialRegion}
            showsUserLocation={true}
            onPress={addMarker}
            rotateEnabled={false}
            pitchEnabled={false}
            zoomTapEnabled={false}
          >
            {/* Route markers */}
            {route !== null &&
              route.waypoints.map((marker, index) => {
                return (
                  <Marker
                    draggable
                    key={index}
                    image={require("../assets/images/filled-circle-50x50.png")}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    onPress={e => {
                      e.stopPropagation();
                      removeMarker(index);
                    }}
                    onDragEnd={(e) => moveMarker(e, index)}
                  />
                )
              })
            }

            {/* Route path */}
            {route !== null &&
              <Geojson
                geojson={{
                  features: [{
                    "type": "Feature",
                    "geometry": route.geometry,
                  }]
                }}
              />
            }
          </MapView>

          {/* FIXME: If the TouchableOpacity is not wrapped in a view it's bounding box isn't sized right */}
          <View style={styles.expandButton} onTouchEnd={() => { setMetricsCollapsed(!metricsCollapsed) }}>
            <TouchableOpacity>
              {metricsCollapsed ?
                <FontAwesome name="angle-up" size={24} color="black" />
                :
                <FontAwesome name="angle-down" size={24} color="black" />
              }
            </TouchableOpacity>
          </View>
        </View>
      }
      <Metrics
        route={route}
        collapsed={metricsCollapsed}
        onLayout={(event: LayoutChangeEvent) => { setMetricsHeight(event.nativeEvent.layout.height) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  expandButton: {
    ...Styles.button,
    backgroundColor: "#fff",
    width: 50,
    marginLeft: 10,
    marginBottom: 30,
  }
});