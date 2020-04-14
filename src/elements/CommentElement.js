// Imports
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    StyleSheet
} from 'react-native';

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
        paddingVertical: Dimensions.get('window').height * 0.05
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: Dimensions.get('window').height * 0.02
    },
    title: {
        fontSize: 18
    },
    subTitle: {
        fontSize: 16
    },
    input: {
        backgroundColor: 'white',
        textAlignVertical: 'top',
        fontSize: 16,
        paddingVertical: Dimensions.get('window').height * 0.01,
        paddingHorizontal: Dimensions.get('window').width * 0.02
    }
});

export default CommentElement;