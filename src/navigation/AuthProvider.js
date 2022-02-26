import React, { createContext, useState } from 'react'
import { Alert } from 'react-native'
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
    const [loadingRegister, setLoadingRegister] = useState(false)
    const [loadingEmail, setLoadingEmail] = useState(false)
    const [loadingPassword, setLoadingPassword] = useState(false)
    const [loadingLogout, setLoadingLogout] = useState(false)

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
                loadingRegister,
                setLoadingRegister,
                loadingEmail,
                setLoadingEmail,
                loadingPassword,
                setLoadingPassword,
                loadingLogout,
                setLoadingLogout,

                login: async (email, password, userType) => {
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
                            setLoading(false)
                            AsyncStorage.setItem('cUsertype', userType)
                        }

                    }
                    catch (e) {
                        setLoading(false)
                        alert(e)
                    }
                },

                loginOwner: async (mailOwner, passwordOwner, userType) => {
                    try {

                        await firebase.auth().signInWithEmailAndPassword(mailOwner, passwordOwner)
                        // if (!loading) {
                        //     setLoading(true)
                        //     await firebase.auth().signInWithEmailAndPassword(email, password)
                        // }

                        const user = firebase.auth().currentUser;
                        if (user) {
                            setUserId(user.uid);
                            setUserName(user.displayName);
                            setEmail(user.email);
                            setLoading(false)
                            AsyncStorage.setItem('cUsertype', userType)
                        }

                    }
                    catch (e) {
                        setLoading(false)
                        alert(e)
                    }
                },

                register: async (name, email, password, userType) => {
                    try {

                        if (!loadingRegister) {
                            setLoadingRegister(true)

                        }

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
                                typeUser: 'User'

                            })
                            .then(() => {
                                setLoadingRegister(false)
                                console.log('Kayıt başarılı!');
                            })
                            .catch((error) => {
                                setLoadingRegister(false)
                                console.log('Hata!', error);
                            })

                        const user = firebase.auth().currentUser;
                        if (user) {
                            AsyncStorage.setItem('cUsername', name)
                            AsyncStorage.setItem('cUseremail', email)
                            AsyncStorage.setItem('cUsertype', userType)
                            // setUserId(user.uid);
                            // setUserName(name);
                            // setEmail(user.email);
                        }
                    }
                    catch (e) {
                        setLoadingRegister(false)
                        alert(e)
                    }
                },

                registerOwner: async (mailOwner, passwordOwner, userType) => {
                    try {

                        if (!loadingRegister) {
                            setLoadingRegister(true)

                        }

                        await firebase.auth().createUserWithEmailAndPassword(mailOwner, passwordOwner)
                        await firebase
                            .firestore()
                            // collection('owners')
                            .collection('users')
                            .add({
                                ownerEmail: mailOwner,
                                typeUser: 'Owner'

                            })
                            .then(() => {
                                setLoadingRegister(false)
                                console.log('Kayıt başarılı!');
                            })
                            .catch((error) => {
                                setLoadingRegister(false)
                                console.log('Hata!', error);
                            })

                        const user = firebase.auth().currentUser;
                        if (user) {
                            AsyncStorage.setItem('cOwneremail', mailOwner)
                            AsyncStorage.setItem('cUsertype', userType)
                        }
                    }
                    catch (e) {
                        setLoadingRegister(false)
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

                    if (!loadingPassword) {
                        setLoadingPassword(true)
                    }

                    reAuth(currentPassword).then(() => {

                        var user = firebase.auth().currentUser;

                        if (currentPassword == newPassword) {
                            alert('Yeni şifreniz eskisi ile aynı olamaz..')
                            setLoadingPassword(false)
                            return false;
                        }

                        user.updatePassword(newPassword)
                            .then(() => {
                                Alert.alert("Şifre değiştirildi!")
                                setLoadingPassword(false)
                            }).catch((error) => {
                                alert(error)
                            })
                    }).catch((error) => {
                        setLoadingPassword(false)
                        alert(error)
                    })
                },

                changeEmail: (userPassword, newEmail) => {

                    if (!loadingEmail) {
                        setLoadingEmail(true)
                    }

                    reAuth(userPassword).then(() => {
                        var user = firebase.auth().currentUser;

                        user.updateEmail(newEmail)
                            .then(() => {
                                Alert.alert("Mail değiştirildi!")
                                setLoadingEmail(false)
                            }).catch((error) => {
                                alert(error)
                            })
                    }).catch((error) => {
                        setLoadingEmail(false)
                        alert(error)
                    })
                },

                logout: async () => {

                    if (!loadingLogout) {
                        setLoadingLogout(true)
                    }

                    try {
                        const timeout = setTimeout(() => {
                            firebase.auth().signOut()
                            setLoadingLogout(false)
                        }, 1000);

                        return () => clearTimeout(timeout);

                    }
                    catch (e) {
                        setLoadingLogout(false)
                        alert(e)
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider >
    )
}