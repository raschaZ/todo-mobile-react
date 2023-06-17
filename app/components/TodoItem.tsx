import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { View, Dimensions, Text, Pressable, StyleSheet } from 'react-native';
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
        // navigation.navigate('Login');
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);
  return (
    <View style={styles.rowContainer}>
      <Pressable
        style={[styles.text]}
        onPress={() => navigation.navigate('Details', { item: item })}
      >
        <Text style={[styles.rowItem, { width: width * 0.7, paddingLeft: 20 }]}>
          {item.title}
          {/* : {item.done ? 'Done' : 'To Do'} */}
        </Text>
      </Pressable>
      {!item.done ? (
        <Pressable
          style={[styles.button, { backgroundColor: 'green' }]}
          onPress={() => toggleTodoDone(item)}
        >
          <Text style={styles.text}>Close</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => deleteTodoItem(item)}
        >
          <Text style={styles.text}>Delete</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
    margin: 5,
    width: width * 0.2,
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
    width: '100%',
  },
});
