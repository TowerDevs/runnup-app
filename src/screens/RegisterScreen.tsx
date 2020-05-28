/**
 * Register screen
 * @module RegisterScreen
 */

import React, { useState, FC } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content,
    Body, Right,
    H1,
    Form, Item, Label, Input, Text
} from "native-base";

import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../store/auth/actions";

import Colors from "../constants/Colors";
import Styles from "../constants/Styles";

type Props = {
    navigation: {
        navigate: Function;
    };
    errors: Error;
    registerUser: Function;
};

/**
 * RegisterScreen is a screen component that let's new user's create an account
 * @param {Object} navigation - enables navigation to other screens
 */
const RegisterScreen: FC<Props> = ({ navigation }) => {
    /* Local state */
    const [first, setFirstName] = useState("");
    const [last, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [securePassword, togglePasswordSecurity] = useState(true);

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
                <Form style={styles.form}>
                    <Body>
                        { errors.message ? <Text style={styles.error}>{errors.message}</Text> : null }
                    </Body>
                    <Item floatingLabel>
                        <Label>First Name</Label>
                        <Input
                            onChange={e => setFirstName(e.target.value)}
                            value={first}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Last Name</Label>
                        <Input
                            onChange={e => setLastName(e.target.value)}
                            value={last}
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
                            onPress={() => dispatch(registerUser({ first, last, email, password }))}
                        >
                            <Text style={styles.ctaText}>Create Account</Text>
                        </TouchableOpacity>
                    </Body>
                </Form>

                <Body>
                    <Text style={styles.small}>
                        Already have an account?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.button}>Login</Text>
                    </TouchableOpacity>
                </Body>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 120
    },
    form: {
        marginTop: 50
    },
    brandTitle: {
        // fontSize: 100
    },
    error: {
        color: Colors.danger,
        fontSize: 18
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
        marginTop: 50
    }
});

export default RegisterScreen;