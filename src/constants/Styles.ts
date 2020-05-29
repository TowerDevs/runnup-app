/**
 * Styles constants
 * @module
 */

import { ViewStyle } from "react-native";

type StylesType = {
  centeredView: ViewStyle;
  h1: any;
  h2: any;
  h3: any;
  h4: any;
  label: any;
  input: any;
  button: any;
  small: any;
};

const Styles: StylesType = {
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontSize: 40,
  },
  h2: {
    fontSize: 34,
  },
  h3: {
    fontSize: 28,
  },
  h4: {
    fontSize: 22,
  },
  label: {
    fontSize: 18,
  },
  input: {},
  button: {
    borderRadius: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  small: {},
};

export default Styles;
