import React from 'react'
import HomeScreen from '../screens/main/HomeScreen';
import CalendarScreen from '../screens/main/CalendarScreen'
import MessageScreen from '../screens/main/MessageScreen'
import ProfileScreen from '../screens/main/ProfileScreen'
import EditProfileScreen from '../screens/main/EditProfileScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function CalendarStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function MessageStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Message" component={MessageScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default function AppStack() {
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: COLORS.appColor,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        justifyContent: 'center',
                        flex: 1,
                        borderRadius: 25,
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        right: 20,
                        elevation: 0,
                        height: 80
                    }
                }}>
                <Tab.Screen
                    name="Ana"
                    component={MainStack}
                    options={({ route }) => ({
                        headerShown: false,
                        // tabBarVisible: route.state && route.state.index === 0,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="home-outline"
                                color={color}
                                 size={36}
                            />
                        ),
                    })}
                />
                <Tab.Screen
                    name="Takvim"
                    component={CalendarStack}
                    options={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="calendar-account-outline"
                                color={color}
                                 size={36}
                            />
                        ),
                    })}
                />
                <Tab.Screen
                    name="Mesajlar"
                    component={MessageStack}
                    options={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="message-outline"
                                color={color}
                                 size={36}
                            />
                        ),
                    })}
                />
                <Tab.Screen
                    name="Profil"
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="person-outline"
                                color={color}
                                size={36}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
};