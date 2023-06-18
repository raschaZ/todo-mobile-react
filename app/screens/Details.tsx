import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

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
      <Text style={styles.title}>Details</Text>
      <Text>Title: {item.title}</Text>
      <Text>Done: {item.done ? 'Yes' : 'No'}</Text>
      <ScrollView>
        <Text style={styles.title}>Description:</Text>
        <Text style={styles.description}>{item.description}</Text>
      </ScrollView>
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
  },
  title: {
    margin: 5,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textAlign: 'justify',
  },
  text: {
    margin: 5,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textAlign: 'justify',
  },
  description: {
    textAlign: 'justify',
    padding: 5,
  },
});

export default Details;
