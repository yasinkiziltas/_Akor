import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardScreen from '../screens/auth/OnboardScreen'
import UserLoginScreen from '../screens/auth/userScreens/UserLoginScreen'
import UserRegisterScreen from '../screens/auth/userScreens/UserRegisterScreen';
import UserForgotPassword from '../screens/auth/userScreens/UserForgotPassword'

import OwnerAuth from '../screens/auth/ownerScreens/OwnerAuth'
import OwnerLogin from '../screens/auth/ownerScreens/OwnerLogin'
import OwnerRegister from '../screens/auth/ownerScreens/OwnerLogin'

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
        routeName = 'Onboarding'
    }

    return (
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen name="Onboarding" component={OnboardScreen} options={{ header: () => null }} />
            <Stack.Screen name="Login" component={UserLoginScreen} options={{ header: () => null }} />
            <Stack.Screen name="Register" component={UserRegisterScreen} options={{ header: () => null }} />
            <Stack.Screen name="ForgotPassword" component={UserForgotPassword} options={{ header: () => null }} />

            <Stack.Screen name="OwnerLogin" component={OwnerLogin} options={{ header: () => null }} />
            <Stack.Screen name="OwnerRegister" component={OwnerRegister} options={{ header: () => null }} />
            <Stack.Screen name="OwnerAuth" component={OwnerAuth} options={{ header: () => null }} />
        </Stack.Navigator>
    );
}

