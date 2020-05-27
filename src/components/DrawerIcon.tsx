import React, { FC } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

type Props = {
    name: string,
};

/**
 * DrawerIcon is used in the navigation bar.
 *
 * @param {string} name - Name of the icon to use. See https://icons.expo.fyi/ for a directory of icons.
 */
const DrawerIcon: FC<Props> = ({ name }) => {
    return (
        <Icon
            name={name}
            size={30}
            style={{ marginBottom: -3 }}
        />
    );
};

export default DrawerIcon;