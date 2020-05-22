/** Mapping module
 * @module
 */

import axios from 'axios';
import polyline from '@mapbox/polyline';

import { MAPBOX_DOMAIN, MAPBOX_VERSION } from 'react-native-dotenv';

export class Coord {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

/**
 * Route class.
 */
export class Route {

  /**
   * Initialize route.
   * @param {Object} path GeoJSON object containing the path of the route
   * @param {float} distance Distance of the route in KM
   */
  constructor(path, distance) {
    this.path = path;
    this.distance = distance;
  }
}

// interface Mapper {
//   route(coords) {}
// }

/**
 * MapBoxMapper is a `Mapper` implementation that uses MapBox.
 */
export class MapBoxMapper {
  /**
   * Initialize MapboxMapper.
   * @param {string} publicToken Mapbox public token
   * @param {string} secretKey Mapbox secret key
   */
  constructor(publicToken, secretKey) {
    this.publicToken = publicToken;
    this.secretKey = secretKey;
  }

  /**
   * Route a path through an array of coordinates.
   * @param {Array} coords Array of `Coords` to route
   * @returns {Route}
   */
  async route(coords) {
    // TODO: Expand this into more lines, I thought this would look better but it doesn't
    const endpoint = `\
${MAPBOX_DOMAIN}/matching/${MAPBOX_VERSION}/mapbox/driving/\
${coords.reduce((p, c) => p += `${c.longitude},${c.latitude};`, "").slice(0, -1)}\
?access_token=${this.publicToken}`;

    try {
      const res = await axios.get(endpoint);
      
      const match = res.data.matchings[0];
      const path = polyline.toGeoJSON(match.geometry);
      const distance = match.distance;
      return new Route(path, distance);
    } catch (error) {
      console.error(error)
    }
  }
}