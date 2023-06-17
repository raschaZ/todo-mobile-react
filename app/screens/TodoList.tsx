import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  DocumentReference,
  deleteDoc,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import TodoItem from '../components/TodoItem';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
interface Todo {
  id: string;
  title: string;
  done: boolean;
  description: string;
}

const TodoList = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [currentUser, setCurrentUser] = useState(getAuth().currentUser);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login');
      } else {
        getDataFromFirestore();
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, [currentUser]);

  const getDataFromFirestore = async () => {
    setCurrentUser(getAuth().currentUser);
    if (currentUser) {
      try {
        const todosCollectionRef = collection(FIREBASE_DB, 'todos');
        const todosQuery = query(
          todosCollectionRef,
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(todosQuery);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Todo[];
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addTodo = async () => {
    if (todoTitle.trim() === '' || todoDescription.trim() === '') {
      // Don't add empty todos
      return;
    }

    await addDoc(collection(FIREBASE_DB, 'todos'), {
      title: todoTitle,
      done: false,
      description: todoDescription, // Add description
      userId: currentUser?.uid, // Add description
    });

    // Clear the todo title input field after adding a todo
    setTodoTitle('');
    setTodoDescription('');
    getDataFromFirestore(); // Fetch updated data
  };

  const toggleTodoDone = async (item: Todo) => {
    if (item.id) {
      const docRef: DocumentReference = doc(FIREBASE_DB, 'todos', item.id);
      await updateDoc(docRef, { done: !item.done });
      getDataFromFirestore(); // Fetch updated data
    }
  };

  const deleteTodoItem = async (item: Todo) => {
    if (item.id) {
      const docRef: DocumentReference = doc(FIREBASE_DB, 'todos', item.id);
      await deleteDoc(docRef);
      getDataFromFirestore(); // Fetch updated data
    }
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem
      navigation={navigation}
      item={item}
      toggleTodoDone={toggleTodoDone}
      deleteTodoItem={deleteTodoItem}
    />
  );

  const keyExtractor = (item: Todo) => item.id ?? Math.random().toString();

  return (
    <View>
      <Text style={styles.title}>List :</Text>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.container}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Todo Title"
        value={todoTitle}
        onChangeText={setTodoTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Todo Description"
        value={todoDescription}
        onChangeText={setTodoDescription}
      />
      <Pressable
        style={styles.button}
        onPress={addTodo}
      >
        <Text style={styles.text}>Add Todo</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.text}>go to login</Text>
      </Pressable>
    </View>
  );
};

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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    borderRadius: 4,
    elevation: 3,
    borderColor: 'gray',
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 10,
  },
  container: {
    flexGrow: 1,
    width: '100%',
  },
});

export default TodoList;
