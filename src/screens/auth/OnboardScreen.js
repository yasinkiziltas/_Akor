import React from 'react'
import { View, Text, Button } from 'react-native'

export default function OnboardScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hoşgeldin!</Text>
            <Button title="Giriş" onPress={() => navigation.navigate('Login')} />
            <Button title="Kayıt Ol" onPress={() => navigation.navigate('Register')} />
        </View>
    )
}
