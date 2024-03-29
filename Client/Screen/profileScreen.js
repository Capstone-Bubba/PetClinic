import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getProfile, login, logout} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';

import basicImg from '../assets/basicPicture.jpeg';

function Profile({navigation, route}) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addr, setAddr] = useState('');
  const [photo, setPhoto] = useState('');

  const [result, setResult] = useState('');
  let state = {
    _isUser: false,
  };

  const [isLogin, setIsLogin] = useState(false);

  const storeData = async (accessToken, refreshToken, email) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('email', email);
      console.log('token saved');
    } catch (err) {
      console.log('token save error,', err);
    }
  };

  const storeUserData = async (user_num, address) => {
    try {
      await AsyncStorage.setItem('user_num', user_num);
      await AsyncStorage.setItem('address', address);
      console.log('user_data saved');
    } catch (err) {
      console.log('token save error,', err);
    }
  };

  const signInWithKakao = async () => {
    try {
      const token = await login();
      const profile = await getProfile(token);

      fetch('https://odhok.kro.kr:3000/auth/kakao/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profile.email,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.isUser !== 0) {
            state._isUser = true;
          }
          state._isUser
            ? (() => {
                storeData(token.accessToken, token.refreshToken, profile.email);
                getDataFunc(profile.email);
              })()
            : navigation.navigate('SignIn', {
                email: profile.email,
                name: profile.nickname,
              });
        })
        .catch(err => {
          console.log(`error: ${err}`);
          setResult(JSON.stringify(err));
        });
    } catch (err) {
      Alert.alert(err.message);
      console.log(err.message);
    }
  };

  const signOutWithKakao = async () => {
    const message = await logout();
    setName('');
    setDate('');
    setEmail('');
    setPhone('');
    setAddr('');
    setPhoto('');
    AsyncStorage.clear();
    setIsLogin(false);

    AsyncStorage.getAllKeys().then(keys =>
      AsyncStorage.multiGet(keys).then(data => console.log('logout', data)),
    );
    setResult(message);
  };

  const getDataFunc = async email => {
    fetch('https://odhok.kro.kr:3000/auth/get-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(async res => {
        console.log(res)
        if (res.length !== 0) {
          const address = res.address;
          const user_num = res.user_num.toString();

          storeUserData(user_num, address);
          setIsLogin(true);
          setName(res.user_name);
          setDate(res.createAt);
          setEmail(res.email);
          setPhone(res.phone);
          setAddr(res.address);
          setPhoto(res.pet_img);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('email').then(data => {
        if (data !== null) {
          getDataFunc(data);
        } else {
          console.log('asd');
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imgContainer}>
          <Image
            onError={e => console.log(e.nativeEvent.error)}
            source={
              isLogin
                ? {uri: `https://odhok.kro.kr:3000/profileImg/${photo}`}
                : basicImg
            }
            style={styles.imgStyle}
          />
        </View>
        <View style={styles.nameContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.nameStyle}>{name} 님</Text>
            {isLogin ? (
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: '#DC143C',
                  borderRadius: 20,
                  width: 80,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  signOutWithKakao();
                }}>
                <Text style={{color: 'white'}}>로그아웃</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: '#50BCDF',
                  borderRadius: 20,
                  width: 80,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  AsyncStorage.clear();
                  signInWithKakao();
                }}>
                <Text style={{color: 'white'}}>로그인</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.dateStyle}>가입일 {date}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.touchSpace}>
          <Text style={styles.infoTextStyle}>이메일</Text>
          <Text style={{color: 'black'}}>{email}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchSpace}>
          <Text style={styles.infoTextStyle}>전화번호</Text>
          <Text style={{color: 'black'}}>{phone}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchSpace}>
          <Text style={styles.infoTextStyle}>주소</Text>
          <Text style={{color: 'black'}}>{addr}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingTop: 10,
    borderBottomWidth: 1,
  },
  imgContainer: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    flex: 2,
    // borderWidth: 1,
    justifyContent: 'center',
  },
  imgStyle: {
    width: '70%',
    height: '70%',
    borderRadius: 100,
  },
  infoContainer: {
    flex: 5,
    alignItems: 'center',
  },
  nameStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    // borderWidth: 1,
    marginBottom: 5,
  },
  dateStyle: {
    color: 'black'
  },
  touchSpace: {
    borderBottomWidth: 1,
    height: '12%',
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-around',
    borderColor: 'grey',
  },
  infoTextStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black'
  },
});

export default Profile;
