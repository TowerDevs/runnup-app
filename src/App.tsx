import React, { FC, useState, useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

// External Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Visuals
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

// Navigation
import AppNav from "./navigation/AppNav";
import AuthNav from "./navigation/AuthNav";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

// Store and Dispatch
import { useSelector, useDispatch } from "react-redux";
import { logErrors } from "./store/errors/actions";
import ErrorBoundary from "./components/ErrorBoundary";

// Token Mgmt
import * as SecureStore from "expo-secure-store";
import { AUTH_ERROR, REGISTER_FAILED, DEREGISTER_FAILED, LOGIN_FAILED, LOGOUT_SUCCESS,  } from "./store/auth/types";

const TERMINATE_TOKEN = AUTH_ERROR || REGISTER_FAILED || DEREGISTER_FAILED || LOGIN_FAILED || LOGOUT_SUCCESS;
const { Navigator, Screen } = createStackNavigator();

type Props = {
  skipLoadingScreen: boolean
};

const App: FC<Props> = ({ skipLoadingScreen }) => {
  /* Local state */
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  /* Store-derived entities */
  const errors = useSelector((state) => state.errors);
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /* Effects */
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
        dispatch(logErrors(e, null));
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  useEffect(() => {
    if(errors.id === TERMINATE_TOKEN) SecureStore.deleteItemAsync("accessToken");
  }, [errors.id]);

  /* Rendering */
  if (!isLoadingComplete && !skipLoadingScreen) return null;

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Navigator headerMode="none">
            { true ?
              <Screen name="App" component={AppNav} />
            :
              <Screen name="Auth" component={AuthNav} />
            }
          </Navigator>
        </NavigationContainer>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
