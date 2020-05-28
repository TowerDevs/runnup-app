import * as SecureStore from "expo-secure-store";

export interface Config {
    headers: any;
};

/**
 * Configure the authorization token for private requests
 *
 * @returns {Object} - the configuration properties
 */
export const tokenConfig = () => {
    // const token = getState().auth.token;
    const token = SecureStore.getItemAsync("accessToken");

    const config: Config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (token) config.headers["Authorization"] = `Basic ${token}`;

    return config;
};