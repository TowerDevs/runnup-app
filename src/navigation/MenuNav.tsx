import React, { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerIcon from "../components/DrawerIcon";

import FriendsNav from "./FriendsNav";
import SettingsNav from "./SettingsNav";

const { Navigator, Screen } = createDrawerNavigator();

const INITIAL_ROUTE_NAME = "Friends";

type Props = {

};

/**
 * Drawer Navigator for the menu screens and it's child screens
 */
const MenuNav: FC<Props> = ({ navigation }) => {
    return (
        <Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            screenOptions={{

            }}
        >
            <Screen name="Friends"
                component={FriendsNav}
                options={{
                    drawerIcon: () => <DrawerIcon name="human-male-male"/>
                }}
            />
            <Screen
                name="Settings"
                component={SettingsNav}
                options={{
                    drawerIcon: () => <DrawerIcon name="settings"/>
                }}
            />
        </Navigator>
    );
};

export default MenuNav;