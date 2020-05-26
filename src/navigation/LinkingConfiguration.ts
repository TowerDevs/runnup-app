import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Register: 'register',
        Login: 'login',
        Home: 'home',
        Mapping: 'mapping',
        Activity: 'activity'
      },
    },
  },
};
