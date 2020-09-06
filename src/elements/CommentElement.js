// Imports
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    StyleSheet
} from 'react-native';

import Styles from '../constants/styles';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Comment box built with a large TextInput element
const CommentElement = props => {

    // Stores input value
    const [value, setValue] = useState('');

    // Submits empty string as initial answer
    useEffect(() => {
        // Send data through the onChange prop
        props.onChange(props.pageIndex, props.index, '');
    }, []);

    // Handles new text input
    const inputHandler = enteredValue => {
        // Stores new value in state
        setValue(enteredValue);
        // Updates answer in Form component
        props.onChange(props.pageIndex, props.index, enteredValue);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{props.title} </Text>
                <Text style={styles.subTitle}>(max. 240)</Text>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={inputHandler}
                placeholder={"Type anything..."}
                value={value}
                multiline={true}
                numberOfLines={6}
                maxLength={240}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: windowHeight * 0.02
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: windowHeight * 0.02
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 16
    },
    input: {
        backgroundColor: 'white',
        textAlignVertical: 'top',
        fontSize: 16,
        paddingVertical: windowHeight * 0.01,
        paddingHorizontal: windowWidth * 0.02,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: (windowHeight+windowWidth) * 0.01,
        ...Styles.shadow
    }
});

export default CommentElement;