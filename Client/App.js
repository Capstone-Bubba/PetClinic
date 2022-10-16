import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screen
import SignInScreen from './Screen/signInScreen';
import ThirdScreen from './Screen/thirdScreen';
import AddressScreen from './Screen/addressScreen';
import ResultScreen from './Screen/resultScreen';
import ListScreen from './Screen/listScreen';
import HospitalScreen from './Screen/hospitalScreen';
import MainScreen from './Screen/mainScreen';
import ProfileScreen from './Screen/profileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='SignIn' component={SignInScreen} />
      <Stack.Screen name='Address' component={AddressScreen} />
    </Stack.Navigator>
  )
}

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='MainScreen' component={MainScreen} />
      <Stack.Screen name='Result' component={ResultScreen} />
      <Stack.Screen name='Third' component={ThirdScreen} />
      <Stack.Screen name='List' component={ListScreen} />
      <Stack.Screen name='Hospital' component={HospitalScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Main' component={MainStack} />
        <Tab.Screen name='Profile' component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bottomBar: {
    flexDirection: 'row'
  }
})