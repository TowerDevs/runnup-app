/**
 * Location utils
 * @module
 */

import * as Location from 'expo-location';

/**
 * getLocation asks the user for location permissions and returns the location if granted.
 */
export const getLocation = async () => {
  let { status } = await Location.requestPermissionsAsync();
  let location = await Location.getCurrentPositionAsync({});
  return { status, location }
}