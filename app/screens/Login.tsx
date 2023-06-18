import React, { useState, useEffect, useContext } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemeContext } from '../contexts/ThemeContext';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import extractErrorMessage from '../../utils/functions';
import { getStyles } from '../styles/styles';

const { width } = Dimensions.get('window');

const showToast = (msg: string) => {
  Toast.show({
    type: 'error',
    text1: 'Hello',
    text2: `${msg} 👋`,
  });
};

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const { theme } = useContext(ThemeContext);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('List');
      }
    });
    return unsubscribeFromAuthStateChanged;
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

  const styles = getStyles(theme);

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>WELCOME</Text>
      <TextInput
        style={[
          styles.loginInput,
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
          styles.loginInput,
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
        style={styles.loginButton}
        onPress={logIn}
      >
        <Text style={styles.loginText}>LogIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={signIn}
      >
        <Text style={styles.loginText}>SignIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
