export interface Config {
    header: object;
};

/**
 * @desc Configure the authorization token for private requests
 * @param {function} getState - function to retrieve the token from the auth reducer
 * @returns {Object} - the configuration properties
 */
export default (getState: Function) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (token) config.headers["Authorization"] = `Basic ${token}`;

    return config;
};