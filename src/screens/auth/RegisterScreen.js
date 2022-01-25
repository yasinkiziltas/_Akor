import React, { useState, useEffect, useContext } from 'react'
import { Image, StyleSheet, ImageBackground, View, Text, StatusBar, TouchableOpacity } from 'react-native'
import firebase from 'firebase/app'
import { registerBackground } from '../../constants/images'
import * as Animatable from 'react-native-animatable';
import FormInput from '../../components/FormInput'
import FormButton from '../../components/FormButton'
import { SIZES } from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomHeader from '../../components/CustomHeader';

import { AuthContext } from '../../navigation/AuthProvider'

export default function RegisterScreen({ navigation }) {
    const [mail, setMail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const { register } = useContext(AuthContext)

    return (
        <>
            <StatusBar hidden={true} />

            <KeyboardAwareScrollView>
                <Animatable.View
                    animation="slideInDown"
                    style={styles.container}
                >

                    <ImageBackground
                        style={styles.backgroundImg}
                        source={registerBackground}
                    >

                        <CustomHeader
                            isBack={true}
                            navigation={navigation}
                        />

                    </ImageBackground>
                </Animatable.View>

                <Animatable.View
                    animation="slideInUp"
                    style={styles.inputView}
                >
                    <Text style={styles.loginText}>Kayıt ol</Text>

                    <View style={{ margin: 10 }}>

                        {/* <FormInput
                            value={name}
                            placeholder="Ad Soyad"
                            onChangeText={value => setName(value)}
                            iconType="user"
                        /> */}

                        <FormInput
                            value={mail}
                            keyboardType="email-address"
                            placeholder="E-Mail"
                            onChangeText={value => setMail(value)}
                            iconType="mail"
                        />

                        <FormInput
                            value={password}
                            placeholder="Şifre"
                            secureTextEntry={true}
                            onChangeText={value => setPassword(value)}
                            iconType="lock"
                            hidepass={true}
                        />

                        <Text style={{ color: 'gray', paddingTop: 20, paddingLeft: 5 }}>Kayıt olarak gizlilik sözleşmesini kabul etmiş olursunuz.</Text>

                    </View>

                    <FormButton
                        placeholder="Kayıt Ol"
                        onPress={register(mail, password)}
                    />

                </Animatable.View>
            </KeyboardAwareScrollView >

            <Text style={styles.registerBtn}>Hesabın var mı?
                <TouchableOpacity
                    style={{ paddingLeft: 5 }}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.signUpBtn}>
                        {''}Giriş yap</Text>
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
        flex: 1,
        width: SIZES.width,
        height: SIZES.height / 3

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
        top: 0,
        right: 25,
        marginTop: 10,
        top: SIZES.height / 5
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