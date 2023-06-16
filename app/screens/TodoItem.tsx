import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

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

  return (
    <View style={styles.rowContainer}>
      <Pressable
        style={styles.text}
        onPress={() => navigation.navigate('Details', { item: item })}
      >
        <Text style={[styles.rowItem, { width: '80%' }]}>
          {item.title} : {item.done ? 'Done' : 'Not Done'}
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
  rowItem: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});
