import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

TabBarIcon.propTypes = {
  name: PropTypes.string,
  focused: PropTypes.bool
}