// React
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//screens
import HomeScreen from '../src/screens/main/HomeScreen';
import ProfileScreen from '../src/screens/main/ProfileScreen'
import EditProfileScreen from '../src/screens/main/EditProfileScreen'
import OnboardScreen from '../src/screens/auth/OnboardScreen'
import LoginScreen from '../src/screens/auth/LoginScreen';
import RegisterScreen from '../src/screens/auth/RegisterScreen';
import ForgotPassword from './screens/auth/ForgotPassword';

//constants
import { COLORS } from '../src/constants'

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Onboard"
        component={OnboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default function Router() {
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  const [test, setTest] = useState(false)

  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = firebase.auth.onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;

  return (
    <NavigationContainer>
      {test ? (
        <Tabs.Navigator>
          <Tabs.Screen name="Anasayfa" component={HomeStack} options={{ headerShown: false }} />
          <Tabs.Screen name="Profil" component={ProfileStack} options={{ headerShown: false }} />
        </Tabs.Navigator>
      ) : (
          <AuthStack />
        )}
    </NavigationContainer>
  );
}
