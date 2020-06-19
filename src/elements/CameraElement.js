// Imports
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Modal,
    Button,
    Image,
    ImageBackground,
    StyleSheet
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

// Allow to take photos, store them im the gallery, with preview and send base64 data
const CameraElement = props => {

    // Camera and camera roll permissions
    const [cameraPermission, setCameraPermission] = useState(null);
    const [cameraRollPermission, setCameraRollPermission] = useState(null);

    // Camera type
    const [type, setType] = useState(Camera.Constants.Type.back);

    // Flash type
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

    // Camera
    const [camera, setCamera] = useState(null);

    // To activate camera modal
    const [photoTaken, setPhotoTaken] = useState(null);

    // To allow photo validation after taking it
    const [validatingPhoto, setValidatingPhoto] = useState(false);

    // Taken photo uri
    const [photoUri, setPhotoUri] = useState('');

    // On first render
    useEffect(() => {
        (async () => {
            // Get camera and camera roll permissions
            const permissions = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
            setCameraPermission(permissions.permissions.camera.status === 'granted');
            setCameraRollPermission(permissions.permissions.cameraRoll.status === 'granted');
            props.onChange(props.pageIndex, props.index, '');
        })();
    }, []);

    // When the take picture btn is pressed
    const takePicture = async () => {
        // Set options (after picture taken and base64 encoding)
        const options = { onPictureSaved: saveInGallery, base64: false }
        // Take photo
        if (camera) {
            let photo = await camera.takePictureAsync(options);
        }
    };

    // After taking picture copy it from expo cache to gallery
    const saveInGallery = async (photo) => {
        // If camera roll permissions
        if (cameraRollPermission === true) {
            // Save to gallery
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            // Store uri in state
            setPhotoUri(photo.uri);
            // Go to taken photo mode
            setPhotoTaken(true);
            // Go to photo validation mode
            setValidatingPhoto(true);
        }
    };

    // Before giving permission
    if (cameraPermission === null) {
        return <View />;
    }
    // Permission denied
    else if (cameraPermission === false) {
        return <Text>No access to camera</Text>;
    }
    // Permission granted
    else {
        // Before taking any photo
        if (photoTaken === null) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>{props.title}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setPhotoTaken(false)}>
                        <Ionicons name='ios-camera' size={72} color={Colors.secondary} />
                    </TouchableOpacity>
                </View>
            );
        }
        // After taking photo
        else if (photoTaken) {
            // Validate photo in other modal
            if (validatingPhoto)
                return (
                    <Modal>
                        <ImageBackground style={{ flex: 1 }} source={{ uri: photoUri }}>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => setPhotoTaken(false)}>
                                    <Ionicons name='ios-close' size={72} color={'white'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setValidatingPhoto(false);
                                        props.onChange(props.pageIndex, props.index, 'photo base64');
                                    }}
                                >
                                    <Ionicons name='ios-checkmark' size={72} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </Modal>
                );
            // Render element with photo preview
            else
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>{props.title}</Text>
                        <View style={styles.content}>
                            <Image style={styles.preview} source={{ uri: photoUri }} />
                            <TouchableOpacity style={styles.button} onPress={() => setPhotoTaken(false)}>
                                <Ionicons name='ios-camera' size={72} color={Colors.secondary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
        }
        // After clicking the take photo btn
        else {
            // Render camera modal
            return (
                <Modal animationType='slide'>
                    <View style={{ flex: 1 }}>
                        <Camera style={{ flex: 1 }} type={type} ref={ref => { setCamera(ref); }} ratio={'16:9'} flashMode={flash}>
                            <View
                                style={{ ...styles.iconContainer, flex: 0.5, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                                <TouchableOpacity onPress={() => {
                                    if (photoUri === '') {
                                        setPhotoTaken(null);
                                        setValidatingPhoto(false);
                                    }
                                    else {
                                        setPhotoTaken(null);
                                        setValidatingPhoto(false);

                                    }
                                }}>
                                    <Ionicons name='ios-close' size={50} color={'white'} />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{ ...styles.iconContainer, flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}>
                                    <Ionicons name='ios-reverse-camera' size={50} color={'white'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={takePicture}>
                                    <Ionicons name='ios-camera' size={50} color={'white'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setFlash(
                                            flash === Camera.Constants.FlashMode.off
                                                ? Camera.Constants.FlashMode.on
                                                : Camera.Constants.FlashMode.off
                                        );
                                    }}
                                >
                                    <Ionicons name={flash === Camera.Constants.FlashMode.on ? 'ios-flash' : 'ios-flash-off'} size={50} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                </Modal>
            );

        }
    }
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: Dimensions.get('window').height * 0.02
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        marginBottom: Dimensions.get('window').height * 0.02
    },
    preview: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5
    },
    iconContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.get('window').width * 0.05
    },
    button: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 1,
        padding: Dimensions.get('window').height * 0.01,
        borderRadius: 5,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Dimensions.get('window').width * 0.1
    }
});

export default CameraElement;