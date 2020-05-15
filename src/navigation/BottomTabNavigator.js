import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { FontAwesome5, Feather } from '@expo/vector-icons';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MappingScreen from '../screens/MappingScreen';
import ActivityScreen from '../screens/ActivityScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Icon={FontAwesome5} name="home" />,
        }}
      />
      <BottomTab.Screen
        name="Mapping"
        component={MappingScreen}
        options={{
          title: 'Map',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Icon={FontAwesome5} name="map" />,
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          title: "Activity",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Icon={Feather} name="activity" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Mapping':
      return 'Map a route';
    case "Activity":
      return "View your activity"
  }
}
