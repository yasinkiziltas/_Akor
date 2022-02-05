import React from 'react'
import HomeScreen from '../screens/main/HomeScreen';
import NotificationScreen from '../screens/main/NotificationScreen';
import EventAddScreen from '../screens/main/EventAddScreen';
import EventScreen from '../screens/main/EventScreen'
import MessageScreen from '../screens/main/MessageScreen'
import ProfileScreen from '../screens/main/ProfileScreen'
import EditProfileScreen from '../screens/main/EditProfileScreen'
import UserEventsBookmarksScreen from '../screens/main/UserEventsBookmarksScreen'
import UserChangePasswordScreen from '../screens/main/UserChangePasswordScreen'
import UserSettingsScreen from '../screens/main/UserSettingsScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddEvent" component={EventAddScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={NotificationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function EventStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Events" component={EventScreen} options={{ headerShown: false }} />
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
            <Stack.Screen name="UserEventsBookmark" component={UserEventsBookmarksScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={UserChangePasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={UserSettingsScreen} options={{ headerShown: false }} />
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
                    component={EventStack}
                    options={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                // view-grid-outline
                                name="place"
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
                            <Feather
                                name="message-circle"
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
                            <MaterialCommunityIcons
                                name="account"
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