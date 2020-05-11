import * as React from 'react';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';

/**
 * TabBarIcon is used in the navigation bar.
 * 
 * @param {object} props
 */
export default function TabBarIcon({ Icon, name, focused }) {
  return (
    <Icon
      name={name}
      size={30}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}


TabBarIcon.propTypes = {
  /**
   * Icon type to display in the tab bar. As of @expo/vector-icons@10.2.0
   * the available types are ["AntDesign", "Entypo", "EvilIcons", "Feather",
   * "FontAwesome", "FontAwesome5", "Fontisto", "Foundation", "Ionicons", 
   * "MaterialCommunityIcons", "MaterialIcons", "Octicons", "SimpleLineIcons",
   * "Zocial"].
   */
  Icon: PropTypes.any.isRequired,
  /**
   * Name of the icon to use.
   * 
   * See https://icons.expo.fyi/ for a directory of icons.
   */
  name: PropTypes.string,
  /**
   * Indicates whether or not the icon is focused. The styling of the icon
   * changes if it's focuesed.
   */
  focused: PropTypes.bool
}