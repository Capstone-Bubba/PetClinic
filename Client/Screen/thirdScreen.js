import { Text, View, Button, Image, SafeAreaView, StyleSheet, PermissionsAndroid, Alert, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
const imgPath = require('../assets/login.png');
import axios from 'axios';

export default function ThirdScreen({ navigation }) {
    // const [photo, setPhoto] = useState(require('../assets/icon.png'));
    const [photo, setPhoto] = useState(imgPath);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');

    const showPicker = async () => {
        const grantedCamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancle",
                buttonPositive: "OK"
            }
        );

        if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera & Strage permission given");

            const result = await launchCamera({
                mediaType: 'photo',
                cameraType: 'back',
                saveToPhotos: true
            });
            if (result.didCancel) {
                return null;
            }

            const localUri = result.assets[0].uri;
            const uriPath = localUri.split("//").pop();
            const imageName = localUri.split("/").pop();
            setPhoto({ uri: localUri });

        } else {
            console.log("Camera permission denied");
        }
    }

    const choosePhoto = async () => {
        const grantedStorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancle",
                buttonPositive: "OK"
            }
        );

        if (grantedStorage === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera & Strage permission given");

            const result = await launchImageLibrary();
            if (result.didCancel) {
                return null;
            }

            const localUri = result.assets[0].uri;
            const uriPath = localUri.split("//").pop();
            const imageName = localUri.split("/").pop();

            console.log('image', imageName);

            setPhoto({ uri: localUri });
            setName(imageName);
            setShow(true)

            // const match = /\.(\w+)$/.exec(imageName ?? '');
            // const type = match ? `image/${match[1]}` : `image`
            // const formData = new FormData();
            // formData.append('image', { uri: photo.uri, name: imageName, type })

            // console.log(formData)

            // await axios({
            //     method: 'post',
            //     url: 'http://10.0.2.2:3000/testing',
            //     headers: {
            //         'content-type': 'multipart/form-data'
            //     },
            //     data: formData
            // }) 
        } else {
            console.log("Camera permission denied");
        }
    }

    const sendPhoto = async () => {
        const match = /\.(\w+)$/.exec(name ?? '');
        const type = match ? `image/${match[1]}` : `image`
        const formData = new FormData();
        formData.append('images', { uri: photo.uri, name: name, type })

        await axios({
            method: 'post',
            url: 'http://10.0.2.2:3000/testing',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: formData
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={photo} style={styles.img} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={showPicker} style={styles.buttonStyle}>
                    <Text>사진 촬영</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={choosePhoto} style={styles.buttonStyle}>
                    <Text>사진 선택</Text>
                </TouchableOpacity>
                {show &&
                    <TouchableOpacity onPress={sendPhoto} style={styles.sendButtonStyle}>
                        <Text>사진 전송</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 30
    },
    img: {
        width: 300,
        height: 300,
    },
    buttonStyle: {
        width: 130,
        height: 100,
        backgroundColor: '#DDDD',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: '1%',
        marginLeft: '1%',
        marginBottom: '2%'
    },
    sendButtonStyle: {
        width: 270,
        height: 100,
        backgroundColor: '#DDDD',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 50,
        marginTop: -50
    },
    sendButtonContainer: {

    }
});