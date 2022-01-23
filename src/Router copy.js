// React
import React from 'react';
import { LogBox } from 'react-native';

//firebase
import { firebaseConfig } from '../src/constants';
import firebase from 'firebase/app'

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

//constants
import { COLORS } from '../src/constants'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Onboard">
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

    </Stack.Navigator>
  )
}

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  )
}

export default function Router() {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Anasayfa" component={HomeStack} options={{ headerShown: false }} />
        <Tabs.Screen name="Profil" component={ProfileStack} options={{ headerShown: false }} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
