import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

export default function SecondScreen({ navigation, route }) {
    const email = route.params.email;
    const name = route.params.name;
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const signUp = () => {
        if (phone.length !== 0) {
            axios.post('http://10.0.2.2:3000/auth/signup', { 'email': email, 'phone': phone, 'name': name, 'address': route.params.postcode + ' ' + address })
                .then((res) => {
                    if (Number(res.data) === 1) {
                        navigation.navigate('Third');
                    }
                })
                .catch((err) => {
                    Alert.alert(err);
                })
        } else {
            Alert.alert(
                '경고',
                '전화번호를 입력해주세요'
            )
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                pointerEvents='none'
                editable={false}
                selectTextOnFocus={false}
                style={styles.inputBox}
                value={email}
            />
            <TextInput
                pointerEvents='none'
                editable={false}
                selectTextOnFocus={false}
                style={styles.inputBox}
                value={name}
            />
            <TextInput
                keyboardType='numeric'
                style={styles.inputBox}
                placeholder={'전화번호'}
                onChangeText={(phone) => setPhone(phone)}
            />
            <TouchableOpacity onPress={() => { navigation.navigate('Address', { email: email, name: name }) }}>
                <TextInput
                    placeholder='주소를 입력하세요'
                    pointerEvents='none'
                    editable={false}
                    selectTextOnFocus={false}
                    style={styles.inputBox}
                    value={route.params.postcode}
                />
            </TouchableOpacity>
            <TextInput
                style={styles.inputBox}
                placeholder={'동, 호수를 입력해주세요'}
                onChangeText={(text) => setAddress(text)}
            />
            <Button
                title='전송'
                onPress={signUp}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'column',
        flex: 1,
    },
    inputBox: {
        borderWidth: 1,
        borderStyle: "solid",
        marginBottom: 20,
        borderRadius: 20,
        paddingLeft: 15,
        color: 'black'
    },
    addrBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    elem: {
        borderWidth: 1,
        borderStyle: "solid",
        marginBottom: 20,
        borderRadius: 20,
        paddingLeft: 15,
        width: '80%'
    },
    button: {
        width: 70,
        height: 50,
        borderRadius: 20,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        width: '70%',
    }
})