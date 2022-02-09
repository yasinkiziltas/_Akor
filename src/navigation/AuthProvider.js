import React, { createContext, useState } from 'react'
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const firebaseConfig = {
    apiKey: "AIzaSyDrDBEoOY1b6iZnD0_yAw9EcYtvhhINy40",
    authDomain: "akorapp-3ae3a.firebaseapp.com",
    projectId: "akorapp-3ae3a",
    storageBucket: "akorapp-3ae3a.appspot.com",
    messagingSenderId: "272488545583",
    appId: "1:272488545583:web:a5d39e91d88739edae75da"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const AuthProvider = ({ children, navigation }) => {
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setEmail] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                userName,
                setUserName,
                userEmail,
                setEmail,
                userId,
                setUserId,
                loading,
                setLoading,

                login: async (email, password) => {
                    try {

                        if (!loading) {
                            setLoading(true)
                            await firebase.auth().signInWithEmailAndPassword(email, password)
                        }

                        const user = firebase.auth().currentUser;
                        if (user) {
                            setUserId(user.uid);
                            setUserName(user.displayName);
                            setEmail(user.email);
                        }

                    }
                    catch (e) {
                        alert(e)
                    }
                },

                register: async (name, email, password) => {
                    try {

                        if (!loading) {
                            setLoading(true)
                            await firebase.auth().createUserWithEmailAndPassword(email, password)

                            await firebase
                                .firestore()
                                .collection('users')
                                .add({
                                    userName: name,
                                    userEmail: email,
                                    userPhone: null,
                                    userJob: null,
                                    userDateOfBirth: null,
                                    userPhoto: null,
                                    userAddress: null,
                                    userBio: null,
                                    userGender: null,

                                })
                                .then(() => {
                                    console.log('Kayıt başarılı!');
                                })
                                .catch((error) => {
                                    console.log('Hata!', error);
                                })
                        }

                        const user = firebase.auth().currentUser;
                        if (user) {
                            AsyncStorage.setItem('cUsername', name)
                            AsyncStorage.setItem('cUseremail', email)
                            // setUserId(user.uid);
                            // setUserName(name);
                            // setEmail(user.email);
                        }
                    }
                    catch (e) {
                        alert(e)
                    }
                },

                logout: async () => {
                    try {

                        if (loading) {
                            setLoading(false)
                        }

                        await firebase.auth().signOut()
                    }
                    catch (e) {
                        alert(e)
                    }
                },

                forgotPass: async (mail) => {
                    await firebase.auth().sendPasswordResetEmail(mail)
                        .then(function (user) {
                            alert('Lütfen mailinizi kontrol edin...')
                        }).catch(function (e) {
                            alert(e)
                        })
                }
            }}
        >
            {children}
        </AuthContext.Provider >
    )
}