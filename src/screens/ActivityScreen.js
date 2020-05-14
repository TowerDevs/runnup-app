import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import RunLogs from "../components/RunLogs";

const ActivityScreen = () => {
    const [showMore, toggleShow] = useState(false); // state to control the extension of the Logs component

    return (
        <View style={styles.container}>
            <RunLogs/>
        </View>
    );
};

ActivityScreen.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default ActivityScreen;