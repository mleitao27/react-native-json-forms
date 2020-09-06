// Imports
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FileElement = props => {

    const [fileName, setFileName] = useState('');

    const chooseFile = async () => {
        const file = await DocumentPicker.getDocumentAsync();
        // Check size
        const options = { encoding: FileSystem.EncodingType.Base64 };
        //const fileData = await FileSystem.readAsStringAsync(file.uri, options);
        setFileName(file.name);
        props.onChange(props.pageIndex, props.index, 'file in base64');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.content}>
                <Text style={styles.text}>{fileName}</Text>
                <CustomButton
                    title={'Choose File'}
                    onPress={chooseFile}
                    backgroundColor={'white'}
                    textColor={Colors.primary}
                    width={windowWidth*0.5}
                    height={windowHeight*0.05}
                    borderRadius={(windowWidth+windowHeight)*0.01}
                    shadow={true}
                />
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: windowHeight * 0.02
    },
    content: {
        height: windowHeight*0.1,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginBottom: windowHeight * 0.02,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        flex: 1,
        paddingHorizontal: windowWidth * 0.02
    },
    button: {
        borderColor: Colors.primary,
        borderWidth: 1,
        paddingHorizontal: windowHeight * 0.01,
        paddingVertical: windowHeight * 0.01,
        borderRadius: 5,
        backgroundColor: Colors.primary
    },
    buttonText: {
        fontSize: 16,
        color: Colors.secondary
    }
});

export default FileElement;