// Imports
import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Colors from '../constants/colors';

const FileElement = props => {

    const [fileName, setFileName] = useState('');

    const chooseFile = async () => {
        const file = await DocumentPicker.getDocumentAsync();
        setFileName(file.name);
        // Check size
        const options = { encoding: FileSystem.EncodingType.Base64 };
        const fileData = await FileSystem.readAsStringAsync(file.uri, options);
        props.onChange(props.pageIndex, props.index, 'file in base64');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.content}>
                <TouchableOpacity onPress={chooseFile} style={styles.button}>
                    <Text style={styles.buttonText}>Choose File</Text>
                </TouchableOpacity>
                <Text style={styles.text}>{fileName}</Text>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingVertical: Dimensions.get('window').height * 0.05
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginBottom: Dimensions.get('window').height * 0.02
    },
    text: {
        fontSize: 16,
        flex: 1,
        paddingHorizontal: Dimensions.get('window').width * 0.02
    },
    button: {
        borderColor: Colors.primary,
        borderWidth: 1,
        paddingHorizontal: Dimensions.get('window').height * 0.01,
        paddingVertical: Dimensions.get('window').height * 0.01,
        borderRadius: 5,
        backgroundColor: Colors.primary
    },
    buttonText: {
        fontSize: 16,
        color: Colors.secondary
    }
});

export default FileElement;