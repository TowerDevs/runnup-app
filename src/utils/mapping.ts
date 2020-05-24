/** Mapping module
 * @module
 */

import axios, { AxiosResponse } from "axios";
import polyline from "@mapbox/polyline";

import { MAPBOX_DOMAIN, MAPBOX_VERSION } from "react-native-dotenv"; //
import { CustomError } from "../errors";
import { installWebGeolocationPolyfill } from "expo-location";

export class Coord {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

/**
 * Routes have waypoints, geometry, and distance.
 */
export class Route {
  public waypoints: Coord[];
  public geometry: object;
  public distance: number;

  /**
   * Initialize route.
   * @param {Object} geometry GeoJSON object containing the geometry of the route
   * @param {float} distance Distance of the route in KM
   */
  constructor(
    waypoints: Coord[] = [],
    geometry: object = {},
    distance: number = 0.0
  ) {
    this.waypoints = waypoints;
    this.geometry = geometry;
    this.distance = distance;
  }
}

class MapperAPIError extends CustomError {
  public status: number;
  public response: string;

  constructor(status: number, response: string) {
    super(`${status}: ${response}`);
    this.status = status;
    this.response = response;
  }
}

class MapperInputError extends CustomError {}

/**
 * Mapper interface. Used to map routes.
 */
abstract class Mapper {
  abstract route(coords: Coord[]): Promise<Route>;
}

/**
 * MapBoxMapper is a `Mapper` implementation that uses MapBox.
 */
export class MapBoxMapper extends Mapper {
  private publicToken: string;
  private secretKey: string;

  /**
   * Initialize MapboxMapper.
   * @param {string} publicToken Mapbox public token
   * @param {string} secretKey Mapbox secret key
   */
  constructor(publicToken: string, secretKey: string) {
    super();
    this.publicToken = publicToken;
    this.secretKey = secretKey;
  }

  /**
   * Route a path through an array of coordinates.
   * @param {Array} coords Array of `Coords` to route
   * @returns {Route}
   */
  async route(coords: Coord[]): Promise<Route> {
    let coordsCopy = coords.slice();

    // Handle only one coord given
    let oneCoord = false;
    if (coordsCopy.length == 1) {
      oneCoord = true;
      coordsCopy.push({
        longitude: coordsCopy[0].longitude,
        latitude: coordsCopy[0].latitude,
      });
    }

    // TODO: Expand this into more lines, I thought this would look better but it doesn't
    // FIXME: Use the MapBox SDK instead
    const endpoint = `\
${MAPBOX_DOMAIN}/matching/${MAPBOX_VERSION}/mapbox/driving/\
${coordsCopy
  .reduce((p, c) => (p += `${c.longitude},${c.latitude};`), "")
  .slice(0, -1)}\
?geometries=polyline\
&radiuses=${coordsCopy.reduce((p) => (p += "15.0;"), "").slice(0, -1)}\
&access_token=${this.publicToken}`;

    let res: AxiosResponse;
    try {
      res = await axios.get(endpoint);
    } catch (e) {
      throw new MapperAPIError(e.status, e.response);
    }

    const { code } = res.data;

    switch (code) {
      case "Ok": {
        const route = res.data.matchings[0];
        const geometry = polyline.toGeoJSON(route.geometry);
        let { tracepoints } = res.data;
        const waypoints = tracepoints.map((v: any) => {
          return {
            longitude: v.location[0],
            latitude: v.location[1],
          };
        });

        const distance = route.distance;

        if (oneCoord) {
          return new Route([waypoints[0]]);
        }

        return new Route(waypoints, geometry, distance);
      }
      case "NoMatch":
      case "NoSegment":
      case "TooManyCoordinates":
        throw Error(code);
      default:
        return new Route();
    }
  }
}
