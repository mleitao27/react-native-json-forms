// Imports
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";

// Matrix Element that allows to select a column by each row, with Radio Button Components
const MatrixElement = props => {

    // Variable used to update option's state
    let auxOptions = [];
    // State that stores the state of each option
    const [options, setOptions] = useState(() => {
        for (var i = 0; i < props.rows.length; i++)
            auxOptions[i] = { row: props.rows[i], column: '' };
        return auxOptions;
    });

    // Dummy state used to force render
    const [dummyState, setDummyState] = useState(false);

    // Initially sets all options to false and sends an empty array as answer data
    useEffect(() => {
        // Send data through the onChange prop
        props.onChange(props.pageIndex, props.index, options);
    }, []);


    // When radio input is inserted, state is changed and it updates answer data
    const matrixHandler = (index, column) => {
        // Fetch options from the state
        auxOptions = options;

        // Change text input item 
        auxOptions[index].column = column;

        // Saves new state
        setOptions(auxOptions);

        // Sends answer data to the form component (parent)
        props.onChange(props.pageIndex, props.index, auxOptions);

        // Forces render
        setDummyState(!dummyState);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.headerContainer}>
                {props.columns.map((column, indexc) => {
                    return (
                        <Text key={indexc}>{column}</Text>
                    );
                })}
            </View>
            {props.rows.map((row, indexr) => {
                return (
                    <View key={indexr} style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Text>{row}</Text>
                        <View key={indexr} style={styles.bodyContainer}>
                            {props.columns.map((column, indexc) => {
                                return (
                                    <View key={indexc} >
                                        <TouchableOpacity onPress={matrixHandler.bind(this, indexr, column)}>
                                            <Icon 
                                            name={options[indexr].column === column ? "ios-radio-button-on" : "ios-radio-button-off"} 
                                            size={24} 
                                            color={Colors.primary} />
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: Dimensions.get('window').height * 0.02
    },
    title: {
        fontSize: 18,
        marginBottom: Dimensions.get("window").height * 0.02,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: Dimensions.get("window").width * 0.17

    },
    bodyContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: Dimensions.get("window").width * 0.10,
        width: Dimensions.get("window").width * 0.65
    },
});

export default MatrixElement;