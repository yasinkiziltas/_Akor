// React
import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';

//firebase
import { firebaseConfig } from '../src/constants';
import firebase from 'firebase/app'

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import HomeScreen from '../src/screens/main/HomeScreen';
import ProfileScreen from '../src/screens/main/ProfileScreen'
import EditProfileScreen from '../src/screens/main/EditProfileScreen'
import OnboardScreen from '../src/screens/auth/OnboardScreen'
import LoginScreen from '../src/screens/auth/LoginScreen';
import RegisterScreen from '../src/screens/auth/RegisterScreen';

//constants
import { COLORS } from '../src/constants'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboard">

        <Stack.Screen
          name="Onboard"
          component={OnboardScreen}
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
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerBackTitle: 'Profil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
