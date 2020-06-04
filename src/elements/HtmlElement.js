// Imports
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { WebView } from 'react-native-webview';

import Colors from '../constants/colors';

// Displays expression inside a box in the form screen
const HtmlElement = props => {

    // State to open modal with full scrollable html from webview
    const [focused, setFocused] = useState(false);

    // Display fixed height webview with html in form page
    if (!focused)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{props.title}</Text>
                <TouchableOpacity style={styles.htmlContainer} onPress={() => setFocused(true)}>
                    <WebView
                        originWhitelist={['*']}
                        source={{html:props.html}}
                        style={styles.html}
                    />
                </TouchableOpacity>
            </View>
        );
    // Show entire html
    else
        return (
            <Modal transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setFocused(false)}>
                                <Icon name='ios-close' size={56} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <WebView
                            originWhitelist={['*']}
                            source={{html:props.html}}
                            style={styles.html}
                        />
                    </View>
                </View>
            </Modal>
        );
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: Dimensions.get('window').height * 0.02
    },
    expressionContainer: {
        borderWidth: 1,
        borderColor: Colors.secondary,
        backgroundColor: Colors.secondary,
        paddingHorizontal: Dimensions.get('window').width * 0.02,
        paddingVertical: Dimensions.get('window').height * 0.02
    },
    title: {
        fontSize: 18,
        marginBottom: Dimensions.get('window').height * 0.02
    },
    html: {
        height: Dimensions.get('window').height * 0.3
    },
    htmlContainer: {
        borderWidth: 1,
        borderColor: Colors.secondary
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').height*0.8,
        borderRadius: 20,
        overflow: 'hidden'
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: Dimensions.get('window').width*0.05
    }
});

export default HtmlElement;