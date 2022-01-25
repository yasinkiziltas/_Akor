import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import firebase from 'firebase/app';
import { AuthContext } from '../../navigation/AuthProvider'

export default function HomeScreen({ navigation }) {
    const { logout } = useContext(AuthContext)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HomeScreen</Text>
            <Button title="Çıkış yap" onPress={logout} />
        </View>
    )
}
