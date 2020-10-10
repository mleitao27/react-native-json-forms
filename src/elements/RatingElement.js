// Imports
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import Colors from "../constants/colors";

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Rating inserted by user built with react native Icon and TouchableOpacity component
const RatingElement = props => {

    // State that stores rating input 
    const [value, setValue] = useState(0);

    // On first render send default value in answer data in the form component
    useEffect(() => {
        // Send data through the onChange prop
        props.onChange(props.pageIndex, props.index, 0);
    }, []);

    // When rating is inserted, state is changed and it updates answer data
    const RatingHandler = enteredValue => {
        if (enteredValue === value) setValue(0);
        else setValue(enteredValue);
        props.onChange(props.pageIndex, props.index, enteredValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.ratingContainer}>
                <TouchableOpacity onPress={() => RatingHandler(1)}>
                    <Ionicons name={"ios-star"} size={36} color={value < 1 ? Colors.secondary : Colors.primary} /></TouchableOpacity>
                <TouchableOpacity onPress={() => RatingHandler(2)}>
                    <Ionicons name={"ios-star"} size={36} color={value < 2 ? Colors.secondary : Colors.primary} /></TouchableOpacity>
                <TouchableOpacity onPress={() => RatingHandler(3)}>
                    <Ionicons name={"ios-star"} size={36} color={value < 3 ? Colors.secondary : Colors.primary} /></TouchableOpacity>
                <TouchableOpacity onPress={() => RatingHandler(4)}>
                    <Ionicons name={"ios-star"} size={36} color={value < 4 ? Colors.secondary : Colors.primary} /></TouchableOpacity>
                <TouchableOpacity onPress={() => RatingHandler(5)}>
                    <Ionicons name={"ios-star"} size={36} color={value < 5 ? Colors.secondary : Colors.primary} /></TouchableOpacity>
            </View>
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
    },
    ratingContainer: {
        flexDirection: 'row',
        width: windowWidth * 0.5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});

export default RatingElement;