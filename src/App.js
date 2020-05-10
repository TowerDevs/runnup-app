import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

import { connect } from "react-redux";
import { logErrors } from "./actions/errors";
import PropTypes from "prop-types";

// TODO: Import firebase once config is tested

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

class App extends Component {
  state = {
    isLoadingComplete: false
  };

  static propTypes = {
    logErrors: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { logErrors } = this.props;

    const loadResourcesAndDataAsync = async () => {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
        logErrors(e);
      } finally {
        this.setState({ isLoadingComplete: true });
        SplashScreen.hide();
      };
    };

    loadResourcesAndDataAsync();
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

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
  }
};

const mapStateToProps = state => ({});

const mapDispatchToProps = { logErrors };

export default connect(mapStateToProps, mapDispatchToProps)(App);