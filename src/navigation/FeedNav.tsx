import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FeedScreen from "../screens/FeedScreen";

const { Navigator, Screen } = createStackNavigator();

const INITIAL_ROUTE_NAME = "Feed";

type Props = {

};

/**
 * Stack Navigator for the FeedScreen and it's child screens
 */
const FeedNav: FC<Props> = () => {
    return (
        <Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            screenOptions={{

            }}
        >
            <Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    headerTitle: "Feed"
                }}
            />
        </Navigator>
    );
};

export default FeedNav;