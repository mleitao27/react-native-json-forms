// Imports
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Picker
} from 'react-native';

// Matrix Element that allows to select a value for each column by each row, with a dropdown menu
const MatrixDropdownElement = props => {

    // Variable used to update option's state
    let auxOptions = [];

    // Dummy state used to force render
    const [dummyState, setDummyState] = useState(false);

    // State that stores the state of each option, having a 2D array for the rows and columns
    const [options, setOptions] = useState(() => {
        for (var i = 0; i < props.rows.length; i++)
            auxOptions[i] = [];
        for (var i = 0; i < props.rows.length; i++)
            for (var j = 0; j < props.columns.length; j++)
                auxOptions[i][j] = { row: props.rows[i], column: props.columns[j].name, value: "" };
        return auxOptions;
    });


    // Initially sets all options to false and sends an empty array as answer data
    useEffect(() => {
        // Send data through the onChange prop
        props.onChange(props.pageIndex, props.index, options);
    }, []);


    // When matrix input is inserted, state is changed and it updates answer data
    const matrixHandler = (indexr, indexc, row, column, enteredText) => {

        // Fetch options from the state
        auxOptions = options;

        // Change text input item 
        auxOptions[indexr][indexc] = { row: row, column: column.name, value: enteredText };

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
                        <Text key={indexc}>{column.name}</Text>
                    );
                })}
            </View>
            {props.rows.map((row, indexr) => {
                return (
                    <View key={indexr} style={{ flexDirection: "row", alignItems: "center" }} >
                        <Text> {row}</Text>
                        <View key={indexr} style={styles.bodyContainer}>
                            {props.columns.map((column, indexc) => {
                                return (
                                    <View key={indexc} style={{ width: 80 }}>
                                        <Picker
                                            mode="dialog"
                                            selectedValue={options[indexr][indexc].value}
                                            onValueChange={matrixHandler.bind(this, indexr, indexc, row, column)}>
                                            <Picker.Item label={'-'} value={''} />
                                            {props.choices.map((choice, index) => {
                                                return (<Picker.Item label={String(choice)} value={choice} key={index} />)
                                            })}
                                        </Picker>
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
        marginLeft: Dimensions.get("window").width * 0.030,
        width: Dimensions.get("window").width * 0.80
    },
});

export default MatrixDropdownElement;