import React, { Component, ReactChild, } from "react";

import { StyleSheet, View, Text } from "react-native";

import { connect } from "react-redux";
import { logErrors } from "../store/errors/actions";

type Props = {
    children: ReactChild;
    logErrors: Function;
};

type State = {
    readonly hasError: boolean
};

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    };

    componentDidCatch(error: object | null, errorInfo: object) {
        const { logErrors } = this.props;
        logErrors(error, errorInfo);
    };

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (!hasError) return children;

        return (
            <View style={styles.container}>
                <Text>Something went wrong.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center"
    }
});

export default connect(null, { logErrors })(ErrorBoundary);