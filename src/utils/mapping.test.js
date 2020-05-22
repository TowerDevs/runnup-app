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

jest.mock("axios");

describe("MapBoxMapper tests", () => {
  test("get a route from a list of coords", async () => {
    axios.get.mockResolvedValue({
      data: {
        "matchings": [
          {
            "confidence": 0.7117873999232142,
            "geometry": "usdkG~j`dNtC~TPCdB_@nEt^BTxf@kOF[kAcIsKzCa@IwAiKYKgBbAEIaAwA{Bw@}BFcErACMkAsJc@g@aIbC",
            "duration": 502.9,
            "distance": 2873.2000000000003
          }
        ],
        "code": "Ok"
      }
    });

    const targetRoute = new Route(
      {
        "type": "LineString",
        "coordinates": [
          [
            -79.46944,
            43.93803
          ],
          [
            -79.47296,
            43.93728
          ],
          [
            -79.47294,
            43.93719
          ],
          [
            -79.47278,
            43.93668
          ],
          [
            -79.47785,
            43.93564
          ],
          [
            -79.47796,
            43.93562
          ],
          [
            -79.47534,
            43.92925
          ],
          [
            -79.4752,
            43.92921
          ],
          [
            -79.47358,
            43.92959
          ],
          [
            -79.47436,
            43.93161
          ],
          [
            -79.47431,
            43.93178
          ],
          [
            -79.47234,
            43.93222
          ],
          [
            -79.47228,
            43.93235
          ],
          [
            -79.47262,
            43.93287
          ],
          [
            -79.47257,
            43.9329
          ],
          [
            -79.47213,
            43.93323
          ],
          [
            -79.47185,
            43.93385
          ],
          [
            -79.47189,
            43.93448
          ],
          [
            -79.47231,
            43.93546
          ],
          [
            -79.47224,
            43.93548
          ],
          [
            -79.47038,
            43.93586
          ],
          [
            -79.47018,
            43.93604
          ],
          [
            -79.47084,
            43.93765
          ]
        ]
      },
      2873.2000000000003
    );

    const mapper = new MapBoxMapper(MAPBOX_PUBLIC_TOKEN, MAPBOX_SECRET_KEY);

    const coords = [
      {
        latitude: 43.93801532684113,
        longitude: -79.46943100810549,
      },
      {
        latitude: 43.93720855624094,
        longitude: -79.47282643758491,
      },
      {
        latitude: 43.93556581497048,
        longitude: -79.47781805006815,
      },
      {
        latitude: 43.929197730556105,
        longitude: -79.47542388299473,
      },
      {
        latitude: 43.92958813082905,
        longitude: -79.47358308472604,
      },
      {
        latitude: 43.93174341954367,
        longitude: -79.47427197242168,
      },
      {
        latitude: 43.93289016396868,
        longitude: -79.4725553998031,
      },
      {
        latitude: 43.935533284982164,
        longitude: -79.47226177553938,
      },
      {
        latitude: 43.936037497801635,
        longitude: -79.47017252597058,
      },
      {
        latitude: 43.93765582941938,
        longitude: -79.47080494746172,
      }
    ];

    const route = await mapper.route(coords);

    expect(route).toMatchObject(targetRoute);
  });
});