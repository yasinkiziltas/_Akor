import React, { createContext, useState } from 'react'
import firebase from 'firebase'

export const AuthContext = createContext();
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
                        await firebase.auth().signInWithEmailAndPassword(email, password)

                        if (!loading) {
                            setLoading(true)
                        }

                        const user = firebase.auth().currentUser;
                        if (user) {
                            setUserId(user.uid);
                            setUserName(user.displayName);
                            setEmail(user.email);
                            console.log('Login success!')
                        }

                    }
                    catch (e) {
                        alert(e)
                    }
                },

                register: async (email, password) => {
                    try {
                        await firebase.auth().createUserWithEmailAndPassword(email, password)

                        if (!loading) {
                            setLoading(true)
                        }

                        const user = firebase.auth().currentUser;
                        if (user) {
                            setUserId(user.uid);
                            setUserName(user.displayName);
                            setEmail(user.email);
                            console.log('Register success!')
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