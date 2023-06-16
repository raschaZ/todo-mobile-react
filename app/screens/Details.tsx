import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Details = ({ route }: any) => {
  const { item } = route.params;

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
