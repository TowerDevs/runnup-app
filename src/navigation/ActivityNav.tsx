import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

/* Screens */
import ActivityScreen from "../screens/ActivityScreen";
import IconButton from "../components/IconButton";
import HeaderMenu from "../components/HeaderMenu";

const { Navigator, Screen } = createStackNavigator();

const INITIAL_ROUTE_NAME= "";

type Props = {

};

/**
 * Stack Navigator for the ActivityScreen and it's child screens
 */
const ActivityNav: FC<Props> = ({ navigation }) => {
    return (
        <Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            screenOptions={{
                // headerLeft: () => <HeaderMenu onPress={navigation.toggleDrawer()} />
            }}
        >
            <Screen
                name="Activity"
                component={ActivityScreen}
                options={{
                    headerTitle: "Activity"
                }}
            />
        </Navigator>
    );
};

export default ActivityNav;