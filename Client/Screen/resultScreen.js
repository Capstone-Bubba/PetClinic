import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, SafeAreaView, StyleSheet, PermissionsAndroid, Alert, Touchable, TouchableOpacity } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultScreen({ navigation, route }) {
    const [renderData, setData] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('email')
            .then(async data => {
                await axios.post('http://10.0.2.2:3000/detect/hospital', { 'email': data })
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

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={route.params.photo} style={styles.img} />
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultStyle}>
                    {route.params.data}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => {navigation.navigate('List', {data: renderData})}}>
                    <Text>가까운 병원 보기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text>다시 촬영하기</Text>
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
    resultStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    imgContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 0.1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    resultContainer: {
        flex: 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    }
});