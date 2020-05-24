/**
 * Mapping test module.
 * @module
 */

import axios from "axios";

import { MAPBOX_PUBLIC_TOKEN, MAPBOX_SECRET_KEY } from "react-native-dotenv";
import { MapBoxMapper } from "./mapping";
import testData from "../../test-data/utils/mapping";

jest.mock("axios");

describe("MapBoxMapper tests", () => {
  test("get a route from a list of coords", async () => {
    axios.get.mockResolvedValue(testData.mapboxMatchingRes);

    const mapper = new MapBoxMapper(MAPBOX_PUBLIC_TOKEN, MAPBOX_SECRET_KEY);

    const coords = testData.markers;

    const route = await mapper.route(coords);

    expect(route).toMatchObject(testData.route);
  });

  test("get a route from one coord", async () => {
    axios.get.mockResolvedValue({
      data: {
        matchings: [
          {
            confidence: 0,
            geometry: "usdkG~j`dN??",
            legs: [
              { summary: "", weight: 0, duration: 0, steps: [], distance: 0 },
            ],
            weight_name: "routability",
            weight: 0,
            duration: 0,
            distance: 0,
          },
        ],
        tracepoints: [
          {
            alternatives_count: 1,
            waypoint_index: 0,
            matchings_index: 0,
            distance: 1.4992016097252698,
            name: "Grand Oak Drive",
            location: [-79.469436, 43.938028],
          },
          {
            alternatives_count: 1,
            waypoint_index: 1,
            matchings_index: 0,
            distance: 1.4992016097252698,
            name: "Grand Oak Drive",
            location: [-79.469436, 43.938028],
          },
        ],
        code: "Ok",
      },
    });

    const mapper = new MapBoxMapper(MAPBOX_PUBLIC_TOKEN, MAPBOX_SECRET_KEY);

    const coords = testData.markers.slice(0, 1);

    const route = await mapper.route(coords);

    expect(route).toMatchObject({
      waypoints: [{ longitude: -79.469436, latitude: 43.938028 }],
      geometry: {},
      distance: 0,
    });
  });
});
