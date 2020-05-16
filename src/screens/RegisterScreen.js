import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/auth";

import Colors from "../constants/Colors";
import Styles from "../constants/Styles";

const RegisterScreen = ({ navigation }) => {
    /* Constants */

    /* Local state */
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* Store-derived state and dispatch */
    const errors = useSelector(state => state.errors);
    const dispatch = useDispatch();

    /* Effects */

    /* Rendering */
    return (
        <View style={styles.container}>
            { errors.message ? <Text style={styles.errorMsg}>{errors.message}</Text> : null }

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                onChange={e => setName(e.target.value)}
                value={name}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                onChange={e => setEmail(e.target.value)}
                value={email}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChange={e => setPassword(e.target.value)}
                value={password}
            />

            <Button
                style={styles.button}
                title="Create Account"
                onPress={() => dispatch(registerUser({ name, email, password }))}
            />

            <Text style={styles.small}>
                Already have an account?
            </Text>

            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
};

RegisterScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: Styles.centeredView,
    errorMsg: {
        color: Colors.danger
    },
    callToAction: Styles.button,
    label: {

    },
    input: {

    },
    small: {

    }
});

export default RegisterScreen;