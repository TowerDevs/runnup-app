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
   * @param {Object} geometry GeoJSON object containing the geometry of the route
   * @param {float} distance Distance of the route in KM
   */
  constructor(waypoints, geometry, distance) {
    this.waypoints = waypoints;
    this.geometry = geometry;
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
?geometries=polyline\
&radiuses=${coords.reduce((p) => p += "15.0;", "").slice(0, -1)}\
&access_token=${this.publicToken}`;

    try {
      const res = await axios.get(endpoint);

      const route = res.data.matchings[0];
      const geometry = polyline.toGeoJSON(route.geometry);
      let { tracepoints } = res.data;
      const waypoints = tracepoints.map((v) => {
        return {
          longitude: v.location[0],
          latitude: v.location[1]
        }
      });

      const distance = route.distance;
      return new Route(waypoints, geometry, distance);
    } catch (error) {
      // TODO: Handle error if MapBox returns non-200
      console.error(error)
    }
  }
}