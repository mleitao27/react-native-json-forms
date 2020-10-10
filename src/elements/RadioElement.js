// Imports
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from "../constants/colors";

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Radio choice inserted by user built with react native Icon and TouchableOpacity component
const RadioElement = props => {

    // State that stores radio input
    const [value, setValue] = useState(false);

    // On first render send default value in answer data in the form component
    useEffect(() => {
        props.onChange(props.pageIndex, props.index, "");
    }, []);

    // When radio input is inserted, state is changed and it updates answer data
    const radioHandler = enteredValue => {
        setValue(enteredValue);
        props.onChange(props.pageIndex, props.index, enteredValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.items.map((item, index) => {
                return (
                    <TouchableOpacity key={index} style={styles.radioContainer} onPress={() => radioHandler(item)}>
                        <Ionicons name={item === value ? "ios-radio-button-on" : "ios-radio-button-off"} size={24} color={Colors.sec} />
                        <Text> {item}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: windowHeight * 0.02
    },
    title: {
        fontSize: 18,
        marginBottom: windowHeight * 0.02,
        fontWeight: 'bold'
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default RadioElement;