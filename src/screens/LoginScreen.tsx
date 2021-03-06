/**
 * Login screen
 * @module LoginScreen
 */

import React, { useState, FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Container, Content,
    Body, Right,
    H1,
    Form, Item, Label, Input, Text
} from "native-base";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/auth/actions";

import Colors from "../constants/Colors";

type Props = {
    navigation: {
        navigate: Function;
    };
    errors: Error;
    loginUser: Function
};

/**
 * LoginScreen is a screen component that let's user's login to their account
 * @param {Object} navigation - enables navigation to other screens
 */
const LoginScreen: FC<Props> = ({ navigation }) => {
    /* Local state */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[securePassword, togglePasswordSecurity] = useState(true);

    /* Store-derived state and props */
    const errors = useSelector((state) => state.errors);
    const dispatch = useDispatch();

    return (
        <Container>
            <Content>
                <Body>
                    <H1 style={styles.title}>Login</H1>
                </Body>

                <Form style={styles.form}>
                    <Body>
                        { errors.message ? <Text style={styles.error}>{errors.message}</Text> : null }
                    </Body>

                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCapitalize="none"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            autoCapitalize="none"
                            secureTextEntry={securePassword}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <Right>
                            <TouchableOpacity onPress={() => togglePasswordSecurity(!securePassword)}>
                                <MaterialCommunityIcons name={ securePassword ? "eye-off": "eye" } size={24} color="black" />
                            </TouchableOpacity>
                        </Right>
                    </Item>

                    <Body>
                        <TouchableOpacity
                            style={styles.ctaButton}
                            onPress={() => dispatch(loginUser({ email, password }))}
                        >
                            <Text style={styles.ctaText}>Login</Text>
                        </TouchableOpacity>
                    </Body>
                </Form>
                <Body>
                    <Text style={styles.small}>
                        Don&apos;t have an account?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.button}>Create Account</Text>
                    </TouchableOpacity>
                </Body>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 150
    },
    error: {
        color: Colors.danger,
        fontSize: 18
    },
    form: {
        marginTop: 75
    },
    ctaButton: {
        backgroundColor: Colors.primary,
        borderRadius: 2,
        padding: 13,
        marginTop: 30
    },
    ctaText: {
        color: "white",
        fontSize: 20
    },
    button: {
        color: Colors.primary,
        fontSize: 18
    },
    small: {
        marginTop: 125
    }
});

export default LoginScreen;