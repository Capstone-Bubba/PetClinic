import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

export default function SecondScreen({ navigation, route }) {
    const email = route.params.email;
    const [phone, setPhone] = useState('');
    const name = route.params.name;

    const signUp = () => {
        axios.post('http://10.0.2.2:3000/auth/signup', { 'email': email, 'phone': phone, 'name': name })
        .then((res)=>{
            if(Number(res.data) === 1) {
                navigation.navigate('Third');
            }
        })
        .catch((err) => {
            Alert.alert(err);
        })
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={email}
            />
            <TextInput
                style={styles.inputBox}
                value={name}
            />
            <TextInput
                keyboardType = 'numeric'
                style={styles.inputBox}
                placeholder={'전화번호'}
                onChangeText={(phone) => setPhone(phone)}
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
        paddingLeft: 15
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
        alignItems: "center"
    }
})