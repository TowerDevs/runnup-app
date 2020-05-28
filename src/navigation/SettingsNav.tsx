import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

/* Screens */
import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePassword";

const { Navigator, Screen } = createStackNavigator();

const INITIAL_ROUTE_NAME = "Profile";

type Props = {

};

const SettingsNav: FC<Props> = () => {
    return (
        <Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            screenOptions={{

            }}
        >
            <Screen
                name="Profile"
                component={ProfileScreen}
                options={{

                }}
            />
            <Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{

                }}
            />
        </Navigator>
    );
};

export default SettingsNav;