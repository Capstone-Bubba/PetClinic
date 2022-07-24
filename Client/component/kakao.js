import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import {
    getProfile,
    login,
} from '@react-native-seoul/kakao-login';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const imgPath = require('../assets/login.png');

function KakaoLogin({ navigation }) {
    const [result, setResult] = useState('');
    let state = {
        _isLogin: false,
        _isUser: false
    }

    const signInWithKakao = async () => {
        try {
            const token = await login();
            const profile = await getProfile(token);
            console.log(profile.nickname, profile.email, profile.birthday, token.accessToken);

            axios.post('http://10.0.2.2:3000/auth/kakao/login', { 'email': profile.email })
                .then((res) => {
                    console.log(res.data)
                    if(res.data.isUser !== 0) {
                        state._isUser = true;
                    }

                    state._isUser ? navigation.navigate("Second", {language: "english"}) : navigation.navigate("Second", {email: profile.email, name: profile.nickname});
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
    return (
        <View style={styles.container}>
            <Image style={styles.loginLogo} source={imgPath} />
            <Button style={styles.loginButton} title='로그인' onPress={signInWithKakao} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 100
    },
    loginButton: {
        color: '#fd6f22',
    },
});

export default KakaoLogin;