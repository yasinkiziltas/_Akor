import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { loginBackground } from '../../constants/images'
import * as Animatable from 'react-native-animatable';
import FormInput from '../../components/FormInput'
import { SIZES } from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function LoginScreen() {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <KeyboardAwareScrollView>
                <Animatable.View
                    animation="slideInDown"
                    style={styles.container}
                >

                    <Image
                        resizeMode='contain'
                        style={styles.backgroundImg}
                        source={loginBackground}
                    />
                </Animatable.View>

                <Animatable.View
                    animation="slideInUp"
                    style={styles.inputView}
                >
                    <Text style={styles.loginText}>Giriş</Text>

                    <FormInput
                        value={mail}
                        placeholder="E-Mail"
                        onChangeText={value => setMail(value)}
                        iconType="mail"
                    />
                    <View style={{ marginBottom: 5 }}>

                    </View>
                    <FormInput
                        value={password}
                        placeholder="Şifre"
                        onChangeText={value => setPassword(value)}
                        iconType="arrowright"
                    />
                </Animatable.View>
            </KeyboardAwareScrollView >
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    backgroundImg: {
        backgroundColor: '#e2f4ff',
        width: SIZES.width,
        height: SIZES.height / 2,
    },
    inputView: {
        marginLeft: 5,
        flex: 1,
        flexDirection: 'column'
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 37,
        margin: 10,
    }
})