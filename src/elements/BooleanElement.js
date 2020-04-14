// Imports
import React, { useState, useEffect } from 'react';
import {
    Switch,
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

import Colors from '../constants/colors';

// Boolean switch built with react native Switch component
const BooleanElement = props => {

    // State that stores switch value
    const [state, setState] = useState(false);

    // On first render send default value in answer data in the form component
    useEffect(() => {
        // Send data through the onChange prop
        props.onChange(props.pageIndex, props.index, false);
    }, []);

    // When switch is pressed toogle state and updates answer data
    const toggleSwitch = newState => {
        setState(!state);
        props.onChange(props.pageIndex, props.index, !state);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Switch
                onValueChange={toggleSwitch}
                value={state}
                thumbColor={state ? Colors.primary : 'white'}
                trackColor={{ false: Colors.secondary, true: Colors.secondary }}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Dimensions.get('window').height * 0.05

    },
    title: {
        fontSize: 18
    }
});

export default BooleanElement;