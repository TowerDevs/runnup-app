import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LiveScreen from "../screens/LiveScreen";

const { Navigator, Screen } = createStackNavigator();

const INITIAL_ROUTE_NAME = "Live";

type Props = {

};

/**
 * Stack Navigator for the LiveScreen and it's child screens
 */
const LiveNav: FC<Props> = () => {
    return (
        <Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            screenOptions={{

            }}
        >
            <Screen
                name="Live"
                component={LiveScreen}
                options={{
                    headerTitle: "Live Run"
                }}
            />
        </Navigator>
    );
};

export default LiveNav;