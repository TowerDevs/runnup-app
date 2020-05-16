import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/auth";

import Colors from "../constants/Colors";
import Styles from "../constants/Styles";

const LoginScreen = ({ navigation }) => {
    /* Local state */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* Store-derived state and props */
    const errors = useSelector(state => state.errors);
    const dispatch = useDispatch();

    useEffect(() => {

    });

    return (
        <View style={styles.container}>

            { errors.message ? <Text style={styles.errorMsg}>{errors.message}</Text> : null }

            <Text style={Styles.label}>Email</Text>
            <TextInput
                style={Styles.input}
                onChange={e => setEmail(e.target.value)}
                value={email}
            />

            <Text style={Styles.label}>Password</Text>
            <TextInput
                style={Styles.input}
                onChange={e => setPassword(e.target.value)}
                value={password}
            />

            <Button
                style={styles.callToAction}
                title="Login"
                onPress={() => dispatch(loginUser({ email, password }))}
            />

            <Text style={Styles.small}>
                Don&apos;t have an account?
            </Text>

            <Button
                style={Styles.button}
                title="Create an Account"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
};

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: Styles.centeredView,
    errorMsg: {
        color: Colors.danger,
        fontSize: 18
    },
    callToAction: {
        fontSize: 24
    }
});

export default LoginScreen;