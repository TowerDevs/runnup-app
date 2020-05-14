import React, { useState, useEffect } from "react";
import {
    View,
    Button,
    Text,
    TextInput,
    StyleSheet
} from "react-native";

// import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/auth";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Login
            </Text>

            { error ? <Text style={styles.error}>{error.message}</Text> : null }

            <TextInput
                style={styles.input}
                onChange={e => setEmail(e.target.value)}

            />

            <TextInput
                style={styles.input}
                onChange={e => setPassword(e.target.value)}

            />

            <Button
                style={styles.button}
                title="Login"
                onPress={() => dispatch(loginUser({ email, password }))}
            />

            <Text>
                Don&apos;t have an account?
            </Text>

        </View>
    );
};

LoginScreen.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {

    },
    logo: {

    },
    error: {

    },
    input: {

    },
    button: {

    }
});

export default LoginScreen;