import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardScreen from '../screens/auth/OnboardScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPassword from '../screens/auth/ForgotPassword'

const Stack = createNativeStackNavigator()

export default function AuthStack() {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true)
            }
            else {
                setIsFirstLaunch(false)
            }
        });

    }, [])

    if (isFirstLaunch === null) {
        return null;
    }

    else if (isFirstLaunch == true) {
        routeName = 'Onboarding'
    }

    else {
        routeName = 'Login'
    }

    return (
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen name="Onboarding" component={OnboardScreen} options={{ header: () => null }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => null }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ header: () => null }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ header: () => null }} />
        </Stack.Navigator>
    );
}

