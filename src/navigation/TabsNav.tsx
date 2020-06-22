import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* Components */
import TabBarIcon from "../components/TabBarIcon";

/* Screens */
import ActivityNav from "./ActivityNav";
import FeedNav from "./FeedNav";
import RunNav from "./RunStack";
import MappingScreen from "../screens/MappingScreen";
import MenuNav from "./MenuNav";

// dummy
import HomeScreen from "../screens/HomeScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = "Mapping";

type Props = {
    navigation: {

    }
};


// TODO: Change initial route name to Run after the respective is screen is completed

const BottomTabNav: FC<Props> = ({ navigation }) => {
    return (
        <Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            screenOptions={{

            }}
        >
            <Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
                }}
            />
            <Screen
                name="Activity"
                component={ActivityNav}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="chart-line" />,
                }}
            />
            <Screen
                name="Feed"
                component={FeedNav}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="file-document-box" />,
                }}
            />
            {/* <Screen
                name="Run"
                component={RunNav}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="run" />,
                }}
            /> */}
            <Screen
                name="Mapping"
                component={MappingScreen}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="map" />,
                }}
            />
            <Screen
                name="Menu"
                component={MenuNav}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="menu" />,
                }}
            />
        </Navigator>
    );
};

export default BottomTabNav;