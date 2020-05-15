import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  align: {
    start: {
      alignItems: "flex-start"
    },
    center: {
      alignItems: "center"
    },
    end: {
      alignItems: "flex-end"
    },
    stretch: {
      alignItems: "stretch"
    }
  },
  direction: {
    row: {
      flexDirection: "row"
    },
    rowRev: {
      flexDirection: "row-reverse"
    },
    col: {
      flexDirection: "row"
    },
    colRev: {
      flexDirection: "row-reverse"
    }
  },
  justifyContent: {
    start: {
      justifyContent: "flex-start"
    },
    center: {
      justifyContent: "center"
    },
    end: {
      justifyContent: "flex-end"
    },
    between: {
      justifyContent: "space-between"
    },
    around: {
      justifyContent: "space-around"
    }
  },
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
