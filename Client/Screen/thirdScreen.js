import { Text, View, Button, Image, SafeAreaView, StyleSheet, PermissionsAndroid, Alert, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from 'axios';
import camera from '../assets/camera.png';
import gallery from '../assets/gallery.png';
import imgPath from '../assets/login.png'

export default function ThirdScreen({ navigation }) {
    const [photo, setPhoto] = useState(imgPath);
    const [getOpacity, setOpacity] = useState(0);
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [btnStatus, setBtnStatus] = useState(false);

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
            setName(imageName);
            setShow(true);
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
            setOpacity(1);
            setBtnStatus(true);
        } else {
            console.log("Camera permission denied");
        }
    }

    const sendPhoto = async () => {
        try {
            const match = /\.(\w+)$/.exec(name ?? '');
            const type = match ? `image/${match[1]}` : `image`
            const formData = new FormData();
            formData.append('images', { uri: photo.uri, name: name, type })

            await axios({
                method: 'post',
                url: 'http://10.0.2.2:3000/detect/detecting',
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            })
                .then((response) => {
                    console.log(response.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={photo} style={styles.img} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={showPicker} style={styles.buttonStyle}>
                    <Image style={styles.selectImg} source={camera} />
                </TouchableOpacity>
                <TouchableOpacity onPress={choosePhoto} style={styles.buttonStyle}>
                    <Image style={styles.selectImg} source={gallery} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sendButtonContainer, { opacity: getOpacity }]}>
                <TouchableOpacity onPress={sendPhoto} style={styles.sendButtonStyle} disabled={btnStatus}>
                    <Text>사진 전송</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.partBtnContainer, { opacity: getOpacity }]}>
                <TouchableOpacity style={[styles.partBtn, { backgroundColor: '#DDDD' }]} disabled={btnStatus}>
                    <Text>머리</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.partBtn, { backgroundColor: '#DDDD' }]} disabled={btnStatus}>
                    <Text>배</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.partBtn, { backgroundColor: '#DDDD' }]} disabled={btnStatus}>
                    <Text>발</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.partBtn, { backgroundColor: '#DDDD' }]} disabled={btnStatus}>
                    <Text>사타구니</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    img: {
        width: '90%',
        height: '90%',
        borderRadius: 20
    },
    buttonStyle: {
        width: '37%',
        height: '100%',
        backgroundColor: '#DDDD',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: '2%',
        marginLeft: '2%'
    },
    sendButtonStyle: {
        width: '77%',
        height: '90%',
        backgroundColor: '#DDDD',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    dropdown: {
        width: '100%'
    },
    partBtn: {
        width: '46%',
        height: '49%',
        borderRadius: 20,
        marginBottom: '4%',
        alignItems: 'center',
        justifyContent: 'space-around',
        // borderColor: 'yellow',
        // borderWidth: 3,
    },
    selectImg: {
        width: '50%',
        height: '100%'
    },
    imgContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 3,
        // borderColor: 'black',
    },
    buttonContainer: {
        flex: 0.1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        // borderWidth: 3,
        // borderColor: 'black',
    },
    sendButtonContainer: {
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: '3%',
        // borderWidth: 3,
        // borderColor: 'black',
    },
    partBtnContainer: {
        flex: 0.2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: '10%',
        marginRight: '10%',
        alignItems: 'center',
        justifyContent: 'space-around',
        // borderWidth: 3,
        // borderColor: 'black',
    }
});