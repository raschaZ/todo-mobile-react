import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Pressable } from 'react-native';
import { TextInput } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

const Details = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // navigation.navigate('List');
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.navigate('List');
    } catch (err: any) {
      console.error('error while loging in ', err);
    }
  };
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      console.error('error while signing in ', err);
    }
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
        secureTextEntry={true}
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
