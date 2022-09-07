import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Postcode from '@actbase/react-daum-postcode'

export default function AddressScreen({navigation, route}) {
    console.log(route.params)
    const getAddressData = data => {
        navigation.navigate('Second', {email: route.params.email, name: route.params.name, postcode: data.address, });
    }

    return (
        <Postcode
            style={{ flex: 1, width: '100%', zIndex: 999 }}
            jsOptions={{ animation: true }}
            onSelected={data => getAddressData(data)}
            onError={function (error) {
                throw new Error('Function not implemented.');
            }}
        />
    )
}