import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './contexts/UserContext';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import EmployeeListScreen from './screens/EmployeeListScreen';
import EditEmployeeScreen from './screens/EditEmployeeScreen';
import EmployeeDetailsScreen from './screens/EmployeeDetailsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EmployeeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} 
          options={{ 
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }} 
      />
      <Tab.Screen name="AddEmployee" component={AddEmployeeScreen} 
        options={{ 
          tabBarLabel: 'Novo Funcionário',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
          title: 'Novo Funcionário'
        }} 
      />
      <Tab.Screen name="EmployeeList" component={EmployeeListScreen} 
        options={{ 
          tabBarLabel: 'Funcionários',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          title: 'Funcionários'
        }} 
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="App" component={EmployeeTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="EditEmployee" component={EditEmployeeScreen} />
          <Stack.Screen name="EmployeeDetails" component={EmployeeDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
