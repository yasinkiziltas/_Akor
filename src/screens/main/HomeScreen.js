import React, { useContext, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../../navigation/AuthProvider'
import firebase from 'firebase';
import {currentUser} from '../../constants';

export default function HomeScreen() {
    const { logout } = useContext(AuthContext)
 
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome, {currentUser} </Text>
            <Button title="Çıkış yap" onPress={logout} />
        </View>
    )
}
