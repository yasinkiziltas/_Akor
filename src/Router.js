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
import { useNavigation } from '@react-navigation/core'

import firebase from 'firebase/app';
import 'firebase/auth';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export default function Router() {
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user)
      }
    })

    return currentUser;
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {currentUser ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        ) : (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

          )}
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboard" component={OnboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}