//firebase
import { firebaseConfig } from './src/constants';
import firebase from 'firebase/app'

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import HomeScreen from '../src/screens/main/HomeScreen';
import LoginScreen from '../src/screens/auth/LoginScreen';
import RegisterScreen from '../src/screens/auth/RegisterScreen';

import { COLORS } from '../src/constants'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const AppSwitchNavigator = createNativeStackNavigator(
    
)