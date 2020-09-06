// Imports
import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Image Element inserted by user built with react native Image component
const ImageElement = props => {
    
    // State that stores image dimensions
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    // On first render send default value in answer data in the form component
    useEffect(() => { 
        Image.getSize(props.url, (width, height) => {setHeight(height); setWidth(width);});
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: props.url }} style={{width, height}}/>
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
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ImageElement;