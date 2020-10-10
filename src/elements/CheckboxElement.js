// Imports
import React, { useState, useEffect } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';

import Colors from '../constants/colors';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Checkbox list that allows selection of multiple options
const CheckboxElement = props => {

    // Variable used to update option's state
    let auxOptions = [];
    // State that stores the state of each option
    const [options, setOptions] = useState(() => {
        for (var i = 0; i < props.items.length; i++) {
            auxOptions[i] = false;
            return auxOptions;
        }
    });
    // Dummy state used to force render
    const [dummyState, setDummyState] = useState(false);
    // Var that will contain the list of options to display
    const form = [];

    // Initially sets all options to false and sends an empty array as answer data
    useEffect(() => {
        // Send data through the onChange prop
        props.onChange(props.pageIndex, props.index, '');
    }, []);

    // Called everytime an options is pressed 
    const onChange = index => {
        // Array to save as answer data
        var data = [];

        // Fetch options from the state
        auxOptions = options;
        // Change pressed option
        auxOptions[index] = !auxOptions[index];

        // Adds true options (checked) to the answer array
        auxOptions.map((option, index) => {
            if (option) data.push(props.items[index]);
        });

        // Saves new state
        setOptions(auxOptions);
        // Sends answer data to the form component (parent)
        props.onChange(props.pageIndex, props.index, data);
        // Forces render
        setDummyState(!dummyState);
    };

    // Iterates through the options list received as prop
    props.items.map((i, index) => {
        let icon = <Ionicons name={options[index] ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'} size={24} color={Colors.primary} />;
        if (props.icon === 'square') icon = <MaterialIcons name={options[index] ? 'check-box':'check-box-outline-blank'} size={24} color={Colors.primary} />;
        // Adds element, selected or not depending on the state
        form.push(
            <TouchableOpacity key={index} style={styles.item} onPress={onChange.bind(this, index)}>
                {icon}
                <Text style={styles.options}> {i}</Text>
            </TouchableOpacity>
        );
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {form}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: windowHeight * 0.02
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginBottom: windowHeight * 0.02,
        fontWeight: 'bold'
    },
    options: {
        fontSize: 16
    }
});

export default CheckboxElement;