/**
 * Mapping test module.
 * @module
 */

import axios from "axios";

import {
  MAPBOX_PUBLIC_TOKEN,
  MAPBOX_SECRET_KEY
} from "react-native-dotenv";
import { MapBoxMapper, Route } from "./mapping";
import testData from '../../test-data/utils/mapping';

jest.mock("axios");

describe("MapBoxMapper tests", () => {
  test("get a route from a list of coords", async () => {
    axios.get.mockResolvedValue(testData.mapboxMatchingRes);

    const mapper = new MapBoxMapper(MAPBOX_PUBLIC_TOKEN, MAPBOX_SECRET_KEY);

    const coords = testData.markers;

    const route = await mapper.route(coords);

    expect(route).toMatchObject(testData.route);
  });
});