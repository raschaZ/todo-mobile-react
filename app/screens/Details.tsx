import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { getStyles } from '../styles/styles';
const Details = ({ route, navigation }: any) => {
  const { item } = route.params;
  const { theme } = useContext(ThemeContext);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login');
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);
  const styles = getStyles(theme);

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>Details</Text>
      <Text style={styles.details}>Title: {item.title}</Text>
      <Text style={styles.details}>Done: {item.done ? 'Yes' : 'No'}</Text>
      <Text style={styles.detailsTitle}>Description:</Text>
      <ScrollView>
        <Text style={styles.detailsDescription}>{item.description}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.detailsButtonText}>go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
