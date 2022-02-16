import React from 'react'
import UserHomeScreen from '../screens/main/UserHomeScreen';
import NotificationScreen from '../screens/main/NotificationScreen';
import EventAddScreen from '../screens/main/EventAddScreen';
import EventScreen from '../screens/main/EventScreen'
import MessageScreen from '../screens/main/MessageScreen'
import UserProfileScreen from '../screens/main/UserProfileScreen'
import EditUserProfileScreen from '../screens/main/EditUserProfileScreen'
import UserEventsBookmarksScreen from '../screens/main/UserEventsBookmarksScreen'
import UserChangePasswordScreen from '../screens/main/UserChangePasswordScreen'
import UserChangeEmailScreen from '../screens/main/UserChangeEmailScreen'
import UserSettingsScreen from '../screens/main/UserSettingsScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={UserHomeScreen} options={{ headerShown: false }} />
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
            <Stack.Screen name="Profile" component={UserProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditUserProfile" component={EditUserProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserEventsBookmark" component={UserEventsBookmarksScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserChangePassword" component={UserChangePasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserChangeEmail" component={UserChangeEmailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserSettings" component={UserSettingsScreen} options={{ headerShown: false }} />
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
                        // borderRadius: 25,
                        // position: 'absolute',
                        // bottom: 20,
                        // left: 20,
                        // right: 20,
                        // elevation: 0,
                        // height: 80
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
                                size={35}
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
                            <FontAwesome
                                // view-grid-outline
                                name="map-o"
                                color={color}
                                size={30}
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
                                size={35}
                            />
                        ),
                    })}
                />
                <Tab.Screen
                    name="Profil"
                    component={ProfileStack}
                    options={{
                        // tabBarStyle: { display: "none" },
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="account"
                                color={color}
                                size={35}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
};