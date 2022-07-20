import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile,
    login,
    logout,
    unlink,
} from '@react-native-seoul/kakao-login';

const imgPath = require('../assets/login.png');

function KakaoLogin() {
    const [result, setResult] = useState('');

    const signInWithKakao = async () => {
        try {
            const token = await login();
            setResult(JSON.stringify(token));
        } catch (err) {
            Alert.alert(err.message);
            console.log(err.message);
        }
    }
    const signOutWithKakao = async () => {
        try {
            const message = await logout();
            setResult(message);
        } catch(err) {
            Alert.alert(err.message);
            console.log(err.message);
        }
        
    };

    const getKakaoProfile = async () => {
        try {
            const profile = await getProfile();
            console.log(profile);
            setResult(JSON.stringify(profile));
        } catch (err) {
            Alert.alert('err', err.message);
            console.log(err.message);
        }
    };

    const unlinkKakao = async () => {
        try {
            const message = await unlink();
            setResult(message);
        } catch (err) {
            Alert.alert('err', err.message);
            console.log(err.message);
        }
        
    };
    return (
        <View style={styles.container}>
            <Image style={styles.loginLogo} source={imgPath}/>
            <Button style={styles.loginButton} title='로그인' onPress={signInWithKakao} color='#fd6f22' />
            {/* <Button title="로그아웃" onPress={signOutWithKakao} />
            <Button title="프로필" onPress={getKakaoProfile} />
            <Button title="연결종료" onPress={unlinkKakao} /> */}
            <Text>{result}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
    //   flex: ,
      backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent: 'center',
      borderStyle: 'solid',
      borderWidth: 2
    },
    input: {
      width: 200,
      height: 40,
      margin: 8,
      borderWidth: 1,
      padding: 10,
    },
    loginLogo:{
        textAlign: 'center'
    },
    loginButton:{
        backgroundColor:'#fd6f22',
    },
  });

export default KakaoLogin;