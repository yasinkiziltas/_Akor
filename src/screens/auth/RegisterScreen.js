import React, { useState, useEffect, useContext } from 'react'
import { Image, StyleSheet, ImageBackground, View, Text, StatusBar, TouchableOpacity } from 'react-native'
import { registerBackground } from '../../constants/images'
import * as Animatable from 'react-native-animatable';
import FormInput from '../../components/FormInput'
import FormButton from '../../components/FormButton'
import { SIZES } from '../../constants'
import {loadingAuth} from '../../constants/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomHeader from '../../components/CustomHeader';
import { AuthContext } from '../../navigation/AuthProvider'
import * as Yup from 'yup'
import { Formik } from 'formik';
import LottieView from 'lottie-react-native';

export default function RegisterScreen({ navigation }) {
    const [mail, setMail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    
    const { register, loading } = useContext(AuthContext)

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

                    <Formik
                        initialValues={{ mail, password }}
                        onSubmit={values => { register(values.mail, values.password) }}
                        validationSchema={
                            Yup.object().shape({
                                mail: Yup.string()
                                    .email('Lütfen geçerli bir email adresi girin!')
                                    .required('Email gerekli!'),

                                password: Yup.string()
                                    .min(6, 'Şifre çok kısa, minimum 6 karakter olmalı!')
                                    .required('Şifre gerekli!')
                            })
                        }
                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
                            <>
                                <View style={{ margin: 10 }}>

                                    {/* <FormInput
                                     value={name}
                                     placeholder="Ad Soyad"
                                      onChangeText={value => setName(value)}
                                         iconType="user"
                                    /> */}

                                    <FormInput
                                        onBlur={() => setFieldTouched('mail')}
                                        value={values.mail}
                                        keyboardType="email-address"
                                        placeholder="E-Mail"
                                        // onChangeText={value => setMail(value)}
                                        onChangeText={handleChange('mail')}
                                        iconType="mail"
                                    />

                                    {(errors.mail && touched.mail) &&
                                        <Text style={styles.errors}>{errors.mail} </Text>
                                    }

                                    <FormInput
                                        onBlur={() => setFieldTouched('password')}
                                        value={values.password}
                                        placeholder="Şifre"
                                        secureTextEntry={true}
                                        // onChangeText={value => setPassword(value)}
                                        onChangeText={handleChange('password')}
                                        iconType="lock"
                                        hidepass={true}
                                    />

                                    {(errors.password && touched.password) &&
                                        <Text style={styles.errors}>{errors.password} </Text>
                                    }

                                    <Text style={{ color: 'gray', paddingTop: 20, paddingLeft: 5 }}>Kayıt olarak gizlilik sözleşmesini kabul etmiş olursunuz.</Text>

                                </View>

                                <View style={{ marginVertical: 35 }}>
                                    <FormButton
                                        onPress={() => handleSubmit()}
                                        text="Kayıt Ol"
                                    />
                                </View>

                                {loading ? (
                                        <LottieView
                                            source={loadingAuth}
                                            style={{
                                                alignSelf: 'center',
                                                width: 50,
                                                height: 50
                                            }}
                                            autoPlay
                                            loop
                                        />
                                    ) : (
                                        null
                                    )}

                            </>
                        )}

                    </Formik>


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
    errors: {
        textAlign: 'center',
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 5
    }
})