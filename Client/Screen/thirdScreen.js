import {Text, View, Button} from 'react-native';
import React, { useState } from 'react';

export default function ThirdScreen({navigation}) {
    return (
        <View>
            <Text>Thrid</Text>
            <Button title="Pop to root" onPress={() => navigation.popToTop()}/>
            <Button title="Pop" onPress={() => navigation.pop()}/>
        </View>
    )
}