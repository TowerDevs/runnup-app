import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MappingScreen from "../screens/MappingScreen";
import ActivityScreen from "../screens/ActivityScreen";
import MenuScreen from "../screens/MenuScreen";

import RegisterScreen from "../screens/RegisterScreen"; // move out of bottom-nav in production
import LoginScreen from "../screens/LoginScreen";

const { Navigator, Screen } = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

type Props = {
  navigation: {
    setOptions: Function;
  }
  route: { state: any; }
};

const BottomTabNav: FC<Props> = ({ navigation, route }) => {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Get Started",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
        }}
      />
      <Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          title: "Activity",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="chart-line" />,
        }}
      />
      <Screen
        name="Mapping"
        component={MappingScreen}
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="map" />,
        }}
      />
      <Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Register"
        }}
      />
      <Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login"
        }}
      />
      <Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: "Menu",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="menu" />,
        }}
      />
    </Navigator>
  );
}

const getHeaderTitle = ({ state }: { state: any }) => {
  const routeName = state?.routes[state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "How to get started";
    case "Mapping":
      return "Map a route";
    case "Activity":
      return "View your activity";
    case "Register":
      return "Create Account";
    case "Login":
      return "Login";
    case "Menu":
      return "Menu";
  }
}

export default BottomTabNav;