import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import extractErrorMessage from '../../utils/functions';
const { width } = Dimensions.get('window');
const showToast = (msg: string) => {
  Toast.show({
    type: 'error',
    text1: 'Hello',
    text2: `${msg} 👋`,
  });
};
const Details = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('List');
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.navigate('List');
    } catch (err: any) {
      console.log('error while loging in ', err);
      const extractedMessage = extractErrorMessage(err);
      showToast(extractedMessage);
    }
  };
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      console.log('error while signing in ', err);
      const extractedMessage = extractErrorMessage(err);
      showToast(extractedMessage);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME</Text>
      <TextInput
        style={[
          styles.input,
          isEmailFocused && {
            borderColor: '#8cacde',
            borderWidth: 3,
          },
        ]}
        placeholder="Enter user email"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
      />
      <TextInput
        style={[
          styles.input,
          isPasswordFocused && {
            borderColor: '#8cacde',
            borderWidth: 3,
          },
        ]}
        placeholder="Enter password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={logIn}
      >
        <Text style={styles.text}>LogIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={signIn}
      >
        <Text style={styles.text}>SignIn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 15,
    marginVertical: 0.05 * width,
    marginHorizontal: 0.05 * width,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    width: '90%',
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
    width: '90%',
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
  title: {
    margin: 5,
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Details;
