import React, { useEffect, useState } from 'react'
import { Platform, Image, StyleSheet } from 'react-native'

import EventAddScreen from '../screens/main/ownerScreens/EventAddScreen';
import EventHomeScreen from '../screens/main/ownerScreens/EventHomeScreen'
import EventProfileScreen from '../screens/main/ownerScreens/EventProfileScreen'
import EventDetailsScreen from '../screens/main/ownerScreens/EventDetailsScreen'
import UserHomeScreen from '../screens/main/userScreens/UserHomeScreen';
import UserEventsScreen from '../screens/main/userScreens/UserEventsScreen';
import UserProfileScreen from '../screens/main/userScreens/UserProfileScreen'
import UserEditProfileScreen from '../screens/main/userScreens/UserEditProfileScreen'
import UserApplyScreen from '../screens/main/userScreens/UserApplyScreen'
import UserChangePasswordScreen from '../screens/main/userScreens/UserChangePasswordScreen'
import UserChangeEmailScreen from '../screens/main/userScreens/UserChangeEmailScreen'
import UserSettingsScreen from '../screens/main/userScreens/UserSettingsScreen'
import UserFavoritesScreen from '../screens/main/userScreens/UserFavoritesScreen'
import ChatListScreen from '../screens/main/ChatListScreen'
import ChatScreen from '../screens/main/ChatScreen'
import UserNotificationsScreen from '../screens/main/UserNotificationsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { COLORS } from '../constants';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TabMaterial = createMaterialBottomTabNavigator();

function MainStackEvents() {
    return (
        <Stack.Navigator initialRouteName="EventHome">
            <Stack.Screen name="EventHome" component={EventHomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function AddEventStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EventAdd" component={EventAddScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function ProfileEventStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EventProfile" component={EventProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function MainStackUsers() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={UserHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={UserNotificationsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function ListEventsStackUsers({ navigation }) {
    navigation.setOptions({
        tabBarStyle: { display: 'none' },
    });
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListEvents" component={UserEventsScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="UserApply" component={UserApplyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EventDetail" component={EventDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserFavorites" component={UserFavoritesScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function MessageStackUsers() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function ProfileStackUsers() {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={UserProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserEditProfile" component={UserEditProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserApplys" component={UserApplyScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="UserFavorites" component={UserFavoritesScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="UserChangePassword" component={UserChangePasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserChangeEmail" component={UserChangeEmailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserSettings" component={UserSettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserFavorite" component={UserFavoritesScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default function AppStack() {
    const [cUser, setCUser] = useState(firebase.auth().currentUser)
    const [userData, setUserData] = useState(null)
    const [typeUser, setTypeUser] = useState()
    const [currentUserType, setCurrentUserType] = useState()

    AsyncStorage.getItem('cUsertype').then(usr => {
        setTypeUser(usr)
        // console.log('Type: ', typeUser)
    }).catch(e =>
        console.log(e)
    )

    const getUser = async () => {
        firebase
            .firestore()
            .collection('users')
            .doc(cUser.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setUserData(documentSnapshot.data());
                }
            })
    }

    const getUserType = async () => {
        try {
            await firebase
                .firestore()
                .collection('users')
                // .where('typeUser', '==', typeUser)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach(snapshot => {
                        let data = snapshot.data().typeUser
                        setCurrentUserType(data)
                        // console.log('Tip: ', currentUserType);
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
        getUserType()
    }, [])

    return (
        <>
            {Platform.OS == "ios" ? (
                currentUserType == 'User' ? (
                    <TabMaterial.Navigator
                        screenOptions={{
                            tabBarActiveTintColor: COLORS.appColor,
                            tabBarShowLabel: false,
                        }}>
                        <TabMaterial.Screen
                            name="UserMain"
                            component={MainStackUsers}
                            options={({ route }) => ({
                                tabBarLabel: false,
                                tabBarColor: '#92C19C',
                                headerShown: false,
                                // tabBarVisible: route.state && route.state.index === 0,
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons
                                        name="home-outline"
                                        color={color}
                                        size={30}
                                    />
                                ),
                            })}
                        />

                        <Tab.Screen
                            name="ListAllEvents"
                            component={ListEventsStackUsers}
                            options={({ route }) => ({
                                headerShown: false,
                                tabBarLabel: false,
                                tabBarColor: '#92BFC1',
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialIcons
                                        name="receipt"
                                        color={color}
                                        size={25}
                                    />
                                ),
                            })}
                        />

                        <TabMaterial.Screen
                            name="UserMessages"
                            component={MessageStackUsers}
                            options={({ route }) => ({
                                headerShown: false,
                                tabBarLabel: false,
                                tabBarColor: '#92BFC1',
                                tabBarIcon: ({ color, size }) => (
                                    <Feather
                                        name="message-circle"
                                        color={color}
                                        size={25}
                                    />
                                ),
                            })}
                        />
                        <TabMaterial.Screen
                            name="UserProfile"
                            component={ProfileStackUsers}
                            options={{
                                headerShown: false,
                                tabBarColor: '#B9BFDA',
                                tabBarLabel: false,
                                tabBarIcon: ({ color }) => (
                                    userData.userPhoto ? (
                                        <Image
                                            style={styles.userImg}
                                            source={require('../../assets/images/user.png')}
                                            source={{ uri: userData.userPhoto }}
                                        />

                                    ) : (
                                            <MaterialCommunityIcons
                                                name="account"
                                                color={color}
                                                size={25}
                                            />
                                        )

                                ),
                            }}
                        />
                    </TabMaterial.Navigator>
                ) : (
                        <TabMaterial.Navigator
                            screenOptions={{
                                tabBarActiveTintColor: COLORS.appColor,
                                tabBarShowLabel: false,
                            }}>
                            <TabMaterial.Screen
                                name="OwnerMain"
                                component={MainStackEvents}
                                options={({ route }) => ({
                                    tabBarLabel: false,
                                    tabBarColor: '#92C19C',
                                    headerShown: false,
                                    // tabBarVisible: route.state && route.state.index === 0,
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="home-outline"
                                            color={color}
                                            size={30}
                                        />
                                    ),
                                })}
                            />

                            <TabMaterial.Screen
                                name="AddEvent"
                                component={AddEventStack}
                                options={({ route }) => ({
                                    headerShown: false,
                                    tabBarLabel: false,
                                    tabBarColor: '#92BFC1',
                                    tabBarIcon: ({ color, size }) => (
                                        <Feather
                                            name="plus"
                                            color={color}
                                            size={25}
                                        />
                                    ),
                                })}
                            />
                            <TabMaterial.Screen
                                name="Profil"
                                component={ProfileEventStack}
                                options={{
                                    headerShown: false,
                                    tabBarColor: '#B9BFDA',
                                    tabBarLabel: false,
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="account"
                                            color={color}
                                            size={25}
                                        />
                                    ),
                                }}
                            />
                        </TabMaterial.Navigator>
                    )

            ) : (
                    currentUserType == 'User' ? (
                        <Tab.Navigator
                            screenOptions={{
                                tabBarActiveTintColor: COLORS.appColor,
                                tabBarShowLabel: false,
                            }}>
                            <Tab.Screen
                                name="UserMain"
                                component={MainStackUsers}
                                options={({ route }) => ({
                                    tabBarLabel: false,
                                    tabBarColor: '#92C19C',
                                    headerShown: false,
                                    // tabBarVisible: route.state && route.state.index === 0,
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="home-outline"
                                            color={color}
                                            size={30}
                                        />
                                    ),
                                })}
                            />

                            <Tab.Screen
                                name="ListAllEvents"
                                component={ListEventsStackUsers}
                                options={({ route }) => ({
                                    headerShown: false,
                                    tabBarLabel: false,
                                    tabBarColor: '#92BFC1',
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialIcons
                                            name="receipt"
                                            color={color}
                                            size={25}
                                        />
                                    ),
                                })}
                            />

                            <Tab.Screen
                                name="UserMessages"
                                component={MessageStackUsers}
                                options={({ route }) => ({
                                    headerShown: false,
                                    tabBarLabel: false,
                                    tabBarColor: '#92BFC1',
                                    tabBarIcon: ({ color, size }) => (
                                        <Feather
                                            name="message-circle"
                                            color={color}
                                            size={25}
                                        />
                                    ),
                                })}
                            />

                            <Tab.Screen
                                name="UserProfile"
                                component={ProfileStackUsers}
                                options={{
                                    headerShown: false,
                                    tabBarColor: '#B9BFDA',
                                    tabBarLabel: false,
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="account"
                                            color={color}
                                            size={25}
                                        />
                                    ),
                                }}
                            />
                        </Tab.Navigator>
                    ) : (
                            <Tab.Navigator
                                screenOptions={{
                                    tabBarActiveTintColor: COLORS.appColor,
                                    tabBarShowLabel: false,
                                }}>
                                <Tab.Screen
                                    name="OwnerMain"
                                    component={MainStackEvents}
                                    options={({ route }) => ({
                                        tabBarLabel: false,
                                        tabBarColor: '#92C19C',
                                        headerShown: false,
                                        // tabBarVisible: route.state && route.state.index === 0,
                                        tabBarIcon: ({ color, size }) => (
                                            <MaterialCommunityIcons
                                                name="home-outline"
                                                color={color}
                                                size={30}
                                            />
                                        ),
                                    })}
                                />

                                <Tab.Screen
                                    name="AddEvent"
                                    component={AddEventStack}
                                    options={({ route }) => ({
                                        headerShown: false,
                                        tabBarLabel: false,
                                        tabBarColor: '#92BFC1',
                                        tabBarIcon: ({ color, size }) => (
                                            <Feather
                                                name="plus"
                                                color={color}
                                                size={25}
                                            />
                                        ),
                                    })}
                                />
                                <Tab.Screen
                                    name="Profil"
                                    component={ProfileEventStack}
                                    options={{
                                        headerShown: false,
                                        tabBarColor: '#B9BFDA',
                                        tabBarLabel: false,
                                        tabBarIcon: ({ color, size }) => (
                                            <MaterialCommunityIcons
                                                name="account"
                                                color={color}
                                                size={25}
                                            />
                                        ),
                                    }}
                                />
                            </Tab.Navigator>
                        )
                )}
        </>
    );
};

const styles = StyleSheet.create({
    userImg: {
        tintColor: 'black',
        width: 25,
        height: 25,
        borderRadius: 50
    },
})