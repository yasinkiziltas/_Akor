import React, { createContext, useState } from 'react'
import firebase from 'firebase'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setEmail] = useState(null)

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

                login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password)
                        const user = firebase.auth().currentUser;

                        if (user) {
                            setUserId(user.uid);
                            setUserName(user.displayName);
                            setEmail(user.email);
                            console.log('Log success!')
                        }

                    }
                    catch (e) {
                        console.log(e)
                    }
                },

                register: async (email, password) => {
                    try {
                        await firebase.auth().createUserWithEmailAndPassword(email, password)
                    }
                    catch (e) {
                        console.log(e)
                    }
                },

                logout: async () => {
                    try {
                        await firebase.auth().signOut()
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
            }}
        >
            { children}
        </AuthContext.Provider >
    )
}