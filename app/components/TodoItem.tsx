import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useContext } from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { getStyles } from '../styles/styles';
import { ThemeContext } from '../contexts/ThemeContext';
const { width } = Dimensions.get('window');

interface Todo {
  id: string;
  title: string;
  done: boolean;
  description: string;
}
// Rename the interface to avoid conflicts
interface TodoItemProps {
  navigation: any;
  item: Todo;
  toggleTodoDone: (item: Todo) => Promise<void>;
  deleteTodoItem: (item: Todo) => Promise<void>;
}

export default function TodoItem(props: TodoItemProps) {
  const { navigation, item, toggleTodoDone, deleteTodoItem } = props;
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
    <View style={styles.itemRowContainer}>
      <View style={[styles.itemText]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', { item: item })}
          style={[styles.rowItem, { width: width * 0.7, flexDirection: 'row' }]}
        >
          <Ionicons
            name="eye"
            size={30}
            color="gray"
          />
          <Text style={[styles.itemText, { color: 'black', paddingLeft: 10 }]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>

      {!item.done ? (
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => toggleTodoDone(item)}
        >
          <AntDesign
            name="checkcircleo"
            size={35}
            color="green"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => deleteTodoItem(item)}
        >
          <Ionicons
            name="trash"
            size={35}
            color="red"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
