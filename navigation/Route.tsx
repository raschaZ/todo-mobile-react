import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from '../app/screens/Details';
import TodoList from '../app/screens/TodoList';
import Login from '../app/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View, StyleSheet } from 'react-native';

const auth = getAuth();
const Stack = createNativeStackNavigator();
function LogoTitle() {
  return (
    <View
      style={{
        marginTop: 20,
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Ionicons
          name="list"
          size={32}
          color="blue"
        />
        <Text style={{ color: 'blue', fontSize: 25 }}>TODO LIST</Text>
      </View>
    </View>
  );
}
const Route = () => {
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
      <Stack.Navigator initialRouteName={user ? 'List' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="List"
          component={TodoList}
          options={{
            headerShown: true,
            header: () => <LogoTitle />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Route;
