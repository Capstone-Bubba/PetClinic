import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import KakaoLogin from './component/kakao';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SecondScreen from './Screen/secondScreen';
import ThirdScreen from './Screen/thirdScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={KakaoLogin} options={{title: "Welcome"}}/>
        <Stack.Screen name="Second" component={SecondScreen} />
        <Stack.Screen name="Third" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})