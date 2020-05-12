import React, { useState } from "react";
import {
    View,
    Button,
    Text,
    TextInput,
    StyleSheet
} from "react-native";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { loginUser } from "../actions/auth";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Login
            </Text>

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
                onPress={() => dispatch(loginUser({ email, password }))}
            />

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
    input: {

    },
    button: {

    }
});

export default LoginScreen;