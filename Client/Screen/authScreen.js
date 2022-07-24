import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';

export function SignIn({ navigation }) {
    return (
        <View>
            <Button title="Navigate to second screen with french" 
            onPress={() => navigation.navigate("Second", { language: "french"})}
            />
            <Button title="Navigate to second screen with english" 
            onPress={() => navigation.navigate("Second", { language: "english"})}
            />
        </View>
    );
};