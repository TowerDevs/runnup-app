import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RunScreen from "../screens/RunScreen";

const { Navigator, Screen } = createStackNavigator();

const INITIAL_ROUTE_NAME = "Run";

type Props = {

};

/**
 * Stack Navigator for the RunScreen and it's child screens
 */
const RunNav: FC<Props> = () => {
    return (
        <Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            screenOptions={{

            }}
        >
            <Screen
                name="Run"
                component={RunScreen}
                options={{
                    headerTitle: "Run"
                }}
            />
        </Navigator>
    );
};

export default RunNav;