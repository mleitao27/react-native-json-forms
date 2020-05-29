// Imports
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";

import Colors from "../constants/colors";

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
                    <View key={index} style={styles.radioContainer} >
                        <TouchableOpacity onPress={() => radioHandler(item)}>
                            <Icon name={item === value ? "ios-radio-button-on" : "ios-radio-button-off"} size={24} color={Colors.primary} />
                        <Text> {item}</Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    )
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingVertical: Dimensions.get('window').height * 0.05
    },
    title: {
        fontSize: 18,
        marginBottom: Dimensions.get("window").height * 0.02,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default RadioElement;