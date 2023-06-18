import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');

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
    <View style={styles.rowContainer}>
      <View style={[styles.text]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', { item: item })}
          style={[styles.rowItem, { width: width * 0.7, flexDirection: 'row' }]}
        >
          <Ionicons
            name="eye"
            size={30}
            color="gray"
          />
          <Text style={[styles.text, { color: 'black', paddingLeft: 10 }]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>

      {!item.done ? (
        <TouchableOpacity
          style={styles.button}
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
          style={styles.button}
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

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 9,
  },
  text: {
    margin: 5,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  rowItem: {
    flex: 1,
    padding: 5,
    textAlign: 'left',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '97%',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 3,
    elevation: 1,
    margin: 5,
  },
});
