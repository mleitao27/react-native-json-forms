// Imports
import React, { useState, useEffect } from 'react';
import {
    Picker,
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Dropdown element built from picker
const DropdownElement = props => {

    // State to store selected option
    const [value, setValue] = useState('');

    // Sends default answer data
    useEffect(() => {
        props.onChange(props.pageIndex, props.index, '');
    }, []);

    // On picker option change
    const pickerHandler = enteredValue => {
        // Set state with new option
        setValue(enteredValue);
        // Send new option as new answer
        props.onChange(props.pageIndex, props.index, enteredValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Picker
                mode="dialog"
                selectedValue={value}
                onValueChange={pickerHandler}
            >
                <Picker.Item label={'-'} value={''} />
                {props.items.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={index} />)
                })}
            </Picker>
        </View>
    );
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
    }
});

export default DropdownElement;