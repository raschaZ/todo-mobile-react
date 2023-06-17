import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Details = ({ route }: any, { navigation }: any) => {
  const { item } = route.params;
  const auth = getAuth();
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login');
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details</Text>
      <Text>Title: {item.title}</Text>
      <Text>Done: {item.done ? 'Yes' : 'No'}</Text>
      <Text>Description: {item.description}</Text>
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
  text: {
    margin: 5,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textAlign: 'center',
  },
});

export default Details;
