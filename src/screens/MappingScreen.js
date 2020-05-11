import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions, View } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}/>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});