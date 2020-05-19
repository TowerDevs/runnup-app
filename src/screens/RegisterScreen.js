/**
 * Register screen
 * @module RegisterScreen
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Button } from "react-native";
import { Container, Content, Body, H1, Form, Item, Label, Input, Text } from "native-base";

import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/data/auth";

import Colors from "../constants/Colors";
import Styles from "../constants/Styles";

/**
 * RegisterScreen is a screen component that let's new user's create an account
 * @param {Object} navigation - enables navigation to other screens
 */
const RegisterScreen = ({ navigation }) => {
    /* Local state */
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* Store-derived state and dispatch */
    const errors = useSelector(state => state.errors);
    const dispatch = useDispatch();

    /* Rendering */
    return (
        <Container>
            <Content style={styles.container}>
                <Body>
                    <Text>* Logo here *</Text>
                    <H1 style={styles.brandTitle}>Runnup</H1>
                </Body>
                { errors.message ? <Text style={styles.error}>{errors.message}</Text> : null }
                <Form style={styles.form}>
                    <Item floatingLabel>
                        <Label>First Name</Label>
                        <Input
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Last Name</Label>
                        <Input
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCapitalize="none"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                    </Item>

                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input
                            autoCapitalize="none"
                            passwordRules={true}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </Item>

                    <Button
                        title="Create Account"
                        onPress={() => dispatch(registerUser({ firstName, lastName, email, password }))}
                    />
                </Form>

                <Body>
                    <Text style={styles.small}>
                        Already have an account?
                    </Text>

                    <Button
                        title="Login"
                        onPress={() => navigation.navigate("Login")}
                    />
                </Body>
            </Content>
        </Container>
    );
};

RegisterScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    errors: PropTypes.object,
    registerUser: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    brandTitle: {
        // fontSize: 100
    },
    error: {
        color: Colors.danger
    },
    callToAction: {
        color: Colors.primary,
        marginTop: 20
    },
    label: {

    },
    input: {

    },
    small: {
        marginTop: 180
    }
});

export default RegisterScreen;