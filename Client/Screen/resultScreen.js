import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, SafeAreaView, StyleSheet, PermissionsAndroid, Alert, Touchable, TouchableOpacity } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultScreen({ navigation, route }) {
    const isEmpty = function (value) {
        if (value == "" || value == null || value == undefined || (value != null && typeof (value) == "object" && !Object.keys(value).length)) {
            return false;
        } else {
            return true;
        }
    };

    const loginCheck = () => {
        AsyncStorage.getItem('user_num')
            .then((data) => {
                if (isEmpty(data)) {
                    console.log(data);
                    navigation.navigate('List', { photo: route.params.photo });
                } else {
                    Alert.alert(
                        '경고',
                        '로그인이 필요합니다'
                    )
                }
            })
    }

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={route.params.photo} style={styles.img} />
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultStyle}>{route.params.data}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              loginCheck();
              // navigation.navigate('List')
            }}>
            <Text style={{color: 'black'}}>가까운 병원 보기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={{color: 'black'}}>다시 촬영하기</Text>
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