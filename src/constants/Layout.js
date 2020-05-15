import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  alignContent: {
    start: {
      alignContent: "flex-start"
    },
    center: {
      alignContent: "center"
    },
    end: {
      alignContent: "flex-end"
    },
    stretch: {
      alignContent: "space-between"
    },
    between: {
      alignContent: "space-between"
    },
    around: {
      alignContent: "space-around"
    }
  },
  alignItems: {
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
  alignSelf: {
    start: {
      alignSelf: "flex-start"
    },
    center: {
      alignSelf: "center"
    },
    end: {
      alignSelf: "flex-end"
    },
    stretch: {
      alignSelf: "stretch"
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
      flexDirection: "column"
    },
    colRev: {
      flexDirection: "column-reverse"
    }
  },
  flexWrap: {
    flexWrap: "wrap"
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
  position: {
    absolute: {
      position: "absolute"
    },
    relative: {
      position: "relative"
    }
  },
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  zIndex: {
    under: {
      zIndex: -1
    },
    over: {
      zIndex: 1
    }
  }
};
