import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';

let imagePath = require('./assets/login.png')

export default function App() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState(null);

  return (
    <View style={styles.container}>
      <Image
        style={styles.loginLogo}
        source={imagePath}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="이메일을 입력하세요"

      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="비밀번호를 입력하세요"
        keyboardType="numeric"
      />
       <Button
       style={styles.loginButton}
        title="로그인"
        color="#fd6f22"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
  },
  loginLogo:{
    width: 500,
    height:300,
  },
  loginButton:{
    backgroundColor:'#fd6f22',
  },
});
