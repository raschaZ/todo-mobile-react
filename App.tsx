import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Details from './app/screens/Details';
import TodoList from './app/screens/TodoList';
import Login from './app/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

const auth = getAuth();
const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={1 ? 'List' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="List"
          component={TodoList}
        />
        <Stack.Screen
          name="Details"
          component={Details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
