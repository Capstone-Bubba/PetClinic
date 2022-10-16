import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

import imgPath from '../assets/login.png'
import locationImgPath from '../assets/location.png';
import cam from '../assets/cam2.png';
import notCam from '../assets/notcam2.png';

export default function ListScreen({ navigation, route }) {
    const [renderData, setData] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('email')
            .then(async data => {
                await axios.post('https://10.0.2.2:3000/detect/hospital', { 'email': data })
                    .then(async (res) => {
                        if (res.data.length !== 0) {
                            await setData(res.data)
                            // await renderItem();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
    }, [])

    const renderItem = renderData.map((el, index) =>
        <View style={[styles.resultContainer, styles.resultContainerShadow]} key={index}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Hospital', { data: el });
            }} key='drop' style={styles.touchableStyle}>
                <View style={styles.imgViewContainer}>
                    <Image style={styles.imgStyle} source={imgPath} />
                </View>
                <View style={styles.textViewContainer}>
                    <Text style={styles.hospitalNameStyle} key='name'>{el.hospital_name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={locationImgPath} style={{ width: 20, height: 20 }} />
                        <Text key='dist'>{el.distance.toFixed(2)}km</Text>
                    </View>
                </View>
                <View style={styles.camViewContainer}>
                    {el.status ? <Image source={cam} style={styles.camImgStyle} /> : <Image source={notCam} style={styles.camImgStyle} />}
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {renderItem}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: '5%',
        marginTop: '5%',
        marginLeft: '2%',
        marginRight: '2%'
    },
    resultStyle: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'space-between'
    },
    touchableStyle: {
        flexDirection: 'row',
        paddingLeft: '3%'
    },
    imgStyle: {
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 40,
        width: '93%',
        height: '90%'
    },
    camImgStyle: {
        width: 25,
        height: 25
    },
    hospitalNameStyle: {
        color: 'black',
        fontSize: 20
    },
    distanceStyle: {

    },
    camViewContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 13,
        marginRight: 10
    },
    imgViewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        height: '100%'
    },
    textViewContainer: {
        paddingLeft: '3%',
        paddingTop: '3%',
    },
    resultContainer: {
        justifyContent: 'center',
        height: 100,
        marginBottom: '5%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'transparent'
    },
    resultContainerShadow: {
        elevation: 8,
    }
});