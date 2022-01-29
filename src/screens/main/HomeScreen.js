import React, { useContext, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext, email } from '../../navigation/AuthProvider'

export default function HomeScreen() {
    const { logout, userEmail } = useContext(AuthContext)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hoşgeldin, {userEmail}</Text>
            <Button title="Çıkış yap" onPress={logout} />
        </View>
    )
}
