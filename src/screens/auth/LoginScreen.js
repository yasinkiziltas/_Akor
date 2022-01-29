import React, { useState, useEffect, useContext } from 'react'
import { Image, StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native'
import { loginBackground } from '../../constants/images'
import * as Animatable from 'react-native-animatable';
import FormInput from '../../components/FormInput'
import FormButton from '../../components/FormButton'
import { SIZES } from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../../navigation/AuthProvider'

export default function LoginScreen({ navigation }) {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useContext(AuthContext)

    return (
        <>
            <StatusBar hidden={true} />

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

                    <View style={{ margin: 10 }}>

                        <FormInput
                            value={mail}
                            keyboardType="email-address"
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
                            iconType="lock"
                            hidepass={true}
                            secureTextEntry={true}
                        />

                        <TouchableOpacity
                            style={styles.forgotPass}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={{ color: 'gray', fontSize: 18 }}>Şifremi unuttum</Text>
                        </TouchableOpacity>

                    </View>

                    {/* <FormButton
                        placeholder="Giriş"
                        onPress={() => login(mail, password)}
                    /> */}

                    <FormButton
                        onPress={() => login(mail, password)}
                        text="Giriş"
                    />

                </Animatable.View>
            </KeyboardAwareScrollView >

            <Text style={styles.registerBtn}>Hesabın yok mu?
                <TouchableOpacity
                    style={{ paddingLeft: 5 }}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.signUpBtn}>
                        {''}Kayıt Ol</Text>
                </TouchableOpacity>

            </Text>
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
        height: SIZES.height / 3,
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
    },
    forgotPass: {
        position: 'absolute',
        top: SIZES.height / 6.5,
        right: 15,
        marginTop: 10,
    },
    registerBtn: {
        fontWeight: 'bold',
        color: 'gray',
        textAlign: 'center',
        bottom: 30,
        left: SIZES.width / 3,
        position: 'absolute'
    },
    signUpBtn: {
        color: "#009688",
        fontWeight: 'bold',
        top: 2,
    },
})