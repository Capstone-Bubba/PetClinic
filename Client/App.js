import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import KakaoLogin from './component/kakao';

export default function App() {
  return (
    <View>
      <KakaoLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
      borderWidth: 2
      },
  }
})