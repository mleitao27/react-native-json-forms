// Imports
import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

import Colors from '../constants/colors';
import Styles from '../constants/styles';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Displays expression inside a box in the form screen
const ExpressionElement = props => {

    // On first render send default value in answer data in the form component
    useEffect(() => {
        // Send data through the onChange prop
        props.onChange(props.pageIndex, props.index, '');
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.expressionContainer}>
                <Text style={styles.text}>{props.expression}</Text>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: windowHeight * 0.02
    },
    expressionContainer: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: (windowHeight+windowWidth) * 0.01,
        ...Styles.shadow,
        backgroundColor: 'white',
        paddingHorizontal: windowWidth * 0.02,
        paddingVertical: windowHeight * 0.02
    },
    title: {
        fontSize: 18,
        marginBottom: windowHeight * 0.02,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16
    }
});

export default ExpressionElement;