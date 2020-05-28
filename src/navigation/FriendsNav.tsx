import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FriendsScreen from "../screens/FriendsScreen";

const { Navigator, Screen } = createStackNavigator();

type Props = {

};

/**
 * Stack Navigator for the FeedScreen and it's child screens
 */
const FriendsNav: FC<Props> = () => {
    return (
        <Navigator>
            <Screen
                name="Friends"
                component={FriendsScreen}
                options={{
                    headerTitle: "Friends"
                }}
            />
        </Navigator>
    );
};

export default FriendsNav;