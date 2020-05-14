import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { useSelector, useDispatch } from "react-redux"
import { fetchRuns } from "../actions/runs";
import { clearErrors } from "../actions/errors";
import PropTypes from "prop-types";

const RunLogs = () => {
    const error = useSelector(state => state.error);
    const run = useSelector(state => state.run);
    const dispatch = useDispatch();

    useEffect(async () => {
        await dispatch(clearErrors());
        await dispatch(fetchRuns());
    });

    return (
        <View style={styles.container}>
            {   run.isLoading ? <Text>Loading...</Text> :
                error ? <Text>error.message</Text> :
                run.data.map(run => {
                    return run
                })
            }
        </View>
    );
};

RunLogs.propTypes = {
    error: PropTypes.object.isRequired,
    run: PropTypes.object.isRequired,
    fetchRuns: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {

    }
});

export default RunLogs;