import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import React, { useState, useEffect, FC } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import BottomTabNav from "./navigation/BottomTabNav";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

import { useDispatch } from "react-redux";
import { logErrors } from "./actions/errors";

const { Navigator, Screen } = createStackNavigator();

type Props = {
  skipLoadingScreen: boolean
};

const App: FC<Props> = ({ skipLoadingScreen }) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        SplashScreen.preventAutoHide();

        await Font.loadAsync({
          ...Icon.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
        dispatch(logErrors(e));
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !skipLoadingScreen) return null;

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer linking={LinkingConfiguration}>
        <Navigator>
          <Screen name="Root" component={BottomTabNav} />
        </Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
