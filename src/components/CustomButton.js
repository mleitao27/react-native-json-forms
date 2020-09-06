/* 
 * CustomButton (Component)
 * Description : Button used throughout the application
 * Props :
 * - title : button content
 * - textColor : color of the button's content
 * - backgroundColor : color of the button's background
 * - onPress : function executed when button pressed
 */

// Imports
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform, 
    Dimensions
} from 'react-native';

import Styles from 'react-native-json-forms/src/constants/styles';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/************************************************
 * 
 * COMPONENT
 * 
 ************************************************/
const CustomButton = props => {

    /************************************************
     * PRE-RENDER
     ************************************************/
    // By default the button is a TouchableOpacity
    let ButtonComponent = TouchableOpacity;

    // If android and version > = 21 button is TouchableNativeFeedback
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    // If btn title is a string wrap it in a <Text/> if is an obj wrap in <View/>
    // Allows for btn content to be an image or icon
    let buttonContent = <View/>;
    if (typeof props.title === 'string')
        buttonContent = (
            <Text
                style={{
                    ...styles.buttonText,
                    color: props.textColor,
                    textDecorationLine: typeof props.underline !== 'undefined' && props.underline=== true ? 'underline' : 'none',
                    fontWeight: typeof props.bold !== 'undefined' && props.bold=== true ? 'bold' : 'normal'
                }}
            >
                {props.title}
            </Text>);
    else if (typeof props.title === 'object')
        buttonContent = <View style={{...styles.buttonText, color: props.textColor}}>{props.title}</View>;

    /************************************************
     * RENDER
     ************************************************/
    return(
        <View style={typeof props.shadow !== 'undefined' && props.shadow === true ? Styles.shadow : {}}>
            <View style={{backgroundColor: props.backgroundColor, ...styles.buttonContainer, ...typeof props.shadow !== 'undefined' && props.shadow === true && Platform.OS === 'android' ? {...Styles.shadow, borderRadius:15} : {}}}>
                <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
                    <View 
                        style={{
                            ...styles.button, 
                            backgroundColor: props.backgroundColor, 
                            width: typeof props.width !== 'undefined' ? props.width : windowWidth * 0.3, 
                            height: typeof props.height !== 'undefined' ? props.height : windowHeight * 0.06,
                            borderRadius: typeof props.borderRadius !== 'undefined' ? props.borderRadius : 15,
                        }}
                    >
                        {buttonContent}
                    </View>
                </ButtonComponent>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: (windowWidth + windowHeight) * 0.015,

    },
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden'
    }
});

// Export component
export default CustomButton;