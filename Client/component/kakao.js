import { StyleSheet, Text, View, Button, Alert, Image, AsyncS } from 'react-native';
import React, { useState } from 'react';
import {
    getProfile,
    login,
    logout
} from '@react-native-seoul/kakao-login';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KakaoShareLink from 'react-native-kakao-share-link';

const imgPath = require('../assets/login.png');

export default function KakaoLogin({ navigation, route }) {
    const [result, setResult] = useState('');
    let state = {
        _isLogin: false,
        _isUser: false
    }

    const storeData = async (accessToken, refreshToken, email) => {
        try {
            console.log(accessToken)
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken',refreshToken);
            await AsyncStorage.setItem('email', email);
            console.log('token saved');
        } catch (err) {
            console.log('token save error,', err);
        }
    }

    const signInWithKakao = async () => {
        try {
            const token = await login();
            const profile = await getProfile(token);

            storeData(token.accessToken, token.refreshToken, profile.email);

            axios.post('http://10.0.2.2:3000/auth/kakao/login', { 'email': profile.email })
                .then((res) => {
                    console.log(res.data.isUser)
                    if (res.data.isUser !== 0) {
                        state._isUser = true;
                    }

                    state._isUser ?
                        navigation.navigate("Main") :
                        navigation.navigate("Second", { email: profile.email, name: profile.nickname });

                    console.log(state._isUser)
                })
                .catch((err) => {
                    console.log(err);
                    setResult(JSON.stringify(err));
                })
        } catch (err) {
            Alert.alert(err.message);
            console.log(err.message);
        }
    }

    const signOutWithKakao = async () => {
        const message = await logout();
        setResult(message);
    }

    const testing = () => {
        navigation.navigate('Third');
    }

    const kakaoShare = async () => {
        try {
            const response = await KakaoShareLink.sendLocation({
                address: route.params.data.addr_basic,
                addressTitle: route.params.data.hospital_name,
                content: {
                    title: route.params.data.hospital_name,
                    imageUrl:
                        'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
                    link: {
                        webUrl: 'https://developers.kakao.com/',
                        mobileWebUrl: 'https://developers.kakao.com/',
                    },
                    description: route.params.data.addr_basic,
                },
            })
            console.log(response)
        } catch (err) {
            console.error(err);
            console.error(err.message);
        }
    }

    // return (
    //     <View style={styles.container}>
    //         <Image style={styles.loginLogo} source={imgPath} />
    //         <Button style={styles.loginButton} title='로그인' onPress={signInWithKakao} />
    //         <Button title='testing' onPress={kakaoShare} />
    //     </View>
    // )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 100
    },
    loginButton: {
        color: '#fd6f22',
    },
});