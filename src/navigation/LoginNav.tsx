import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";

const { Navigator, Screen } = createStackNavigator();

const INITIAL_ROUTE_NAME = "Login";

type Props = {

};

const LoginNav: FC<Props> = () => {
    return (
        <Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            screenOptions={{

            }}
        >
            <Screen
                name="Login"
                component={LoginScreen}
                options= {{
                    
                }}
            />
            <Screen
                name=""
                component={}
                options= {{

                }}
            />
        </Navigator>
    );
};

export default LoginNav;