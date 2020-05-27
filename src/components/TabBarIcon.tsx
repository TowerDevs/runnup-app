import React, { FC } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import Colors from "../constants/Colors";

type Props = {
    name: string,
    focused: boolean
};

/**
 * TabBarIcon is used in the navigation bar.
 *
 * @param {string} name - Name of the icon to use. See https://icons.expo.fyi/ for a directory of icons.
 * @param {boolean} focused - Indicates whether or not the icon is focused. The styling of the icon changes if it's focuesed.
 */
const TabBarIcon: FC<Props> = ({ name, focused }) => {
  return (
    <Icon
      name={name}
      size={30}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

export default TabBarIcon;
