import React, { useState } from "react";
import {
    View,
    Button,
    Text,
    TextInput,
    StyleSheet
} from "react-native";

// import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/auth";

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Create Account
            </Text>

            { error ? <Text>{error.message}</Text> : null }

            <TextInput
                style={styles.input}
                onChange={e => setName(e.target.value)}

            />

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
                title="Create Account"
                onPress={() => dispatch(registerUser({ name, email, password }))}
            />

            <Text>
                Already have an account?
            </Text>

        </View>
    );
};

RegisterScreen.propTypes = {

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

export default RegisterScreen;