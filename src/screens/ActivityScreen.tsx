import React, { useState, FC } from "react";
import { View, StyleSheet } from "react-native";

type Props = {

};

const ActivityScreen: FC<Props> = () => {
    const [showMore, toggleShow] = useState(false); // state to control the extension of the Logs component

    return (
        <View style={styles.container}>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default ActivityScreen;