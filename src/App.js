import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

import { useDispatch } from "react-redux";
import { logErrors } from "./actions/errors";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const App = ({ skipLoadingScreen }) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
        dispatch(logErrors(e));
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      };
    };

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !skipLoadingScreen) return null;

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer linking={LinkingConfiguration}>
        <Stack.Navigator>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
