import React, {useContext} from 'react'
import { View, Button, Text } from 'react-native'
import { AuthContext, email } from '../../navigation/AuthProvider'

export default function ProfileScreen() {
    const { logout, userEmail } = useContext(AuthContext)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{userEmail}</Text>
            <Button title="Çıkış yap" onPress={logout} />
        </View>
    )
}
