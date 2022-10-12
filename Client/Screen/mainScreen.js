import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TextInput, Image, PermissionsAndroid, SafeAreaView, StyleSheet, TouchableOpacity, Pressable, ScrollView, Modal, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import imgPath from '../assets/dog2.jpeg';
import maleIcon from '../assets/mars.png';
import femaleIcon from '../assets/venus.png';
import settingIcon from '../assets/settings.png';
import chooseImg from '../assets/image-gallery.png';
import saveIcon from '../assets/diskette.png';
import basicImg from '../assets/basicPicture.jpeg';

import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

export default function MainScreen({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [camModalVisible, setCamModalVisible] = useState(false);

    const [speciesOpen, setSpeciesOpen] = useState(false);
    const [speciesValue, setSpeciesValue] = useState(null);
    const [speciesitems, setSpeciesItems] = useState([
        { label: '진돗개', value: 'jindo' },
        { label: '리트리버', value: 'Retriever' },
        { label: '허스키', value: 'Husky' }
    ]);

    const [neuterOpen, setNeuterOpen] = useState(false);
    const [neuterValue, setNeuterValue] = useState(0);
    const [neuterItems, setNeuterItems] = useState([
        { label: 'X', value: 0 },
        { label: 'O', value: 1 }
    ])

    const [genderOpen, setGenderOpen] = useState(false);
    const [gender, setGender] = useState(0);
    const [genderItems, setGenderItems] = useState([
        { label: '남', value: 0 },
        { label: '여', value: 1 }
    ])

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState(0);
    const [imgName, setImgName] = useState('');
    const [photo, setPhoto] = useState('');
    const [newPhoto, setNewPhoto] = useState('');

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('user_num')
                .then(async (data) => {
                    if (data !== null) {
                        await axios.post('https://10.0.2.2:3000/main', { 'user_num': data })
                            .then(async (res) => {
                                const user_data = res.data;
                                setName(user_data.pet_name);
                                setAge(user_data.pet_age);
                                setWeight(user_data.pet_weight);
                                setPhoto(user_data.pet_img);
                                setNeuterValue(user_data.neutralization);
                                setSpeciesValue(user_data.species);
                                setGender(user_data.pet_gender);
                                await setIsLogin(true);
                                console.log('user_data in main', user_data);
                                console.log(data);
                                console.log('T login', isLogin);
                            })
                    } else {
                        setName('');
                        setAge(0);
                        setWeight(0);
                        setPhoto('');
                        setNeuterValue('O');
                        setSpeciesValue('');
                        setGender('');
                        setIsLogin(false);
                        console.log('F login', isLogin);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        });

        return unsubscribe;

    }, [navigation]);

    const saveData = async () => {
        try {
            const match = /\.(\w+)$/.exec(imgName ?? '');
            const type = match ? `image/${match[1]}` : `image`
            const formData = new FormData();
            formData.append('images', { uri: newPhoto.uri, name: imgName, type });
            formData.append('pet_name', name);
            formData.append('pet_gender', gender);
            formData.append('species', speciesValue);
            formData.append('neutralization', neuterValue);
            formData.append('pet_age', age);
            formData.append('pet_weight', weight);

            await AsyncStorage.getItem('user_num')
                .then(data => {
                    formData.append('user_num', data);
                })

            await axios.post('https://10.0.2.2:3000/main/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    setPhoto(res.data)
                    console.log(formData._parts);
                })
        } catch (err) {
            console.log(err);
        }

    }

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

            setNewPhoto({ uri: localUri });
            // setPhoto({ uri: localUri });
            // setPhoto(newPhoto);
            setImgName(imageName);
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
            setBtnStatus(false);
        } else {
            console.log("Camera permission denied");
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={camModalVisible}
                transparent={true}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!camModalVisible);
                }}
            >
                <Pressable style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                }}
                    onPress={() => setCamModalVisible(false)}
                />
                <View style={styles.camModalContainer}>
                    <TouchableOpacity onPress={() => {
                        showPicker();
                        setCamModalVisible(false);
                    }}>
                        <View style={styles.camButtonStyle}>
                            <Text>카메라로 촬영</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCamModalVisible(false)}>
                        <View style={styles.camButtonStyle}>
                            <Text>갤러리에서 선택</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                }}
                    onPress={() => setModalVisible(false)}
                />
                <View style={styles.modalInfoContainer}>
                    <TouchableOpacity style={styles.profileContainer} onPress={() => setCamModalVisible(true)}>
                        {/* <Image source={imgPath} style={styles.modalProfileStyle}/> */}
                        <Image source={photo.length !== 0 ? (newPhoto.length !== 0 ? newPhoto : { uri: `https://10.0.2.2:3000/profileImg/${photo}` }) : chooseImg} style={styles.modalProfileStyle} />
                    </TouchableOpacity>
                    <View style={styles.moreInfoContainer}>
                        <View style={styles.modalNameContainer}>
                            <Text style={styles.modalTextStyle}>이름 </Text>
                            <TextInput style={styles.modalNameStyle} value={name} onChangeText={setName} />
                        </View>
                        <View style={styles.modalNameContainer}>
                            <Text style={styles.modalTextStyle}>견종 </Text>
                            <DropDownPicker
                                open={speciesOpen}
                                value={speciesValue}
                                items={speciesitems}
                                placeholder={speciesValue}
                                setOpen={setSpeciesOpen}
                                setValue={setSpeciesValue}
                                setItems={setSpeciesItems}
                                onChangeValue={() => { console.log(speciesValue) }}
                                style={{ width: 120 }}
                            />
                        </View>
                        <View style={styles.modalNameContainer}>
                            <Text style={styles.modalTextStyle}>나이 </Text>
                            <TextInput style={styles.modalNameStyle} keyboardType='numeric' value={age} onChangeText={setAge} />
                        </View>

                        <View style={styles.modalNameContainer}>
                            <Text style={styles.modalTextStyle}>몸무게 </Text>
                            <TextInput style={styles.modalNameStyle} value={weight} onChangeText={setWeight} keyboardType='numeric' />
                            <Text> kg</Text>
                        </View>
                        <View style={styles.modalNameContainer}>
                            <Text style={styles.modalTextStyle}>성별 </Text>
                            <DropDownPicker
                                open={genderOpen}
                                value={gender}
                                items={genderItems}
                                placeholder={gender}
                                setOpen={setGenderOpen}
                                setValue={setGender}
                                setItems={setGenderItems}
                                style={{ width: 70, marginBottom: 5, marginTop: 5 }}
                            />
                        </View>
                        <View style={styles.modalNameContainer}>
                            <Text style={styles.modalTextStyle}>중성화 여부 </Text>
                            <View style={{ width: 70, elevation: 1 }}>
                                <DropDownPicker
                                    open={neuterOpen}
                                    value={neuterValue}
                                    items={neuterItems}
                                    placeholder={neuterValue}
                                    setOpen={setNeuterOpen}
                                    setValue={setNeuterValue}
                                    setItems={setNeuterItems}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {
                            setModalVisible(false);
                            saveData();
                        }}
                    >
                        <Image source={saveIcon} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.imgContainer}>
                {/* <Image source={imgPath} style={styles.imgStyle} /> */}
                <Image source={photo.length !== 0 ? { uri: `https://10.0.2.2:3000/profileImg/${photo}` } : basicImg} style={styles.imgStyle} />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.profileContainer}>
                    {/* <Image source={imgPath} style={styles.profileStyle}/> */}
                    <Image source={photo.length !== 0 ? { uri: `https://10.0.2.2:3000/profileImg/${photo}` } : basicImg} style={styles.profileStyle} />
                </View>
                <View style={styles.moreInfoContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameStyle}>{name}</Text>
                        <Image source={ Boolean(gender) ? femaleIcon : maleIcon} style={styles.genderImgStyle} />
                    </View>
                    <View style={styles.speciesContainer}>
                        <Text style={styles.infoStyle}>{speciesValue}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoStyle}>나이 : {age}</Text>
                        <Text style={styles.infoStyle}>중성화 여부 : {Boolean(neuterValue) ? 'O' : 'X'}</Text>
                        <Text style={styles.infoStyle}>몸무게 : {weight}kg</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => { isLogin ? setModalVisible(true) : navigation.navigate('Profile') }}
                >
                    <Image style={{ width: 20, height: 20 }} source={settingIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.emptySpace}>

                </View>
                <View style={styles.ButtonConatainer}>
                    <View style={styles.rowButtonContainer}>
                        <View style={styles.singleTLButtonContainer}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => { navigation.navigate('Third') }}>
                                <Text>AI 진단</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.singleTRButtonContainer}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                                console.log(isLogin);
                                isLogin ? navigation.navigate('List') : navigation.navigate('Profile');
                            }}>
                                <Text>주변 병원</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rowButtonContainer}>
                        <View style={styles.singleBLButtonContainer}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text>진단 기록</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.singleBRButtonContainer}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text>갤러리</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AFD485',
    },
    imgContainer: {
        flex: 0.7,
        alignItems: 'center',
    },
    infoContainer: {
        width: '90%',
        height: 200,
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'absolute',
        left: '5%',
        top: '35%',
        padding: 5,
        flexDirection: 'row',
        flex: 1,
        elevation: 8,
        // borderWidth: 1
    },
    modalInfoContainer: {
        width: '90%',
        height: 320,
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'absolute',
        left: '5%',
        top: '35%',
        padding: 5,
        flexDirection: 'row',
        flex: 1,
        elevation: 8,
        // borderWidth: 1
    },
    camModalContainer: {
        width: '90%',
        height: 100,
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'absolute',
        left: '5%',
        top: '35%',
        padding: 5,
        flexDirection: 'row',
        flex: 1,
        elevation: 8,
        // borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    bottomContainer: {
        flex: 1,
    },
    ButtonConatainer: {
        flex: 1,
    },
    rowButtonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    emptySpace: {
        flex: 0.6,
    },
    moreInfoContainer: {
        flex: 1,
        paddingLeft: 20
    },
    infoAndProfileContainer: {
        flexDirection: 'row',
    },
    profileContainer: {
        flex: 1.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flex: 0.6,
    },
    speciesContainer: {
        flex: 0.6,
    },
    singleTRButtonContainer: {
        flex: 1,
        paddingRight: 20,
        paddingTop: 21,
        paddingLeft: 10,
        paddingBottom: 10
    },
    singleTLButtonContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 21,
        paddingRight: 10,
        paddingBottom: 10
    },
    singleBRButtonContainer: {
        flex: 1,
        paddingRight: 20,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 21
    },
    singleBLButtonContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 21
    },
    modalContainer: {
        height: '30%',
        marginTop: 'auto',
        // borderWidth: 1,
    },
    modalNameContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flex: 0.6,
        alignItems: 'center',
    },
    infoBox: {
        flex: 1,
    },
    imgStyle: {
        width: '100%',
        height: '100%',
    },
    profileStyle: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        width: "100%",
        height: "100%",
    },
    genderImgStyle: {
        width: 30,
        height: 30,
        marginLeft: '3%'
    },
    buttonStyle: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    infoStyle: {
        fontSize: 16,
        color: 'black',
        marginBottom: 7
    },
    footer: {
        flex: 1,
        backgroundColor: '#ddd',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    headerText: {
        color: 'black',
        fontSize: 18,
        padding: 26,
    },
    modalStyle: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20
    },
    modalProfileStyle: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        width: "100%",
        height: "100%",
        backgroundColor: '#ddd'
    },
    modalNameStyle: {
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        width: 80
    },
    modalTextStyle: {
        fontWeight: 'bold'
    },
    camButtonStyle: {
        width: 150,
        height: 70,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd'
    }
})