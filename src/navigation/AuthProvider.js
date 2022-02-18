import React, { createContext, useState } from 'react'
import { Alert } from 'react-native'
import firebase from 'firebase'
import { getAuth, updateEmail } from "firebase/auth";
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

    const reAuth = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential(cred)
    }

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
                        setLoading(false)
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
                        setLoading(false)
                        alert(e)
                    }
                },

                logout: async () => {
                    try {
                        const timeout = setTimeout(() => {
                            if (loading) {
                                setLoading(false)
                            }
                            firebase.auth().signOut()
                        }, 1000);
                        return () => clearTimeout(timeout);

                        //     if (loading) {
                        //         setLoading(false)
                        //     }
                        //    firebase.auth().signOut()

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
                },

                changePassword: (currentPassword, newPassword) => {
                    reAuth(currentPassword).then(() => {

                        var user = firebase.auth().currentUser;

                        if (currentPassword == newPassword) {
                            alert('Yeni şifreniz eskisi ile aynı olamaz..')
                            return false;
                        }
                        else (
                            user.updatePassword(newPassword)
                            .then(() => {
                                Alert.alert("Şifre değiştirildi!")
                            }).catch((error) => {
                                alert(error)
                            })
                        )
                    }).catch((error) => {
                        alert(error)
                    })
                },

                changeEmail: (userPassword, newEmail) => {
                    reAuth(userPassword).then(() => {
                        var user = firebase.auth().currentUser;

                        user.updateEmail(newEmail)
                        .then(() => {
                            Alert.alert("Mail değiştirildi!")
                        }).catch((error) => {
                            alert(error)
                        })
                    }).catch((error) => {
                        console.log(error)
                        alert(error)
                    })
                }
            }}
        >
            {children}
        </AuthContext.Provider >
    )
}