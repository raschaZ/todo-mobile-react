import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
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
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';
import { getStyles } from '../styles/styles';
import { ThemeContext } from '../contexts/ThemeContext';
const { height } = Dimensions.get('window');

interface Todo {
  id: string;
  title: string;
  done: boolean;
  description: string;
}
const showToast = (msg: string) => {
  Toast.show({
    type: 'info',
    text1: 'Hello',
    text2: `${msg} 👋`,
  });
};
const TodoList = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [currentUser, setCurrentUser] = useState(getAuth().currentUser);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const { theme } = useContext(ThemeContext);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login');
      } else {
        getDataFromFirestore();
      }
    });
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      unsubscribeFromAuthStatuChanged;
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [currentUser]);

  const getDataFromFirestore = async () => {
    setCurrentUser(getAuth().currentUser);
    if (currentUser) {
      try {
        setisLoading(true);
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
        // Sort the data by title
        data.sort((a, b) => a.title.localeCompare(b.title));
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setisLoading(false);
      }
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.log('Error occurred while logging out:', error);
    }
  };
  const addTodo = async () => {
    if (todoTitle.trim() === '' || todoDescription.trim() === '') {
      showToast('Please fill all inputs');

      return;
    }

    await addDoc(collection(FIREBASE_DB, 'todos'), {
      title: todoTitle,
      done: false,
      description: todoDescription, // Add description
      userId: currentUser?.uid, // Add userId
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
  if (isLoading) {
    return (
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const styles = getStyles(theme);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
      style={{ flex: 1 }}
    >
      <Text style={[styles.todoTitle, { height: height * 0.07 }]}>My List</Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.todoContainer}
        />
      </View>
      <View>
        <TextInput
          style={[
            styles.todoInput,
            isTitleFocused && {
              borderColor: '#8cacde',
              borderWidth: 3,
            },
          ]}
          placeholder="Enter Todo Title"
          value={todoTitle}
          onChangeText={setTodoTitle}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
        />
        <TextInput
          style={[
            styles.todoInput,
            isDescriptionFocused && {
              borderColor: '#8cacde',
              borderWidth: 3,
            },
          ]}
          placeholder="Enter Todo Description"
          value={todoDescription}
          onChangeText={setTodoDescription}
          onFocus={() => setIsDescriptionFocused(true)}
          onBlur={() => setIsDescriptionFocused(false)}
        />
        <TouchableOpacity
          style={styles.todoButton}
          onPress={addTodo}
        >
          <Text style={styles.todoText}>Add Todo</Text>
        </TouchableOpacity>
        {!keyboardVisible && (
          <TouchableOpacity
            style={[
              styles.todoButton,
              { backgroundColor: 'white', borderColor: 'red', borderWidth: 1 },
            ]}
            onPress={logOut}
          >
            <Text style={[styles.todoText, { color: 'red' }]}>LogOut</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default TodoList;
