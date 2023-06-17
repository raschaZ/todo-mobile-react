import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { TextInput } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

const Details = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const logIn = async () => {
    signInWithEmailAndPassword(auth, email, password);
  };
  const signIn = async () => {
    createUserWithEmailAndPassword(auth, email, password);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter user Name"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        textContentType="password"
        onChangeText={setPassword}
      />
      <Pressable
        style={styles.button}
        onPress={logIn}
      >
        <Text style={styles.text}>logIn</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={signIn}
      >
        <Text style={styles.text}>signIn</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
    margin: 5,
  },
  text: {
    margin: 5,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
});

export default Details;
