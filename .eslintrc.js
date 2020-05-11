module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "__CLIENT__": true,
        "__SERVER__": true,
        "__DEV__": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "parser": "babel-eslint",
    "plugins": [
        "react",
    ],
    "rules": {
        "strict": 0,
        "react/display-name": 0,
        "react/prop-types": 0,
    }
};